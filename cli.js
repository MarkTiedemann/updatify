#!/usr/bin/env node
'use strict'

const { node, npm } = require('node-latest')
const msi = require('node-msi')
const updateNpm = require('./lib/update-npm')
const { Spinner } = require('cli-spinner')

let spinner = new Spinner('')
spinner.setSpinnerString(20)
spinner.start()

const log = (text) => {
    spinner.stop(true)
    console.log(text)
}

const logErr = (err, text) => {
    spinner.stop(true)
    console.error(`Error: ${text} (${err.message})`)
}

const args = process.argv.slice(2)

switch (args.shift()) {

    case 'check':

        let check = args.shift()

        if ('node' === check) {
            spinner.setSpinnerTitle('Checking latest Node version')
            node.isLatest()
                .then(is => {
                    log(!is)
                })
                .catch(err => {
                    logErr(err, 'Could not check latest Node version')
                })
        }

        else if ('npm' === check) {
            spinner.setSpinnerTitle('Checking latest NPM version')
            npm.isLatest()
                .then(is => {
                    log(!is)
                })
                .catch(err => {
                    logErr(err, 'Could not check latest Node version')
                })
        }

        else log('Invalid command')

        break

    case 'node':

        spinner.setSpinnerTitle('Checking latest Node version')
        node.isLatest()
            .then(is => {
                if (!is) {
                    spinner.setSpinnerTitle('Downloading latest Node installer')
                    msi.fetch()
                        .catch(err => {
                            logErr(err, 'Could not download latest Node installer')
                        })
                        .then(path => {
                            spinner.setSpinnerTitle('Starting latest Node installer')
                            return msi.start(path)
                        })
                        .then(() => {
                            log('Latest Node installer started')
                        })
                        .catch(err => {
                            logErr(err, 'Could not start latest Node installer')
                        })
                }
                else log('Node version is up to date')
            })
            .catch(err => {
                logErr(err, 'Could not check latest Node version')
            })

        break

    case 'npm':

        spinner.setSpinnerTitle('Checking latest NPM version')
        npm.isLatest()
            .then(is => {
                if (!is) updateNpm(spinner, log, logErr)
                else log('NPM version is up to date')
            })
            .catch(err => {
                logErr(err, 'Could not check latest Node version')
            })

        break

    default:
        log('Invalid command')
        break
}
