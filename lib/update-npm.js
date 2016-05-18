'use strict'

const { exec } = require('child_process')

module.exports = (spinner, log, logErr) => {

    spinner.setSpinnerTitle('Installing NPM')
    exec('curl -L https://www.npmjs.org/install.sh | sh', err => {
        if (err) logErr(err, 'Could not install NPM')
        else log('Latest NPM version installed')
    })

}
