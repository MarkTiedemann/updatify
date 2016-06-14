'use strict'

const { node } = require('node-latest')
const semver = require('semver')
const msi = require('node-msi')

module.exports = (args, spinner) => {

    const current = node.current()

    const fetchUpdate = ({ tag, version }) => {
        spinner.update(`Downloading Node installer (previous:`
            + ` ${current} --> ${tag}: ${version})`)
        msi.fetch({ version, bits: args.bits, dir: args.dir })
            .then(path => args.download
                ? spinner.success(`Node installer downloaded succesfully (previous:`
                    + ` ${current} --> ${tag}: ${version}):\n${path}`)
                : msi.start(path)
                    .then(() => spinner.success(`Node installer started succesfully`
                        + ` (previous: ${current} --> ${tag}: ${version})`))
            )
            .catch(err => spinner.fail(err))
    }

    const checkUpdate = tag => node[tag]()
        .then(version => semver.gt(version, current)
            ? args.check
                ? spinner.fail(`Node needs to be updated `
                    + `(installed: ${current} < ${tag}: ${version})`)
                : fetchUpdate({ tag, version })
            : semver.eq(version, current)
                ? spinner.success(`Node is up to date (installed: `
                    + `${current} == ${tag}: ${version})`)
                : spinner.success(`Node is up to date (installed: `
                    + `${current} > ${tag}: ${version})`))
        .catch(err => spinner.fail(err))

    spinner.update('Fetching metadata')

    args.latest
        ? checkUpdate('latest')
        : args.lts
            ? checkUpdate('lts')
            : checkUpdate('latest')
}
