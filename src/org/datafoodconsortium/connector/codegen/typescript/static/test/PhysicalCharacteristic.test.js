import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
const facets = JSON.parse(fs.readFileSync('./test/thesaurus/facets.json'));
const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));

const connector = new Connector();
await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
const physicalDimension = connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT;
const physicalDimension2 = connector.MEASURES.DIMENSION.PHYSICALDIMENSION.HEIGHT;

const physicalCharacteristic = connector.createPhysicalCharacteristic({ 
    value: 100, 
    unit: kilogram, 
    physicalDimension: physicalDimension
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:PhysicalCharacteristic","dfc-b:hasPhysicalDimension":"dfc-m:Weight","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"100"}`;

test('PhysicalCharacteristic:import', async () => {
    const imported = await connector.import(json);
    const importedPhysicalCharacteristic = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedPhysicalCharacteristic.equals(physicalCharacteristic), true);
});

test('PhysicalCharacteristic:export', async () => {
    const serialized = await connector.export([physicalCharacteristic]);
    expect.strictEqual(serialized, json);
});

test('PhysicalCharacteristic:getSemanticId', () => {
    expect.strictEqual(physicalCharacteristic.getSemanticId(), undefined);
});

test('PhysicalCharacteristic:getQuantityValue', () => {
    expect.strictEqual(physicalCharacteristic.getQuantityValue(), 100);
});

test('PhysicalCharacteristic:getQuantityUnit', async () => {
    expect.strictEqual(await physicalCharacteristic.getQuantityUnit(), kilogram);
});

test('PhysicalCharacteristic:getQuantityDimension', async () => {
    expect.strictEqual(await physicalCharacteristic.getQuantityDimension(), physicalDimension);
});

test('PhysicalCharacteristic:setQuantityValue', () => {
    physicalCharacteristic.setQuantityValue(6.35);
    expect.strictEqual(physicalCharacteristic.getQuantityValue(), 6.35);
});

test('PhysicalCharacteristic:setQuantityUnit', async () => {
    physicalCharacteristic.setQuantityUnit(gram);
    expect.strictEqual(await physicalCharacteristic.getQuantityUnit(), gram);
});

test('PhysicalCharacteristic:setQuantityDimension', async () => {
    physicalCharacteristic.setQuantityDimension(physicalDimension2);
    expect.strictEqual(await physicalCharacteristic.getQuantityDimension(), physicalDimension2);
});