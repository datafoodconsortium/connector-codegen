import { equal, ok, AssertionError } from 'node:assert';
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

/**
 * @import { TestContext } from 'node:test
 * @import { Observer } from "../src/observer"
 * @template T
 * @implements { Observer<T> }
 */
export class TestObserver {
	/** @public {T} */
	expected;
	/** @public {(actual: unknown, expected: T) => void} */
	assert = equal;
	/** @public {(result?: any) => void} */
	done;

	/**
	 * @constructor
	 * @param {T} expected
	 * @param {(actual: unknown, expected: T) => void} [assert=equal]
	 * @param {(result?: any) => void} [done]
	 */
	constructor(expected, assert = equal, done = undefined) {
		this.expected = expected;
		if (typeof assert === 'function') this.assert = assert;
		if (typeof done === 'function') this.done = done;
	}

	next(actual) {
		if (typeof this.assert !== 'function' || this.assert.length < 2) {
			const message =
				`${this.assert} [TestObserver:assert] is not a valid assertion function.`;
			throw new AssertionError({
				actual, expected: this.expected, message, operator: 'TestObserver:next',
			});
		}
		else this.assert(actual, this.expected);
	}

	error({ message }) {
		const operator = 'TestObserver:error';
		throw new AssertionError({ message, operator, expected: this.expected });
	}

	complete() {
		ok(true, 'TestObserver:complete');
		if (typeof this.done === 'function') this.done();
	}

}
