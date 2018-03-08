const path = require('path');
const fs = require('fs-extra');
const exec = require('child_process').exec;
const expect = require('chai').expect;

const FAILING_FILE = path.join(__dirname, '../tests/dummy/app/unused.md');

describe('ember-cli-eslint', function() {
	this.timeout(60000);

	afterEach(() => {
		fs.removeSync(FAILING_FILE);
	});

	it('passes if RemarkLint tests pass', () => {
		process.env.NO_GROUPING = true;

		return emberTest().then((result) => {
			expect(result.error).to.not.exist;
			expect(result.stdout.match(/[^\r\n]+/g))
				.to.contain('ok 1 Chrome 64.0 - RemarkLint | CONTRIBUTING.md: should pass RemarkLint')
				.to.contain('ok 2 Chrome 64.0 - RemarkLint | LICENSE.md: should pass RemarkLint')
				.to.contain('ok 3 Chrome 64.0 - RemarkLint | README.md: should pass RemarkLint')
				.to.not.contain('not ok 8 Chrome 64.0 - RemarkLint | tests/dummy/app/unused.md: should pass RemarkLint');
		});
	});

	it('fails if a RemarkLint tests fails', () => {
		process.env.NO_GROUPING = true;

		fs.outputFileSync(FAILING_FILE, '# foo');

		return emberTest({ NO_GROUPING: true }).then((result) => {
			expect(result.error).to.exist;
			expect(result.stdout.match(/[^\r\n]+/g))
				.to.contain('ok 1 Chrome 64.0 - RemarkLint | CONTRIBUTING.md: should pass RemarkLint')
				.to.contain('ok 2 Chrome 64.0 - RemarkLint | LICENSE.md: should pass RemarkLint')
				.to.contain('ok 3 Chrome 64.0 - RemarkLint | README.md: should pass RemarkLint')
				.to.contain('not ok 8 Chrome 64.0 - RemarkLint | tests/dummy/app/unused.md: should pass RemarkLint');
		});
	});
});

function emberTest() {
	return new Promise((resolve) => {
		exec('node_modules/.bin/ember test', { cwd: path.join(__dirname, '..'), env: process.env }, (error, stdout, stderr) => {
			resolve({
				error,
				stdout,
				stderr
			});
		});
	});
}
