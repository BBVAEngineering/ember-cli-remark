'use strict';

const fs = require('fs');
const Funnel = require('broccoli-funnel');
const Remark = require('broccoli-lint-remark');
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

		if (type === 'templates') {
			// Instead of using this tree to lint templates, use it to lint root dir files
			const readme = new Funnel('.', {
				files: ['README.md']
			});

			return new Remark(readme, options);
		}

		try {
			const stats = fs.statSync(type);

			if (stats.isDirectory()) {
				return new Remark(type, options);
			}
		} catch(e) {}
	}
};
