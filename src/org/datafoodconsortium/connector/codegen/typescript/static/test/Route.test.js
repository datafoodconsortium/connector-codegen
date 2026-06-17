import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/route","@type":"dfc-b:Route","dfc-b:description":"description","dfc-b:hasStep":"http://myplatform.com/pickUpStep","dfc-b:name":"name"}`;

const step = connector.createPickUpStep({ semanticId: "http://myplatform.com/pickUpStep" })

const route = connector.createRoute({
    semanticId: "http://myplatform.com/route",
    name: "name",
    description: "description",
    steps: [step],
    features: [],
});

test('Route:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(route), true);
});

test('Route:export', async () => {
    const serialized = await connector.export([route]);
    expect.strictEqual(serialized, json);
});