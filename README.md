<div align="center">
<img alt="Prettier"
  src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">
<img alt="C#"
  hspace="25"
  height="210"
  src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png">
</div>

<h2 align="center">CSharpier</h2>

<p align="center">
  <a href="https://gitter.im/jlongster/prettier">
    <img alt="Gitter" src="https://img.shields.io/gitter/room/jlongster/prettier.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/warrenseine/prettier-plugin-csharp">
    <img alt="Travis" src="https://img.shields.io/travis/warrenseine/prettier-plugin-csharp/master.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/prettier-plugin-csharp">
    <img alt="npm version" src="https://img.shields.io/npm/v/prettier-plugin-csharp.svg?style=flat-square">
  </a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://twitter.com/PrettierCode">
    <img alt="Follow+Prettier+on+Twitter" src="https://img.shields.io/twitter/follow/prettiercode.svg?label=follow+prettier&style=flat-square">
  </a>
</p>

## Intro

CSharpier adds C# support to the [Prettier](https://github.com/prettier/prettier) code formatter. Like Prettier, it is opinionated and restricts style options to a minimum. It runs where Prettier runs, including CI and pre-commit hooks.

## WORK IN PROGRESS

Please note that this plugin is under active development, and might not be ready to run on production code yet. **It will break your code.**

## Install

```bash
npm add --dev --exact prettier csharpier
```

## Use

```bash
prettier --write "**/*.cs"
```

## How it works

The plugin is written in JavaScript. It depends on the JavaScript port of ANTLR and relies on a fork of an [unofficial C# 6 grammar from ANTLR](https://github.com/antlr/grammars-v4/tree/master/csharp). The grammar is precompiled to plain JavaScript and ready to use in the project.

## Contributing

### Installing dependencies

Use your favorite Node package manager:

```bash
npm install
```

### Updating the grammar

The grammar supports C# 6 as a baseline, and tries to catch up with recent additions. Contributions are welcome. To update the grammar:

- Update `src/csharp/*.g4` files.
- Ensure you have Java 8+ installed on your machine.
- Fetch a local copy of ANTLR:

```bash
npm run fetch-antlr
```

- Generate the JavaScript parser:

```bash
npm run generate-parser
```

### Testing

The project is developed against a single grammar-complete regression test. There are no unit tests for the moment.

Run the test with:

```bash
npm run test
```

To test it out on an actual C# file:

- Clone this repository.
- Run `npm install`.
- Run `npm run prettier Your/File.cs` to check the output.
