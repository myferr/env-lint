# env-lint

[![CI](https://github.com/myferr/env-lint/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/myferr/env-lint/actions/workflows/npm-publish.yml)
[![License](https://img.shields.io/github/license/myferr/env-lint)](LICENSE)
[![npm version](https://img.shields.io/npm/v/env-lint.svg)](https://www.npmjs.com/package/env-lint)

**env-lint** is a CLI tool to lint your `.env` and `.env.example` files for missing or unused environment variables.  

Ensure your environment variable files stay consistent and clean!

## Installation

```bash
npm install -g env-lint
```

## Usage

Run in your project directory:

```bash
env-lint            # if installed
npx env-lint@latest # if not installed
```

By default, it will check your `.env` and `.env.example` files for inconsistencies.

## Contributing

Contributions and issues are welcome! Feel free to open a PR or report bugs.
