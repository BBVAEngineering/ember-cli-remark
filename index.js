'use strict';

const fs = require('fs');
const path = require('path');
const Funnel = require('broccoli-funnel');
const Remark = require('broccoli-lint-remark');
const mergeTrees = require('broccoli-merge-trees');
const VersionChecker = require('ember-cli-version-checker');

module.exports = {
	name: 'ember-cli-remark',

	init() {
		this._super.init && this._super.init.apply(this, arguments);

		const checker = new VersionChecker(this);

		if (checker.for('ember-qunit', 'npm').exists() || checker.for('ember-cli-qunit', 'npm').exists()) {
			this._testGenerator = 'qunit';
		} else if (checker.for('ember-mocha', 'npm').exists() || checker.for('ember-cli-mocha', 'npm').exists()) {
			this._testGenerator = 'mocha';
		}
	},

	included: function (app) {
		this._super.included.apply(this, arguments);
		this._options = app.options.remark || {};
	},

	lintTree(type) {
		const options = {
			quiet: this._options.quiet || false,
			testGenerator: this._options.testGenerator || this._testGenerator
		};
		const files = new Funnel('.', {
			include: [`${type}/**/*`],
			allowEmpty: true
		});
		const remarkTree = new Remark(files, options);

		if (type === 'tests') {
			// Instead of using this tree only to lint tests, use it to lint root dir files
			const rootMarkdowns = new Funnel('.', {
				include: ['*.*']
			});

			return mergeTrees([
				new Remark(rootMarkdowns, options),
				remarkTree
			]);
		}

		return remarkTree;
	}
};
