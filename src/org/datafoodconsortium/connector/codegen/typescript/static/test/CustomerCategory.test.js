import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const customerCategory = connector.createCustomerCategory({
    semanticId: "http://myplatform.com/customerCategory1",
    name: "name",
    description: "description"
})

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@id":"http://myplatform.com/customerCategory1","@type":"dfc-b:CustomerCategory","dfc-b:description":"description","dfc-b:name":"name"}`;

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

test('CustomerCategory:getName', () => {
    expect.strictEqual(customerCategory.getName(), "name");
});

test('CustomerCategory:setName', () => {
    customerCategory.setName("name2");
    expect.strictEqual(customerCategory.getName(), "name2");
});

test('CustomerCategory:getDescription', () => {
    expect.strictEqual(customerCategory.getDescription(), "description");
});

test('CustomerCategory:setDescription', () => {
    customerCategory.setDescription("description2");
    expect.strictEqual(customerCategory.getDescription(), "description2");
});