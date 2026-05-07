import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
import { assertSemanticEqual, TestObserver } from './utils.js';

const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const allergenDimension = connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS;

const allergenCharacteristic = connector.createAllergenCharacteristic({
    value: 1,
    unit: kilogram,
    allergenDimension: allergenDimension
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:AllergenCharacteristic","dfc-b:hasAllergenDimension":"dfc-m:Peanuts","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"}`;

test('AllergenCharacteristic:import', async () => {
    const testObs = new TestObserver(allergenCharacteristic, assertSemanticEqual);
    const testSub = connector.subscribe('import', testObs);
    const imported = await connector.import(json);
    const importedAllergenCharacteristic = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedAllergenCharacteristic.equals(allergenCharacteristic), true);
    expect.doesNotThrow(() => {
        testObs.complete();
        testSub.unsubscribe();
    }, '#unsubscribe');
});

test('AllergenCharacteristic:export', async () => {
    const serialized = await connector.export([allergenCharacteristic]);
    expect.strictEqual(serialized, json);
});

test('AllergenCharacteristic:getSemanticId', () => {
    expect.strictEqual(allergenCharacteristic.getSemanticId(), undefined);
});

test('AllergenCharacteristic:getQuantityValue', () => {
    expect.strictEqual(allergenCharacteristic.getQuantityValue(), 1);
});

test('AllergenCharacteristic:getQuantityUnit', async () => {
    expect.strictEqual(await allergenCharacteristic.getQuantityUnit(), kilogram);
});

test('AllergenCharacteristic:getQuantityDimension', async () => {
    expect.strictEqual(await allergenCharacteristic.getQuantityDimension(), allergenDimension);
});