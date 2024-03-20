import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import PlannedConsumptionFlow from '../lib/PlannedConsumptionFlow.js';
import PlannedProductionFlow from '../lib/PlannedProductionFlow.js';
import PlannedTransformation from '../lib/PlannedTransformation.js';
import Connector from "../lib/Connector.js";
const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));
const vocabulary = JSON.parse(fs.readFileSync('./test/thesaurus/vocabulary.json'));

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));
await connector.loadVocabulary(JSON.stringify(vocabulary));

const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

const inputSuppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/inputProduct",
    description: "Awesome product"
});

const outputSuppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/outputProduct",
    description: "Modified product"
});

const inputQuantity = new QuantitativeValue({ 
    connector: connector, 
    value: 1.2, 
    unit: kilogram
});

const outputQuantity = new QuantitativeValue({ 
    connector: connector, 
    value: 1.0, 
    unit: kilogram
});

const plannedConsumptionFlow = new PlannedConsumptionFlow({
    connector: connector,
    semanticId: "http://myplatform.com/plannedConsumptionFlow",
    quantity: inputQuantity,
    product: inputSuppliedProduct
})

const plannedProductionFlow = new PlannedProductionFlow({
    connector: connector,
    semanticId: "http://myplatform.com/plannedProductionFlow",
    quantity: outputQuantity,
    product: outputSuppliedProduct
})

const plannedTransformation = new PlannedTransformation({
    connector: connector,
    semanticId: "http://myplatform.com/transformation",
    transformationType: connector.VOCABULARY.TRANSFORMATIONTYPE.MODIFY,
    consumptionFlows: [plannedConsumptionFlow],
    productionFlows: [plannedProductionFlow]
});

const json = '{"@context":"https://www.datafoodconsortium.org","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1.2"},{"@id":"_:b2","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"},{"@id":"http://myplatform.com/plannedConsumptionFlow","@type":"dfc-b:AsPlannedConsumptionFlow","dfc-b:consumes":"http://myplatform.com/inputProduct","dfc-b:hasQuantity":"_:b1"},{"@id":"http://myplatform.com/plannedProductionFlow","@type":"dfc-b:AsPlannedProductionFlow","dfc-b:hasQuantity":"_:b2","dfc-b:produces":"http://myplatform.com/outputProduct"},{"@id":"http://myplatform.com/transformation","@type":"dfc-b:AsPlannedTransformation","dfc-b:hasIncome":"http://myplatform.com/plannedConsumptionFlow","dfc-b:hasOutcome":"http://myplatform.com/plannedProductionFlow","dfc-b:hasTransformationType":"dfc-v:modify"}]}';

test('PlannedTransformationLoop:import', async () => {
    const imported = await connector.import(json);
    const expectedPlannedConsumptionFlow = imported[0];
    const expectedPlannedProductionFlow = imported[1];
    const expectedPlannedTransformation = imported[2];
    expect.strictEqual(imported.length, 3);
    expect.strictEqual(expectedPlannedTransformation.equals(plannedTransformation), true);
    expect.strictEqual(expectedPlannedConsumptionFlow.equals(plannedConsumptionFlow), true);
    expect.strictEqual(expectedPlannedProductionFlow.equals(plannedProductionFlow), true);
});

test('PlannedTransformationLoop:export', async () => {
    const serialized = await connector.export([plannedTransformation, plannedConsumptionFlow, plannedProductionFlow]);
    expect.strictEqual(serialized, json);
});