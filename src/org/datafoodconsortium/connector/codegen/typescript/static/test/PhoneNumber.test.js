import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

let phoneNumber = connector.createPhoneNumber({
    semanticId: "http://myplatform.com/phoneNumber",
    countryCode: 33,
    phoneNumber: "0123456789"
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/phoneNumber","@type":"dfc-b:PhoneNumber","dfc-b:countryCode":"33","dfc-b:phoneNumber":"0123456789"}`;

test('PhoneNumber:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(phoneNumber), true);
});

test('PhoneNumber:export', async () => {
    const serialized = await connector.export([phoneNumber]);
    expect.strictEqual(serialized, json);
});

test('PhoneNumber:getSemanticId', () => {
    expect.strictEqual(phoneNumber.getSemanticId(), "http://myplatform.com/phoneNumber");
});

test('PhoneNumber:getCountryCode', () => {
    expect.strictEqual(phoneNumber.getCountryCode(), 33);
});

test('PhoneNumber:getNumber', () => {
    expect.strictEqual(phoneNumber.getNumber(), "0123456789");
});
