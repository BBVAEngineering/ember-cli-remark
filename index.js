'use strict';

const Funnel = require('broccoli-funnel');
const Remark = require('broccoli-lint-remark');
const VersionChecker = require('ember-cli-version-checker');
const extensions = require('markdown-extensions');

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

	included(app) {
		this._super.included.apply(this, arguments);
		this._options = app.options['ember-cli-remark'] || {};
	},

	lintTree(type) {
		if (type === 'templates') {
			return;
		}

		const options = Object.assign({
			testGenerator: this._testGenerator
		}, this._options);
		const files = new Funnel(type, {
			include: extensions.map((ext) => `**/*.${ext}`),
			allowEmpty: true
		});

		return new Remark(files, options);
	}
};
