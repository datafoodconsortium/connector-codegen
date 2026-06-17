import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/pickUpStep","@type":"dfc-b:PickUpStep","dfc-b:arrivalDate":"arrivalDate","dfc-b:description":"description","dfc-b:duration":"duration","dfc-b:isStepOf":"http://myplatform.com/route","dfc-b:name":"name"}`;

const route = connector.createRoute({ semanticId: "http://myplatform.com/route" });

const pickUpStep = connector.createPickUpStep({
    semanticId: "http://myplatform.com/pickUpStep",
    name: "name",
    description: "description",
    routes: [route],
    deliveredShipments: [],
    pickedUpShipments: [],
    duration: "duration",
    arrivalDate: "arrivalDate",
});

test('PickUpStep:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(pickUpStep), true);
});

test('PickUpStep:export', async () => {
    const serialized = await connector.export([pickUpStep]);
    expect.strictEqual(serialized, json);
});