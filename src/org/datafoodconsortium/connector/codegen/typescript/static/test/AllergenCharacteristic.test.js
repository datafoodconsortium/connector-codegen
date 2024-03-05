import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const allergenDimension = connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS;

const allergenCharacteristic = new AllergenCharacteristic({
    connector: connector, 
    value: 1, 
    unit: kilogram, 
    allergenDimension: allergenDimension
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:AllergenCharacteristic","dfc-b:hasAllergenDimension":"dfc-m:Peanuts","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"}`;

test('AllergenCharacteristic:import', async () => {
    const imported = await connector.import(json);
    const importedAllergenCharacteristic = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedAllergenCharacteristic.equals(allergenCharacteristic)).toStrictEqual(true);
});

test('AllergenCharacteristic:export', async () => {
    const serialized = await connector.export([allergenCharacteristic]);
    expect(serialized).toStrictEqual(json);
});

test('AllergenCharacteristic:getSemanticId', async () => {
    expect(allergenCharacteristic.getSemanticId()).toStrictEqual(undefined);
});

test('AllergenCharacteristic:getQuantityValue', async () => {
    expect(allergenCharacteristic.getQuantityValue()).toStrictEqual(1);
});

test('AllergenCharacteristic:getQuantityUnit', async () => {
    expect(await allergenCharacteristic.getQuantityUnit()).toStrictEqual(kilogram);
});

test('AllergenCharacteristic:getQuantityDimension', async () => {
    expect(await allergenCharacteristic.getQuantityDimension()).toStrictEqual(allergenDimension);
});