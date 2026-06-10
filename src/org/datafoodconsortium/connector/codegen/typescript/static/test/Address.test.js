import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
import SKOSConcept from "../lib/SKOSConcept.js";

const connector = new Connector();

const france = new SKOSConcept({ connector, semanticId: "http://publications.europa.eu/resource/authority/country/FRA" });

const address = connector.createAddress({
    semanticId: "http://myplatform.com/address/address1",
    street: "1, place or Europe",
    postalCode: "00001",
    city: "Brussels",
    country: france,
    latitude: 0.123,
    longitude: 3.456,
    region: "region"
});

const json = '{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@id":"http://myplatform.com/address/address1","@type":"dfc-b:Address","dfc-b:hasCity":"Brussels","dfc-b:hasCountry":"http://publications.europa.eu/resource/authority/country/FRA","dfc-b:hasPostalCode":"00001","dfc-b:hasStreet":"1, place or Europe","dfc-b:latitude":"0.123","dfc-b:longitude":"3.456","dfc-b:region":"region"}';

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

test('Address:getCountry', async () => {
    expect.strictEqual(await address.getCountry(), france);
});

test('Address:getLatitude', () => {
    expect.strictEqual(address.getLatitude(), 0.123);
});

test('Address:getLongitude', () => {
    expect.strictEqual(address.getLongitude(), 3.456);
});

test('Address:getRegion', () => {
    expect.strictEqual(address.getRegion(), "region");
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

test('Address:setCountry', async () => {
    address.setCountry(france);
    expect.strictEqual(await address.getCountry(), france);
});

test('Address:setLatitude', () => {
    address.setLatitude(1.234);
    expect.strictEqual(address.getLatitude(), 1.234);
});

test('Address:setLongitude', () => {
    address.setLongitude(2.345);
    expect.strictEqual(address.getLongitude(), 2.345);
});

test('Address:setRegion', () => {
    address.setRegion("region2");
    expect.strictEqual(address.getRegion(), "region2");
});
