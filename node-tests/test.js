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

	it('passes if RemarkLint tests pass', async function() {
		process.env.NO_GROUPING = true;

		const result = await emberTest();

		expect(result.error).to.not.exist;
		expect(result.stdout).to.not.match(/^not ok 4 Chrome \d+.0 - RemarkLint \| dummy\/app\/unused.md: should pass RemarkLint/m);
	});

	it('fails if a RemarkLint tests fails', async function () {
		process.env.NO_GROUPING = true;

		fs.outputFileSync(FAILING_FILE, '# foo');

		const result = await emberTest();

		expect(result.error).to.exist;
		expect(result.stdout).to.match(/^not ok 4 Chrome \d+.0 - RemarkLint \| dummy\/app\/unused.md: should pass RemarkLint/m);
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
