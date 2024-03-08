import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';
import Connector from "../lib/Connector.js";
import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;
const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
const physicalDimension = connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT;
const physicalDimension2 = connector.MEASURES.DIMENSION.PHYSICALDIMENSION.HEIGHT;

const physicalCharacteristic = new PhysicalCharacteristic({ 
    connector: connector, 
    value: 100, 
    unit: kilogram, 
    physicalDimension: physicalDimension
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"_:b1","@type":"dfc-b:PhysicalCharacteristic","dfc-b:hasPhysicalDimension":"dfc-m:Weight","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"100"}`;

test('PhysicalCharacteristic:import', async () => {
    const imported = await connector.import(json);
    const importedPhysicalCharacteristic = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedPhysicalCharacteristic.equals(physicalCharacteristic)).toStrictEqual(true);
});

test('PhysicalCharacteristic:export', async () => {
    const serialized = await connector.export([physicalCharacteristic]);
    expect(serialized).toStrictEqual(json);
});

test('PhysicalCharacteristic:getSemanticId', async () => {
    expect(physicalCharacteristic.getSemanticId()).toStrictEqual(undefined);
});

test('PhysicalCharacteristic:getQuantityValue', async () => {
    expect(physicalCharacteristic.getQuantityValue()).toStrictEqual(100);
});

test('PhysicalCharacteristic:getQuantityUnit', async () => {
    expect(await physicalCharacteristic.getQuantityUnit()).toStrictEqual(kilogram);
});

test('PhysicalCharacteristic:getQuantityDimension', async () => {
    expect(await physicalCharacteristic.getQuantityDimension()).toStrictEqual(physicalDimension);
});

test('PhysicalCharacteristic:setQuantityValue', async () => {
    physicalCharacteristic.setQuantityValue(6.35);
    expect(physicalCharacteristic.getQuantityValue()).toStrictEqual(6.35);
});

test('PhysicalCharacteristic:setQuantityUnit', async () => {
    physicalCharacteristic.setQuantityUnit(gram);
    expect(await physicalCharacteristic.getQuantityUnit()).toStrictEqual(gram);
});

test('PhysicalCharacteristic:setQuantityDimension', async () => {
    physicalCharacteristic.setQuantityDimension(physicalDimension2);
    expect(await physicalCharacteristic.getQuantityDimension()).toStrictEqual(physicalDimension2);
});