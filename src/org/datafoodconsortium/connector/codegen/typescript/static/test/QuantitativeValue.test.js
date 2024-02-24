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

const json = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"}`;

test('QuantitativeValue:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect(importedAll.length).toStrictEqual(1);
    expect(imported.equals(quantitativeValue)).toStrictEqual(true);
});

test('QuantitativeValue:export', async () => {
    const serialized = await connector.export([quantitativeValue]);
    expect(serialized).toStrictEqual(json);
});

test('QuantitativeValue:getSemanticId', async () => {
    expect(quantitativeValue.getSemanticId()).toStrictEqual(undefined);
});

test('QuantitativeValue:getQuantityUnit', async () => {
    const expected = await quantitativeValue.getQuantityUnit();
    expect(expected.equals(kilogram)).toStrictEqual(true);
});

test('QuantitativeValue:getQuantityValue', async () => {
    expect(quantitativeValue.getQuantityValue()).toStrictEqual(1);
});

test('QuantitativeValue:setQuantityUnit', async () => {
    const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
    quantitativeValue.setQuantityUnit(gram);
    const expected = await quantitativeValue.getQuantityUnit();
    expect(expected.equals(gram)).toStrictEqual(true);
});

test('QuantitativeValue:setQuantityValue', async () => {
    quantitativeValue.setQuantityValue(2.5)
    expect(quantitativeValue.getQuantityValue()).toStrictEqual(2.5);
});