import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const price = connector.createPrice();

let paymentMethod = connector.createPaymentMethod({
    semanticId: "http://myplatform.com/paymentMethod",
    name: "name",
    description: "description",
    price,
    provider: "provider",
    type: "type"
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:Price"},{"@id":"http://myplatform.com/paymentMethod","@type":"dfc-b:PaymentMethod","dfc-b:description":"description","dfc-b:hasPrice":"_:b1","dfc-b:name":"name","dfc-b:paymentMethodProvider":"provider","dfc-b:paymentMethodType":"type"}]}`;

test('PaymentMethod:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(paymentMethod), true);
});

test('PaymentMethod:export', async () => {
    const serialized = await connector.export([paymentMethod]);
    expect.strictEqual(serialized, json);
});

test('PaymentMethod:getSemanticId', () => {
    expect.strictEqual(paymentMethod.getSemanticId(), "http://myplatform.com/paymentMethod");
});

test('PaymentMethod:getName', () => {
    expect.strictEqual(paymentMethod.getName(), "name");
});

test('PaymentMethod:getDescription', () => {
    expect.strictEqual(paymentMethod.getDescription(), "description");
});
