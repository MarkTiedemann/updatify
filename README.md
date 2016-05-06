
# updatify

**CLI app for updating Node and NPM on Windows.**

## Installation

```
npm i -g updatify
```

## Quickstart

**updating node**

```bash
# checks whether a new node version is available
# returns true if so; otherwise false

updatify check node

# downloads the newest node installer from
# https://nodejs.org/dist/vX.X.X/node-vX.X.X-x64.msi
# then runs the installer by executing
# start "" node-vX.X.X-x64.msi

updatify node
```

**updating npm**

```bash
# checks whether a new npm version is available
# returns true if so; otherwise false

updatify check npm

# installs the newest npm version by executing:
# curl -L https://www.npmjs.org/install.sh | sh

updatify npm
```
**Note:** Requires [Git For Windows](https://git-for-windows.github.io/) and [curl](https://curl.haxx.se/).
