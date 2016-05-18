'use strict'

const { join } = require('path')
const { homedir } = require('os')
const { createWriteStream } = require('fs')
const { exec } = require('child_process')
const request = require('request')
const { node } = require('node-latest')

module.exports = (spinner, log, logErr) => {

    spinner.setSpinnerTitle('Fetching latest Node version')
    node.fetchLatest()
        .then(version => {

            const file = `node-${version}-x64.msi`
            const path = join(homedir(), 'Downloads', file)

            const writeStream = createWriteStream(path)
            const readStream = request(`https://nodejs.org/dist/${version}/${file}`)

            writeStream.on('error', err => {
                logErr(err, 'Could not download Node installer')
            })

            readStream.on('error', err => {
                logErr(err, 'Could not download Node installer')
            })

            writeStream.on('finish', () => {

                spinner.text = 'Starting Node installer'
                exec(`start "" ${path}`, err => {
                    if (err) logErr(err, 'Could not start Node installer')
                    else log('Latest Node installer started')
                })
            })

            spinner.setSpinnerTitle('Downloading Node installer')
            readStream.pipe(writeStream)

        })
        .catch(err => {
            logErr(err, 'Could not fetch latest Node version')
        })

}
