import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
import { assertSemanticEqual, TestObserver } from './utils.js';

const connector = new Connector();

const customerCategory = connector.createCustomerCategory({
    semanticId: "http://myplatform.com/customerCategory1",
    description: "description"
})

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/customerCategory1","@type":"dfc-b:CustomerCategory","dfc-b:description":"description"}`;

test('CustomerCategory:import', async () => {
    const testObs = new TestObserver(customerCategory, assertSemanticEqual);
    const testSub = connector.subscribe('import', testObs);
    const imported = await connector.import(json);
    const importedCustomerCategory = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedCustomerCategory.equals(customerCategory), true);
    expect.doesNotThrow(() => {
        testObs.complete();
        testSub.unsubscribe();
    }, '#unsubscribe');
});

test('CustomerCategory:export', async () => {
    const serialized = await connector.export([customerCategory]);
    expect.strictEqual(serialized, json);
});

test('CustomerCategory:getSemanticId', () => {
    expect.strictEqual(customerCategory.getSemanticId(), "http://myplatform.com/customerCategory1");
});

test('CustomerCategory:getDescription', () => {
    expect.strictEqual(customerCategory.getDescription(), "description");
});

test('CustomerCategory:setDescription', async () => {
    customerCategory.setDescription("description2");
    expect.strictEqual(customerCategory.getDescription(), "description2");
});