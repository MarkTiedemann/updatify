'use strict'

const { exec } = require('child_process')
const semver = require('semver')
const { npm } = require('node-latest')

module.exports = (args, spinner) => {

    const current = npm.current()

    const execUpdate = ({ force = false, tag = 'latest', version = NaN }) => {
        spinner.update(`Updating npm (previous: ${current} --> `
            + `${tag}: ${version}) ${force ? 'with force': ''}`)
        exec(force
            ? 'curl -L https://www.npmjs.org/install.sh | sh'
            : `npm install --global npm@${version}`, err => err
                ? spinner.fail(err)
                : spinner.success(`npm updated succesfully (previous: ${current} `
                    + `--> ${tag}: ${version}) ${force ? 'with force': ''}`))
    }

    const checkUpdate = tag => npm[tag]()
        .then(version => !current
            ? spinner.fail('npm was not found on your '
                + 'system. To install npm, run:\nupdatify npm --force')
            : semver.gt(version, current)
                ? args.check
                    ? spinner.fail(`npm needs to be updated `
                        + `(installed: ${current} < ${tag}: ${version})`)
                    : execUpdate({ tag, version })
                : semver.eq(version, current)
                    ? spinner.success(`npm is up to date (installed: `
                        + `${current} == ${tag}: ${version})`)
                    : spinner.success(`npm is up to date (installed: `
                        + `${current} > ${tag}: ${version})`))
        .catch(err => spinner.fail(err))

    const forceUpdate = () => npm.latest()
        .then(version => execUpdate({ version, force: true }))
        .catch(() => execUpdate({ force: true }))

    spinner.update('Fetching metadata')

    args.force
        ? forceUpdate()
        : args.latest
            ? checkUpdate('latest')
            : args.lts
                ? checkUpdate('lts')
                : args.next
                    ? checkUpdate('next')
                    : checkUpdate('latest')
}
