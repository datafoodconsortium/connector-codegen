import Offer from '../lib/Offer.js';
import Price from '../lib/Price.js';
import CustomerCategory from '../lib/CustomerCategory.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const customerCategory = new CustomerCategory({
    connector: connector,
    semanticId: "http://myplatform.com/customerCategory1"
});

const suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct1"
});

const price = new Price({
    connector: connector,
    value: 2.54,
    vatRate: 8.0,
    unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
});

const offer = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer1",
    offeredItem: suppliedProduct,
    offeredTo: customerCategory,
    price: price,
    stockLimitation: 4.21
});

const json = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@graph":[{"@id":"_:b1","@type":"dfc-b:Price","dfc-b:VATrate":"8","dfc-b:hasUnit":"dfc-m:Euro","dfc-b:value":"2.54"},{"@id":"http://myplatform.com/offer1","@type":"dfc-b:Offer","dfc-b:hasPrice":{"@id":"_:b1"},"dfc-b:offeredItem":{"@id":"http://myplatform.com/suppliedProduct1"},"dfc-b:offeredTo":{"@id":"http://myplatform.com/customerCategory1"},"dfc-b:stockLimitation":"4.21"}]}`;

test('Offer:import', async () => {
    const imported = await connector.import(json);
    const importedOffer = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedOffer.equals(offer)).toStrictEqual(true);
});

test('Offer:export', async () => {
    const serialized = await connector.export([offer]);
    expect(serialized).toStrictEqual(json);
});

test('Offer:getSemanticId', async () => {
    expect(offer.getSemanticId()).toStrictEqual("http://myplatform.com/offer1");
});

test('Offer:getOfferedItem', async () => {
    const expected = await offer.getOfferedItem();
    expect(expected.equals(suppliedProduct)).toStrictEqual(true);
});

test('Offer:getOfferedTo', async () => {
    const expected = await offer.getCustomerCategory();
    expect(expected.equals(customerCategory)).toStrictEqual(true);
});

test('Offer:getPrice', async () => {
    const expected = await offer.getPrice();
    expect(expected.equals(price)).toStrictEqual(true);
});

test('Offer:getStockLimitation', async () => {
    expect(offer.getStockLimitation()).toStrictEqual(4.21);
});

test('Offer:setOfferedItem', async () => {
    const expected = new SuppliedProduct({
        connector: connector,
        semanticId: "http://myplatform.com/suppliedProductSet"
    });

    offer.setOfferedItem(expected);
    
    const received = await offer.getOfferedItem();
    expect(received.equals(expected)).toStrictEqual(true);
});

test('Offer:setOfferedTo', async () => {
    const expected = new CustomerCategory({
        connector: connector,
        semanticId: "http://myplatform.com/customerCategory1"
    });

    offer.setCustomerCategory(expected);
    
    const received = await offer.getCustomerCategory();
    expect(received.equals(expected)).toStrictEqual(true);
});

test('Offer:setPrice', async () => {
    const expected = new Price({
        connector: connector,
        value: 3,
        vatRate: 19.0,
        unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
    });

    offer.setPrice(expected);
    
    const received = await offer.getPrice();
    expect(received.equals(expected)).toStrictEqual(true);
});

test('Offer:setStockLimitation', async () => {
    offer.setStockLimitation(5);
    expect(offer.getStockLimitation()).toStrictEqual(5);
});