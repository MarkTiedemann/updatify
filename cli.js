#!/usr/bin/env node
'use strict'

const { node, npm } = require('node-latest')
const msi = require('node-msi')
const { exec } = require('child_process')
const spinner = require('spinn3r')('')

const args = process.argv.slice(2)

switch (args.shift()) {

    case 'check':

        const check = args.shift()

        if ('node' === check) {
            spinner.update('Checking latest Node version')
            node.isLatest()
                .then(is => is ? spinner.success('Node is up to date')
                               : spinner.fail('Node needs to be updated'))
                .catch(err => spinner.fail(err))
        }

        else if ('npm' === check) {
            spinner.update('Checking latest NPM version')
            npm.isLatest()
                .then(is => is ? spinner.success('NPM is up to date')
                               : spinner.fail('NPM needs to be updated'))
                .catch(err => spinner.fail(err))
        }

        else spinner.fail('Invalid command')

        break

    case 'node':

        spinner.update('Checking latest Node version')
        node.isLatest()
            .then(is => {
                if (!is) {
                    spinner.update('Downloading latest Node installer')
                    msi.fetch()
                        .then(path => {
                            spinner.update('Starting latest Node installer')
                            return msi.start(path)
                        })
                        .then(() => {
                            spinner.success('Latest Node installer started')
                        })
                        .catch(err => spinner.fail(err))
                }
                else spinner.success('Node is up to date')
            })
            .catch(err => spinner.fail(err))

        break

    case 'npm':

        if ('--force' === args.shift()) {
            spinner.update('Installing NPM')
            exec('curl -L https://www.npmjs.org/install.sh | sh', err => {
                if (err) spinner.fail(err)
                else spinner.success('Latest NPM version installed')
            })
        }

        else {
            spinner.update('Checking latest NPM version')
            npm.isLatest()
                .then(is => {
                    if (!is) {
                        spinner.update('Installing NPM')
                        exec('curl -L https://www.npmjs.org/install.sh | sh', err => {
                            if (err) spinner.fail(err)
                            else spinner.success('Latest NPM version installed')
                        })
                    }
                    else spinner.success('NPM is up to date')
                })
                .catch(err => spinner.fail(err))
        }

        break

    default:
        spinner.fail('Invalid command')
        break
}
