import expect from 'node:assert';
import { test } from 'node:test';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

const quantitativeValue = new QuantitativeValue({ 
    connector: connector, 
    value: 1, 
    unit: kilogram 
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"}`;

test('QuantitativeValue:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(quantitativeValue), true);
});

test('QuantitativeValue:export', async () => {
    const serialized = await connector.export([quantitativeValue]);
    expect.strictEqual(serialized, json);
});

test('QuantitativeValue:getSemanticId', async () => {
    expect.strictEqual(quantitativeValue.getSemanticId(), undefined);
});

test('QuantitativeValue:getQuantityUnit', async () => {
    const expected = await quantitativeValue.getQuantityUnit();
    expect.strictEqual(expected.equals(kilogram), true);
});

test('QuantitativeValue:getQuantityValue', async () => {
    expect.strictEqual(quantitativeValue.getQuantityValue(), 1);
});

test('QuantitativeValue:setQuantityUnit', async () => {
    const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
    quantitativeValue.setQuantityUnit(gram);
    const expected = await quantitativeValue.getQuantityUnit();
    expect.strictEqual(expected.equals(gram), true);
});

test('QuantitativeValue:setQuantityValue', async () => {
    quantitativeValue.setQuantityValue(2.5)
    expect.strictEqual(quantitativeValue.getQuantityValue(), 2.5);
});