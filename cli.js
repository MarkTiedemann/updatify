#!/usr/bin/env node
'use strict'

const { node, npm } = require('node-latest')
const msi = require('node-msi')
const { exec } = require('child_process')
const spinner = require('spinn3r')('')
const notifier = require('update-notifier')

notifier({ pkg: require('./package.json') }).notify()

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
            spinner.update('Checking latest npm version')
            npm.isLatest()
                .then(is => is ? spinner.success('npm is up to date')
                               : spinner.fail('npm needs to be updated'))
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

        const updateNpm = () => {
            spinner.update('Installing npm')
            exec('curl -L https://www.npmjs.org/install.sh | sh', err => {
                if (err) spinner.fail(err)
                else spinner.success('Latest npm version installed')
            })
        }

        const force = args.shift()

        if ('--force' === force || '-f' === force) updateNpm()

        else {
            spinner.update('Checking latest npm version')
            npm.isLatest()
                .then(is => is ? spinner.success('npm is up to date')
                               : updateNpm())
                .catch(err => spinner.fail(err))
        }

        break

    default:
        spinner.fail('Invalid command')
        break
}
