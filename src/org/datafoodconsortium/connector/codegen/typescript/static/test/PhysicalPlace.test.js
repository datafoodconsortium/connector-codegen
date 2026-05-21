import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const saleSession = connector.createSaleSession({ semanticId: "http://myplatform.com/saleSession" });
const phoneNumber = connector.createPhoneNumber({ semanticId: "http://myplatform.com/phoneNumber" });
const address = connector.createAddress({ semanticId: "http://myplatform.com/address" });
const mainContact = connector.createPerson({ semanticId: "http://myplatform.com/mainContact" });
const theoreticalStock = connector.createTheoreticalStock({ semanticId: "http://myplatform.com/theoreticalStock" });
const realStock = connector.createRealStock({ semanticId: "http://myplatform.com/realStock" });

let physicalPlace = connector.createPhysicalPlace({
    semanticId: "http://myplatform.com/physicalPlace",
    name: "name",
    description: "description",
    hostedSaleSessions: [saleSession],
    phoneNumbers: [phoneNumber],
    // openingHours: [],
    address,
    mainContacts: [mainContact],
    theoreticalStocks: [theoreticalStock],
    realStocks: [realStock],
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@id":"http://myplatform.com/physicalPlace","@type":"dfc-b:PhysicalPlace","dfc-b:description":"description","dfc-b:hasAddress":"http://myplatform.com/address","dfc-b:hasMainContact":"http://myplatform.com/mainContact","dfc-b:hasPhoneNumber":"http://myplatform.com/phoneNumber","dfc-b:hosts":"http://myplatform.com/saleSession","dfc-b:localizes":"http://myplatform.com/theoreticalStock","dfc-b:name":"name","dfc-b:stores":"http://myplatform.com/realStock"}`;

test('PhysicalPlace:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(physicalPlace), true);
});

test('PhysicalPlace:export', async () => {
    const serialized = await connector.export([physicalPlace]);
    expect.strictEqual(serialized, json);
});

test('PhysicalPlace:getSemanticId', () => {
    expect.strictEqual(physicalPlace.getSemanticId(), "http://myplatform.com/physicalPlace");
});

test('PhysicalPlace:getName', () => {
    expect.strictEqual(physicalPlace.getName(), "name");
});

test('PhysicalPlace:getDescription', () => {
    expect.strictEqual(physicalPlace.getDescription(), "description");
});
