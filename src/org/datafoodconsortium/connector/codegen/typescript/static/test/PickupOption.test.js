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

const order = connector.createOrder({ semanticId: "http://myplatform.com/order" });
const saleSession = connector.createSaleSession({ semanticId: "http://myplatform.com/saleSession" });
const pickupPlace = connector.createPhysicalPlace({ semanticId: "http://myplatform.com/pickupPlace" });

let pickupOption = connector.createPickupOption({
    semanticId: "http://myplatform.com/pickupOption",
    name: "name",
    description: "description",
    fee: 123,
    quantity,
    order,
    saleSession,
    pickupPlace,
    beginDate: "beginDate",
    endDate: "endDate",
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1.2"},{"@id":"http://myplatform.com/pickupOption","@type":"dfc-b:PickupOption","dfc-b:description":"description","dfc-b:endDate":"endDate","dfc-b:fee":"123","dfc-b:hasQuantity":"_:b1","dfc-b:name":"name","dfc-b:optionOf":"http://myplatform.com/saleSession","dfc-b:pickedUpAt":"http://myplatform.com/pickupPlace","dfc-b:selectedBy":"http://myplatform.com/order","dfc-b:startDate":"beginDate"}]}`;

test('PickupOption:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(pickupOption), true);
});

test('PickupOption:export', async () => {
    const serialized = await connector.export([pickupOption]);
    expect.strictEqual(serialized, json);
});

test('PickupOption:getSemanticId', () => {
    expect.strictEqual(pickupOption.getSemanticId(), "http://myplatform.com/pickupOption");
});

test('PickupOption:getName', () => {
    expect.strictEqual(pickupOption.getName(), "name");
});

test('PickupOption:getDescription', () => {
    expect.strictEqual(pickupOption.getDescription(), "description");
});

test('PickupOption:getQuantity', () => {
    expect.strictEqual(pickupOption.getQuantity(), quantity);
});