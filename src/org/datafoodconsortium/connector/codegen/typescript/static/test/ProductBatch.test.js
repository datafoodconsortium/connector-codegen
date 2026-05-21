import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const realStock = connector.createRealStock({ semanticId: "http://myplatform.com/realStock" });
const physicalProduct = connector.createPhysicalProduct({ semanticId: "http://myplatform.com/physicalProduct" });

let productBatch = connector.createProductBatch({
    semanticId: "http://myplatform.com/productBatch",
    name: "name",
    description: "description",
    batchNumber: "123",
    realStock,
    physicalProduct,
    bestBeforeDate: "bestBeforeDate",
    expirationDate: "expirationDate",
    productionDate: "productionDate",
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@id":"http://myplatform.com/productBatch","@type":"dfc-b:ProductBatch","dfc-b:batchNumber":"123","dfc-b:bestBeforeDate":"bestBeforeDate","dfc-b:contains":{"@id":"http://myplatform.com/physicalProduct"},"dfc-b:description":"description","dfc-b:expirationDate":"expirationDate","dfc-b:identifiedBy":"http://myplatform.com/realStock","dfc-b:name":"name","dfc-b:productionDate":"productionDate"}`;

test('ProductBatch:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(productBatch), true);
});

test('ProductBatch:export', async () => {
    const serialized = await connector.export([productBatch]);
    expect.strictEqual(serialized, json);
});

test('ProductBatch:getSemanticId', () => {
    expect.strictEqual(productBatch.getSemanticId(), "http://myplatform.com/productBatch");
});

test('ProductBatch:getName', () => {
    expect.strictEqual(productBatch.getName(), "name");
});

test('ProductBatch:getDescription', () => {
    expect.strictEqual(productBatch.getDescription(), "description");
});