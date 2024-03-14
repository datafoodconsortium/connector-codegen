import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import Connector from "../lib/Connector.js";
const facets = JSON.parse(fs.readFileSync('./test/thesaurus/facets.json'));
const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));

const connector = new Connector();
await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));

const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const nutrientDimension = connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM;
const nutrientDimension2 = connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.FAT;

const nutrientCharacteristic = new NutrientCharacteristic({ 
    connector: connector, 
    value: 10, 
    unit: kilogram, 
    nutrientDimension: nutrientDimension
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:NutrientCharacteristic","dfc-b:hasNutrientDimension":{"@id":"dfc-m:Calcium"},"dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"10"}`;

test('NutrientCharacteristic:import', async () => {
    const imported = await connector.import(json);
    const importedNutrientCharacteristic = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedNutrientCharacteristic.equals(nutrientCharacteristic), true);
});

test('NutrientCharacteristic:export', async () => {
    const serialized = await connector.export([nutrientCharacteristic]);
    expect.strictEqual(serialized, json);
});

test('NutrientCharacteristic:getSemanticId', () => {
    expect.strictEqual(nutrientCharacteristic.getSemanticId(), undefined);
});

test('NutrientCharacteristic:getQuantityValue', () => {
    expect.strictEqual(nutrientCharacteristic.getQuantityValue(), 10);
});

test('NutrientCharacteristic:getQuantityUnit', async () => {
    expect.strictEqual(await nutrientCharacteristic.getQuantityUnit(), kilogram);
});

test('NutrientCharacteristic:getQuantityDimension', async () => {
    expect.strictEqual(await nutrientCharacteristic.getQuantityDimension(), nutrientDimension);
});

test('NutrientCharacteristic:setQuantityValue', () => {
    nutrientCharacteristic.setQuantityValue(6.35);
    expect.strictEqual(nutrientCharacteristic.getQuantityValue(), 6.35);
});

test('NutrientCharacteristic:setQuantityUnit', async () => {
    nutrientCharacteristic.setQuantityUnit(gram);
    expect.strictEqual(await nutrientCharacteristic.getQuantityUnit(), gram);
});

test('NutrientCharacteristic:setQuantityDimension', async () => {
    nutrientCharacteristic.setQuantityDimension(nutrientDimension2);
    expect.strictEqual(await nutrientCharacteristic.getQuantityDimension(), nutrientDimension2);
});