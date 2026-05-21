import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
const vocabulary = JSON.parse(fs.readFileSync('./test/thesaurus/vocabulary.json'));

const connector = new Connector();
await connector.loadVocabulary(JSON.stringify(vocabulary));

const inputProduct = connector.createLocalizedProduct({ semanticId: "http://myplatform.com/inputProduct" });
const outputProduct = connector.createLocalizedProduct({ semanticId: "http://myplatform.com/outputProduct" });
const inputQuantity = connector.createQuantity();
const outputQuantity = connector.createQuantity();

const consumptionFlow = connector.createPlannedLocalConsumptionFlow({
    semanticId: "http://myplatform.com/consumptionFlow",
    quantity: inputQuantity,
    product: inputProduct
})

const productionFlow = connector.createPlannedLocalProductionFlow({
    semanticId: "http://myplatform.com/productionFlow",
    quantity: outputQuantity,
    product: outputProduct
})

const transformation = connector.createPlannedLocalTransformation({
    semanticId: "http://myplatform.com/transformation",
    transformationType: connector.VOCABULARY.TRANSFORMATIONTYPE.MODIFY,
    cost: 123,
    startDate: "startDate",
    endDate: "endDate",
    consumptionFlows: [consumptionFlow],
    productionFlows: [productionFlow]
});

const json = '{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue"},{"@id":"_:b2","@type":"dfc-b:QuantitativeValue"},{"@id":"http://myplatform.com/consumptionFlow","@type":"dfc-b:AsPlannedLocalConsumptionFlow","dfc-b:consumes":"http://myplatform.com/inputProduct","dfc-b:hasQuantity":"_:b1"},{"@id":"http://myplatform.com/productionFlow","@type":"dfc-b:AsPlannedLocalProductionFlow","dfc-b:hasQuantity":"_:b2","dfc-b:produces":"http://myplatform.com/outputProduct"},{"@id":"http://myplatform.com/transformation","@type":"dfc-b:AsPlannedLocalTransformation","dfc-b:cost":"123","dfc-b:endDate":"endDate","dfc-b:hasInput":"http://myplatform.com/consumptionFlow","dfc-b:hasOutput":"http://myplatform.com/productionFlow","dfc-b:hasTransformationType":"dfc-v:modify","dfc-b:startDate":"startDate"}]}';

test('PlannedLocalTransformation:import', async () => {
    const imported = await connector.import(json);
    const expectedConsumptionFlow = imported[0];
    const expectedProductionFlow = imported[1];
    const expectedTransformation = imported[2];
    expect.strictEqual(imported.length, 3);
    expect.strictEqual(expectedTransformation.equals(transformation), true);
    expect.strictEqual(expectedConsumptionFlow.equals(consumptionFlow), true);
    expect.strictEqual(expectedProductionFlow.equals(productionFlow), true);
});

test('PlannedLocalTransformation:export', async () => {
    const serialized = await connector.export([transformation, consumptionFlow, productionFlow]);
    expect.strictEqual(serialized, json);
});