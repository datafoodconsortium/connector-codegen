import { ok, AssertionError } from 'node:assert';
import { SemanticObject } from '@virtual-assembly/semantizer';

/**
 * assertSemanticEqual
 * @param {*} actual Actual test value
 * @param {SemanticObject} expected Expected test value
 */
export function assertSemanticEqual(actual, expected) {
	const operator = 'SemanticObject.equals';
	const errOpts = { actual, expected, operator };
	if (!(actual instanceof SemanticObject)) {
		errOpts.message = 'Expected an instance of SemanticObject:';
	} else if (!expected.equals(actual)) {
		errOpts.message = 'Expected semantic objects to have equal properties:';
	}
	if (errOpts.message) throw new AssertionError(errOpts);
	ok(actual);
}
