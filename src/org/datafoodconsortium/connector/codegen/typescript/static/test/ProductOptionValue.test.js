import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/productOptionValue","@type":"dfc-b:ProductOptionValue","dfc-b:date":"date","dfc-b:description":"description","dfc-b:name":"name"}`;

const productOptionValue = connector.createProductOptionValue({
    semanticId: "http://myplatform.com/productOptionValue",
    name: "name",
    description: "description",
    date: "date",
});

test('ProductOptionValue:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(productOptionValue), true);
});

test('ProductOptionValue:export', async () => {
    const serialized = await connector.export([productOptionValue]);
    expect.strictEqual(serialized, json);
});