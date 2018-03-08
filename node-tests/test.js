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
			expect(result.stdout).to.match(/^ok 1 Chrome \d+.0 - RemarkLint \| CONTRIBUTING.md: should pass RemarkLint/m);
			expect(result.stdout).to.match(/^ok 2 Chrome \d+.0 - RemarkLint \| LICENSE.md: should pass RemarkLint/m);
			expect(result.stdout).to.match(/^ok 3 Chrome \d+.0 - RemarkLint \| README.md: should pass RemarkLint/m);
			expect(result.stdout).to.not.match(/^not ok 8 Chrome \d+.0 - RemarkLint \| tests\/dummy\/app\/unused.md: should pass RemarkLint/m);
		});
	});

	it('fails if a RemarkLint tests fails', () => {
		process.env.NO_GROUPING = true;

		fs.outputFileSync(FAILING_FILE, '# foo');

		return emberTest({ NO_GROUPING: true }).then((result) => {
			expect(result.error).to.exist;
			expect(result.stdout).to.match(/^ok 1 Chrome \d+.0 - RemarkLint \| CONTRIBUTING.md: should pass RemarkLint/m);
			expect(result.stdout).to.match(/^ok 2 Chrome \d+.0 - RemarkLint \| LICENSE.md: should pass RemarkLint/m);
			expect(result.stdout).to.match(/^ok 3 Chrome \d+.0 - RemarkLint \| README.md: should pass RemarkLint/m);
			expect(result.stdout).to.match(/^not ok 8 Chrome \d+.0 - RemarkLint \| tests\/dummy\/app\/unused.md: should pass RemarkLint/m);

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
