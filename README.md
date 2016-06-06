
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
```
**Note:** Updating NPM requires `sh` (which comes with [Git For Windows](https://git-for-windows.github.io/), e.g.) and [`curl`](https://curl.haxx.se/).
