import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const physicalProduct = connector.createPhysicalProduct({ semanticId: "http://myplatform.com/physicalProduct" });
const quantity = connector.createQuantity();
const physicalPlace = connector.createPhysicalPlace({ semanticId: "http://myplatform.com/physicalPlace" });
const productBatch = connector.createProductBatch({ semanticId: "http://myplatform.com/productBatch" });

let realStock = connector.createRealStock({
    semanticId: "http://myplatform.com/realStock",
    physicalProduct,
    quantity,
    physicalPlace,
    availabilityDate: "availabilityDate",
    productBatches: [productBatch],
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue"},{"@id":"http://myplatform.com/realStock","@type":"dfc-b:RealStock","dfc-b:availabilityDate":"availabilityDate","dfc-b:constitutes":"http://myplatform.com/physicalProduct","dfc-b:hasQuantity":"_:b1","dfc-b:identifies":"http://myplatform.com/productBatch","dfc-b:isStoredIn":{"@id":"http://myplatform.com/physicalPlace"}}]}`;

test('RealStock:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(realStock), true);
});

test('RealStock:export', async () => {
    const serialized = await connector.export([realStock]);
    expect.strictEqual(serialized, json);
});

test('RealStock:getSemanticId', () => {
    expect.strictEqual(realStock.getSemanticId(), "http://myplatform.com/realStock");
});

