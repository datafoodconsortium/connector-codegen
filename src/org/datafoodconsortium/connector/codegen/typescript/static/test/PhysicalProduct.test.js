import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
const facets = JSON.parse(fs.readFileSync('./test/thesaurus/facets.json'));
const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));
const productTypes = JSON.parse(fs.readFileSync('./test/thesaurus/productTypes.json'));

const connector = new Connector();

await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));
await connector.loadProductTypes(JSON.stringify(productTypes));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

const quantity = connector.createQuantity({ 
    value: 1.2, 
    unit: kilogram
});

const localizedProduct = connector.createLocalizedProduct({ semanticId: "http://myplatform.com/localizedProduct" });
const productBatch = connector.createProductBatch({ semanticId: "http://myplatform.com/productBatch" });
const realStock = connector.createRealStock({ semanticId: "http://myplatform.com/realStock" });
const realizedConsumptionFlow = connector.createRealizedConsumptionFlow({ semanticId: "http://myplatform.com/realizedConsumptionFlow" });
const realizedProductionFlow = connector.createRealizedProductionFlow({ semanticId: "http://myplatform.com/realizedProductionFlow" });

let physicalProduct = connector.createPhysicalProduct({
    semanticId: "http://myplatform.com/tomato",
    name: "name",
    description: "description",
    quantity: quantity,
    images: ["http://myplatform.com/image1", "http://myplatform.com/image2"],
    localizedProducts: [localizedProduct],
    productBatches: [productBatch],
    realStocks: [realStock],
    realizedConsumptionFlows: [realizedConsumptionFlow],
    realizedProductionFlows: [realizedProductionFlow],
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1.2"},{"@id":"http://myplatform.com/tomato","@type":"dfc-b:PhysicalProduct","dfc-b:constituedBy":"http://myplatform.com/realStock","dfc-b:consumedBy":"http://myplatform.com/realizedConsumptionFlow","dfc-b:description":"description","dfc-b:hasQuantity":"_:b1","dfc-b:image":["http://myplatform.com/image1","http://myplatform.com/image2"],"dfc-b:name":"name","dfc-b:producedBy":"http://myplatform.com/realizedProductionFlow","dfc-b:represents":"http://myplatform.com/localizedProduct","dfc-b:tracedBy":"http://myplatform.com/productBatch"}]}`;

test('PhysicalProduct:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(physicalProduct), true);
});

test('PhysicalProduct:export', async () => {
    const serialized = await connector.export([physicalProduct]);
    expect.strictEqual(serialized, json);
});

test('PhysicalProduct:getSemanticId', () => {
    expect.strictEqual(physicalProduct.getSemanticId(), "http://myplatform.com/tomato");
});

test('PhysicalProduct:getName', () => {
    expect.strictEqual(physicalProduct.getName(), "name");
});

test('PhysicalProduct:getDescription', () => {
    expect.strictEqual(physicalProduct.getDescription(), "description");
});
