#!/usr/bin/env node
'use strict'

const pkg = require('./package.json')
const updateNotifier = require('update-notifier')
updateNotifier({ pkg }).notify()

const alias = {
    h: 'help',
    v: 'version',
    c: 'check',
    b: 'bits',
    d: 'dir',
    l: 'latest',
    n: 'next',
    f: 'force'
}
const argv = process.argv.slice(2)
const args = require('minimist')(argv, { alias })

const spinner = require('spinn3r')('Starting updatify')

if (args.help)
    require('./cli/help')(spinner)

else if (args.version)
    spinner.success(pkg.version)

else if (args._.length === 0)
    spinner.fail('Invalid command')

else if ('node' === args._[0])
    require('./cli/node')(args, spinner)

else if ('npm' === args._[0])
    require('./cli/npm')(args, spinner)

else spinner.fail('Invalid command')
