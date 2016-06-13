
# updatify

**CLI app for updating Node and npm on Windows.**

[![](https://david-dm.org/MarkTiedemann/updatify.svg)](https://david-dm.org/MarkTiedemann/updatify) [![](https://img.shields.io/node/v/updatify.svg)](https://www.npmjs.com/package/updatify)

## Installation

```
npm i -g updatify
```

## Quickstart

**updating node**

```sh
# checks whether a new node version is available

updatify node --check

# downloads the latest Node installer into the
# Downloads directory and starts it

updatify node
```

**updating npm**

```sh
# checks whether a new npm version is available

updatify npm --check

# installs the latest npm version

updatify npm
```

## Commands

### `updatify`

- `--help` / `-h`: displays help information
- `--version` / `-v`: outputs the version number

### `updatify node`

- `--check` / `-c`: checks whether an update is available, but doesn't actually update node
- `--bits` / `-b`: specifies whether the `32`-bit or `64`-bit version should be downloaded; *default*: `64`
- `--dir` / `-d`: specifies the directory in which the installer is saved; *default:* `C:/Users/<User>/Downloads`
- `--download`: only downloads the installer, but doesn't start it
- `--latest` / `-l`: downloads (or, if the `--check` flag is set, checks for) the latest node version; please note that this flag may be omitted as downloading the latest version is the default behavior
- `--lts`: downloads (or, if the `--check` flag is set, checks for) the latest Long Term Support version

### `updatify npm`

- `--check` / `-c`: checks whether an update is available, but doesn't actually update npm
- `--latest` / `-l`: downloads (or, if the `--check` flag is set, checks for) the latest npm version; please note that this flag may be omitted as downloading the latest version is the default behavior
- `--lts`: downloads (or, if the `--check` flag is set, checks for) the latest Long Term Support version
- `--next` / `-n`: downloads (or, if the `--check` flag is set, checks for) the next npm version
- `--force` / `-f`: installs the latest npm version by executing `curl -L https://www.npmjs.org/install.sh | sh` without any prior checks; this options is useful if your [npm is broken](https://github.com/npm/npm/wiki/Troubleshooting#if-your-npm-is-broken); however, it requires `sh` (which comes with [Git For Windows](https://git-for-windows.github.io/), for example) and [`curl`](https://curl.haxx.se/); note that this flag disregards the `--check`, `--lts` and `--next` flags; use with caution
