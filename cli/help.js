'use strict'

const basics =`

--help      -h    displays help information
--version   -v    outputs the version number
`

const node =`

--check     -c    checks whether an update is available, but doesn't actually update node
--bits      -b    specifies whether the 32-bit or 64-bit version should be downloaded; default: 64
--dir       -d    specifies the directory in which the installer is saved; default: C:/Users/<User>/Downloads
--download        only downloads the installer, but doesn't start it
--latest    -l    downloads the latest node version; may be omitted since this is the default behavior
--lts:            downloads the latest Long Term Support version
`

const npm =`

--check     -c    checks whether an update is available, but doesn't actually update npm
--latest    -l    downloads the latest npm version; may be omitted since this is the default behavior
--lts             downloads the latest Long Term Support version
--next      -n    downloads the next npm version
--force     -f    installs the latest npm version by executing 'curl -L https://www.npmjs.org/install.sh | sh' without any prior checks; this options is useful if your npm is broken
`

module.exports = (spinner) => {

    const wrapLine = require('spinn3r/wrap')

    const wrap = (indentLeft, message) =>
        wrapLine({ message, indentFirstLine: true, indentLeft })

    const print = (indentLeft, message) =>
        console.log(wrap(indentLeft, message))

    spinner.success('usage: updatify')

    print(8, basics)
    print(4, 'updatify node \n')
    print(8, node)
    print(4, 'updatify npm \n')
    print(8, npm)

}
