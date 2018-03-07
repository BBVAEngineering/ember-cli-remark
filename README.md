# ember-cli-remark

[![Build Status](https://travis-ci.org/BBVAEngineering/ember-cli-remark.svg?branch=master)](https://travis-ci.org/BBVAEngineering/ember-cli-remark)
[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-remark.svg)](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-remark)
[![npm version](https://badge.fury.io/js/ember-cli-remark.svg)](https://badge.fury.io/js/ember-cli-remark)
[![Dependency Status](https://david-dm.org/BBVAEngineering/ember-cli-remark.svg)](https://david-dm.org/BBVAEngineering/ember-cli-remark)

Ember wrapper for [remark-lint](https://github.com/remarkjs/remark-lint).

## Information

[![NPM](https://nodei.co/npm/ember-cli-remark.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ember-cli-remark/)

## Installation

```
ember install ember-cli-remark
```

After installation, configure your rules using the `.remarkrc` 
file as shown in [Remarks's configuration](https://github.com/remarkjs/remark/blob/master/doc/getting-started.md#using-remark-in-a-project).

Furthermore, a `.remarkignore` file can be used to exclude files from linting while the linter is running.
Its syntax is identical to `.gitignore` files.

## Usage

[Remark](https://remark.js.org/) will be run by `ember-cli-qunit` or `ember-cli-mocha` automatically when you run ember test.
If Remark is not being run automatically, try updating your `ember-cli` and/or `remark` dependencies.

### Configuration

`ember-cli-remark` can be configured through the `remark` key in your `ember-cli-build.js` file:

```js
const app = new EmberApp(defaults, {
  remark: {
    testGenerator: 'qunit',
    quiet: true
  }
});
```

- `testGenerator` is automatically detected if `ember-qunit`/`ember-cli-qunit`
  or `ember-mocha`/`ember-cli-mocha` are used, but can also be set to `qunit`
  and `mocha` manually.

- `quiet` can be set to `true` to prevent printing Remark logs.

## Contribute

If you want to contribute to this addon, please read the [CONTRIBUTING.md](CONTRIBUTING.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BBVAEngineering/ember-cli-remark/tags).

## Authors

See the list of [contributors](https://github.com/BBVAEngineering/ember-cli-remark/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
