import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/variantCharacteristic","@type":"dfc-b:VariantCaracteristic","dfc-b:date":"date","dfc-b:description":"description","dfc-b:hasProductOption":"http://myplatform.com/productOption","dfc-b:hasProductOptionValue":"http://myplatform.com/productOptionValue","dfc-b:name":"name"}`;

const productOption = connector.createProductOption({ semanticId: "http://myplatform.com/productOption" });
const productOptionValue = connector.createProductOptionValue({ semanticId: "http://myplatform.com/productOptionValue" });

const variantCharacteristic = connector.createVariantCharacteristic({
    semanticId: "http://myplatform.com/variantCharacteristic",
    name: "name",
    description: "description",
    date: "date",
    productOption,
    productOptionValue,
});

test('VariantCharacteristic:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(variantCharacteristic), true);
});

test('VariantCharacteristic:export', async () => {
    const serialized = await connector.export([variantCharacteristic]);
    expect.strictEqual(serialized, json);
});