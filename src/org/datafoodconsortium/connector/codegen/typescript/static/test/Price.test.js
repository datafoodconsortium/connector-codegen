import Price from '../lib/Price.js';
import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const euro = connector.MEASURES.UNIT.CURRENCYUNIT.EURO;

const price = new Price({
    connector: connector,
    value: 2.54,
    vatRate: 8.0,
    unit: euro
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:Price","dfc-b:VATrate":"8","dfc-b:hasUnit":"dfc-m:Euro","dfc-b:value":"2.54"}`;

test('Price:import', async () => {
    const imported = await connector.import(json);
    const importedPrice = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedPrice.equals(price)).toStrictEqual(true);
});

test('Price:export', async () => {
    const serialized = await connector.export([price]);
    expect(serialized).toStrictEqual(json);
});

test('Price:getSemanticId', async () => {
    expect(price.getSemanticId()).toStrictEqual(undefined);
});

test('Price:getValue', async () => {
    expect(price.getValue()).toStrictEqual(2.54);
});

test('Price:getVatRate', async () => {
    expect(price.getVatRate()).toStrictEqual(8);
});

test('Price:getUnit', async () => {
    expect(await price.getUnit()).toStrictEqual(euro);
});

test('Price:setValue', async () => {
    price.setValue(3);
    expect(price.getValue()).toStrictEqual(3);
});

test('Price:setVatRate', async () => {
    price.setVatRate(19);
    expect(price.getVatRate()).toStrictEqual(19);
});

test('Price:setUnit', async () => {
    const dollar = connector.MEASURES.UNIT.CURRENCYUNIT.USDOLLAR;
    price.setUnit(dollar);
    expect(await price.getUnit()).toStrictEqual(dollar);
});