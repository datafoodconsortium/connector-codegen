import { equal, ok, AssertionError } from 'node:assert';
import Dataset from "@rdfjs/dataset/DatasetCore.js";
import { SemanticObject } from '@virtual-assembly/semantizer';

/**
 * Asserts that the actual semanticable object or RDF dataset is equivalent to
 * the expected semantic object.
 * @param {SemanticObject|Dataset[]|Dataset[]|unknown} actual Actual test value
 * @param {SemanticObject} expected Expected test value
 */
export function assertSemanticEqual(actual, expected) {
	if (Array.isArray(actual)) {
		assertDatasetEqualsSemanticObject(actual, expected);
	} else if (actual && actual instanceof Dataset) {
		assertDatasetEqualsSemanticObject([actual], expected);
	} else {
		assertSemanticStrictEqual(actual, expected);
	}
}

/**
 * Asserts a strict equivalence between actual and expected semantic objects via
 * SemanticObject.prototype.equals().
 * @param {SemanticObject|unknown} actual Actual test value
 * @param {SemanticObject} expected Expected test value
 */
export function assertSemanticStrictEqual(actual, expected) {
	const operator = 'SemanticObject.equals';
	const errOpts = { actual, expected, operator };
	if (!(actual && actual instanceof SemanticObject)) {
		errOpts.message = 'Expected an instance of SemanticObject:';
	} else if (!expected.equals(actual)) {
		errOpts.message = 'Expected semantic objects to have equal properties:';
	}
	if (errOpts.message) throw new AssertionError(errOpts);
	ok(actual);
}

/**
 * Asserts that the first element in an expected array of semantic objects is
 * equivalent to a single expected semantic object.
 * @param {Dataset[]} actual An array of actual test values
 * @param {SemanticObject} expected Expected first value
 */
export function assertDatasetEqualsSemanticObject(actual, expected) {
	ok(Array.isArray(actual) && actual.length > 0);
	const [dataset] = actual;
	let maybeSemObj = dataset;
	if (dataset && typeof dataset === 'object' && dataset instanceof Dataset) {
		const semantizer = expected.getSemantizer();
		maybeSemObj = SemanticObject.createFromRdfDataset(semantizer, dataset);
	}
	const isSemanticable = maybeSemObj
		&& typeof maybeSemObj === 'object'
		&& maybeSemObj instanceof SemanticObject;
	if (isSemanticable) {
		assertSemanticStrictEqual(maybeSemObj, expected);
	} else {
		const message = 'Expected an instance of SemanticObject or RDF dataset.';
		throw new AssertionError({ actual, expected, message });
	} 
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
