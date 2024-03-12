import expect from 'node:assert';
import { test } from 'node:test';
import CustomerCategory from '../lib/CustomerCategory.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const customerCategory = new CustomerCategory({
    connector: connector,
    semanticId: "http://myplatform.com/customerCategory1",
    description: "description"
})

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/customerCategory1","@type":"dfc-b:CustomerCategory","dfc-b:description":"description"}`;

test('CustomerCategory:import', async () => {
    const imported = await connector.import(json);
    const importedCustomerCategory = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedCustomerCategory.equals(customerCategory), true);
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