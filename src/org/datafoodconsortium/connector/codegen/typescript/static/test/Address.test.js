import Address from '../lib/Address.js';
import Connector from "../lib/Connector.js";
//import ConnectorImporterJsonldStream from "../lib/ConnectorImporterJsonldStream.js";
//import context from "../lib/context.js";

const connector = new Connector();

const address = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address/address1",
    street: "1, place or Europe",
    postalCode: "00001",
    city: "Brussels",
    country: "Belgium",
});

const data = '{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"http://myplatform.com/address/address1","@type":"dfc-b:Address","dfc-b:hasCity":"Brussels","dfc-b:hasCountry":"Belgium","dfc-b:hasPostalCode":"00001","dfc-b:hasStreet":"1, place or Europe"}';

test('Address:import', async () => {
    const imported = await connector.import(data);
    const expected = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(expected.equals(address)).toStrictEqual(true);
});

test('Address:export', async () => {   
    const serialized = await connector.export([address]);
    expect(serialized).toStrictEqual(data);
});

test('Address:getSemanticId', async () => {
    expect(address.getSemanticId()).toStrictEqual("http://myplatform.com/address/address1");
});

test('Address:getStreet', async () => {
    expect(address.getStreet()).toStrictEqual("1, place or Europe");
});

test('Address:getPostalCode', async () => {
    expect(address.getPostalCode()).toStrictEqual("00001");
});

test('Address:getCity', async () => {
    expect(address.getCity()).toStrictEqual("Brussels");
});

test('Address:getCountry', async () => {
    expect(address.getCountry()).toStrictEqual("Belgium");
});

test('Address:setStreet', async () => {
    address.setStreet("21, place or Europe");
    expect(address.getStreet()).toStrictEqual("21, place or Europe");
});

test('Address:setPostalCode', async () => {
    address.setPostalCode("00002");
    expect(address.getPostalCode()).toStrictEqual("00002");
});

test('Address:setCity', async () => {
    address.setCity("Paris");
    expect(address.getCity()).toStrictEqual("Paris");
});

test('Address:setCountry', async () => {
    address.setCountry("France");
    expect(address.getCountry()).toStrictEqual("France");
});