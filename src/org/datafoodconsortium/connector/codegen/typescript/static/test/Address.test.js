import expect from 'node:assert';
import { test } from 'node:test';
import Address from '../lib/Address.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const address = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address/address1",
    street: "1, place or Europe",
    postalCode: "00001",
    city: "Brussels",
    country: "Belgium",
});

const json = '{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/address/address1","@type":"dfc-b:Address","dfc-b:hasCity":"Brussels","dfc-b:hasCountry":"Belgium","dfc-b:hasPostalCode":"00001","dfc-b:hasStreet":"1, place or Europe"}';

test('Address:import', async () => {
    const imported = await connector.import(json);
    const expected = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(expected.equals(address), true);
});

test('Address:export', async () => {
    const serialized = await connector.export([address]);
    expect.strictEqual(serialized, json);
});

test('Address:getSemanticId', () => {
    expect.strictEqual(address.getSemanticId(), "http://myplatform.com/address/address1");
});

test('Address:getStreet', () => {
    expect.strictEqual(address.getStreet(), "1, place or Europe");
});

test('Address:getPostalCode', () => {
    expect.strictEqual(address.getPostalCode(), "00001");
});

test('Address:getCity', () => {
    expect.strictEqual(address.getCity(), "Brussels");
});

test('Address:getCountry', () => {
    expect.strictEqual(address.getCountry(), "Belgium");
});

test('Address:setStreet', () => {
    address.setStreet("21, place or Europe");
    expect.strictEqual(address.getStreet(), "21, place or Europe");
});

test('Address:setPostalCode', () => {
    address.setPostalCode("00002");
    expect.strictEqual(address.getPostalCode(), "00002");
});

test('Address:setCity', () => {
    address.setCity("Paris");
    expect.strictEqual(address.getCity(), "Paris");
});

test('Address:setCountry', () => {
    address.setCountry("France");
    expect.strictEqual(address.getCountry(), "France");
});
