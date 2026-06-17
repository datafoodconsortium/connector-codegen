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

const suppliedProduct = connector.createSuppliedProduct({ semanticId: "http://myplatform.com/suppliedProduct" });
const physicalProduct = connector.createPhysicalProduct({ semanticId: "http://myplatform.com/physicalProduct" });
const theoreticalStock = connector.createTheoreticalStock({ semanticId: "http://myplatform.com/theoreticalStock" });
const plannedLocalConsumptionFlow = connector.createPlannedLocalConsumptionFlow({ semanticId: "http://myplatform.com/plannedLocalConsumptionFlow" });
const plannedLocalProductionFlow = connector.createPlannedLocalProductionFlow({ semanticId: "http://myplatform.com/plannedLocalProductionFlow" });

let localizedProduct = connector.createLocalizedProduct({
    semanticId: "http://myplatform.com/tomato",
    name: "name",
    description: "description",
    quantity: quantity,
    images: ["http://myplatform.com/image1", "http://myplatform.com/image2"],
    cost: 123,
    suppliedProducts: [suppliedProduct],
    physicalProducts: [physicalProduct],
    theoreticalStocks: [theoreticalStock],
    plannedLocalConsumptionFlows: [plannedLocalConsumptionFlow],
    plannedLocalProductionFlows: [plannedLocalProductionFlow]
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1.2"},{"@id":"http://myplatform.com/tomato","@type":"dfc-b:LocalizedProduct","dfc-b:constituedBy":"http://myplatform.com/theoreticalStock","dfc-b:consumedBy":"http://myplatform.com/plannedLocalConsumptionFlow","dfc-b:cost":"123","dfc-b:description":"description","dfc-b:hasQuantity":"_:b1","dfc-b:hasReference":"http://myplatform.com/suppliedProduct","dfc-b:image":["http://myplatform.com/image1","http://myplatform.com/image2"],"dfc-b:name":"name","dfc-b:producedBy":"http://myplatform.com/plannedLocalProductionFlow","dfc-b:representedBy":"http://myplatform.com/physicalProduct"}]}`;

test('LocalizedProduct:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(localizedProduct), true);
});

test('LocalizedProduct:export', async () => {
    const serialized = await connector.export([localizedProduct]);
    expect.strictEqual(serialized, json);
});

test('LocalizedProduct:getSemanticId', () => {
    expect.strictEqual(localizedProduct.getSemanticId(), "http://myplatform.com/tomato");
});

test('LocalizedProduct:getName', () => {
    expect.strictEqual(localizedProduct.getName(), "name");
});

test('LocalizedProduct:getDescription', () => {
    expect.strictEqual(localizedProduct.getDescription(), "description");
});
