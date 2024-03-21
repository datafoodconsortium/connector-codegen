import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const euro = connector.MEASURES.UNIT.CURRENCYUNIT.EURO;

const price = connector.createPrice({
    value: 2.54,
    vatRate: 8.0,
    unit: euro
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:Price","dfc-b:VATrate":"8","dfc-b:hasUnit":"dfc-m:Euro","dfc-b:value":"2.54"}`;

test('Price:import', async () => {
    const imported = await connector.import(json);
    const importedPrice = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedPrice.equals(price), true);
});

test('Price:export', async () => {
    const serialized = await connector.export([price]);
    expect.strictEqual(serialized, json);
});

test('Price:getSemanticId', () => {
    expect.strictEqual(price.getSemanticId(), undefined);
});

test('Price:getQuantityValue', () => {
    expect.strictEqual(price.getQuantityValue(), 2.54);
});

test('Price:getVatRate', () => {
    expect.strictEqual(price.getVatRate(), 8);
});

test('Price:getQuantityUnit', async () => {
    expect.strictEqual(await price.getQuantityUnit(), euro);
});

test('Price:setQuantityValue', () => {
    price.setQuantityValue(3);
    expect.strictEqual(price.getQuantityValue(), 3);
});

test('Price:setVatRate', () => {
    price.setVatRate(19);
    expect.strictEqual(price.getVatRate(), 19);
});

test('Price:setQuantityUnit', async () => {
    const dollar = connector.MEASURES.UNIT.CURRENCYUNIT.USDOLLAR;
    price.setQuantityUnit(dollar);
    expect.strictEqual(await price.getQuantityUnit(), dollar);
});