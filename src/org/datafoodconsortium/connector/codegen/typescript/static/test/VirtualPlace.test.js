import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const saleSession = connector.createSaleSession({ semanticId: "http://myplatform.com/saleSession" });

let virtualPlace = connector.createVirtualPlace({
    semanticId: "http://myplatform.com/virtualPlace",
    name: "name",
    description: "description",
    hostedSaleSessions: [saleSession],
    urls: ["url"],
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/virtualPlace","@type":"dfc-b:VirtualPlace","dfc-b:URL":"url","dfc-b:description":"description","dfc-b:hosts":"http://myplatform.com/saleSession","dfc-b:name":"name"}`;

test('VirtualPlace:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(virtualPlace), true);
});

test('VirtualPlace:export', async () => {
    const serialized = await connector.export([virtualPlace]);
    expect.strictEqual(serialized, json);
});

test('VirtualPlace:getSemanticId', () => {
    expect.strictEqual(virtualPlace.getSemanticId(), "http://myplatform.com/virtualPlace");
});

test('VirtualPlace:getName', () => {
    expect.strictEqual(virtualPlace.getName(), "name");
});

test('VirtualPlace:getDescription', () => {
    expect.strictEqual(virtualPlace.getDescription(), "description");
});
