
# updatify

**CLI app for updating Node and npm on Windows.**

[![](https://img.shields.io/node/v/updatify.svg)](https://www.npmjs.com/package/updatify)

## Installation

```
npm i -g updatify
```

## Quickstart

**updating node**

```bash
# checks whether a new node version is available

updatify check node

# downloads the latest Node installer into the
# Downloads directory and starts it

updatify node
```

**updating npm**

```bash
# checks whether a new npm version is available

updatify check npm

# installs the newest npm version by executing:
# curl -L https://www.npmjs.org/install.sh | sh

updatify npm

# installs the newest npm version without
# any additional checks
#
# this options is useful when your npm version
# is broken

updatify npm --force
```
**Note:** Updating npm requires `sh` (which comes with [Git For Windows](https://git-for-windows.github.io/), for example) and [`curl`](https://curl.haxx.se/).
