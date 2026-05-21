import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const localizedProduct = connector.createLocalizedProduct({ semanticId: "http://myplatform.com/localizedProduct" });
const quantity = connector.createQuantity();
const physicalPlace = connector.createPhysicalPlace({ semanticId: "http://myplatform.com/physicalPlace" });

let theoreticalStock = connector.createTheoreticalStock({
    semanticId: "http://myplatform.com/theoreticalStock",
    localizedProduct,
    quantity,
    physicalPlace,
    availabilityDate: "availabilityDate",
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue"},{"@id":"http://myplatform.com/theoreticalStock","@type":"dfc-b:TheoreticalStock","dfc-b:availabilityDate":"availabilityDate","dfc-b:constitutes":"http://myplatform.com/localizedProduct","dfc-b:hasQuantity":"_:b1","dfc-b:localizedBy":"http://myplatform.com/physicalPlace"}]}`;

test('TheoreticalStock:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(theoreticalStock), true);
});

test('TheoreticalStock:export', async () => {
    const serialized = await connector.export([theoreticalStock]);
    expect.strictEqual(serialized, json);
});

test('TheoreticalStock:getSemanticId', () => {
    expect.strictEqual(theoreticalStock.getSemanticId(), "http://myplatform.com/theoreticalStock");
});

