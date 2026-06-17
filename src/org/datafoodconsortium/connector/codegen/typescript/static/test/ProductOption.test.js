import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/productOption","@type":"dfc-b:ProductOption","dfc-b:date":"date","dfc-b:description":"description","dfc-b:hasReferenceProductOptionValue":"http://myplatform.com/productOptionValue","dfc-b:name":"name"}`;

const productOptionValue = connector.createProductOptionValue({ semanticId: "http://myplatform.com/productOptionValue" });

const productOption = connector.createProductOption({
    semanticId: "http://myplatform.com/productOption",
    name: "name",
    description: "description",
    date: "date",
    referenceProductionOptionValue: [productOptionValue],
});

test('ProductOption:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(productOption), true);
});

test('ProductOption:export', async () => {
    const serialized = await connector.export([productOption]);
    expect.strictEqual(serialized, json);
});