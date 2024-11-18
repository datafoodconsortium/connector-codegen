import CustomerCategory from '../lib/CustomerCategory.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const customerCategory = new CustomerCategory({
    connector: connector,
    semanticId: "http://myplatform.com/customerCategory1",
    description: "description"
})

const json = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"http://myplatform.com/customerCategory1","@type":"dfc-b:CustomerCategory","dfc-b:description":"description"}`;

test('CustomerCategory:import', async () => {
    const imported = await connector.import(json);
    const importedCustomerCategory = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedCustomerCategory.equals(customerCategory)).toStrictEqual(true);
});

test('CustomerCategory:export', async () => {
    const serialized = await connector.export([customerCategory]);
    expect(serialized).toStrictEqual(json);
});

test('CustomerCategory:getSemanticId', async () => {
    expect(customerCategory.getSemanticId()).toStrictEqual("http://myplatform.com/customerCategory1");
});

test('CustomerCategory:getDescription', async () => {
    expect(customerCategory.getDescription()).toStrictEqual("description");
});

test('CustomerCategory:setDescription', async () => {
    customerCategory.setDescription("description2");
    expect(customerCategory.getDescription()).toStrictEqual("description2");
});