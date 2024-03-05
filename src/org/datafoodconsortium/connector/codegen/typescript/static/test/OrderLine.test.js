import Offer from '../lib/Offer.js';
import Order from '../lib/Order.js';
import Price from '../lib/Price.js';
import OrderLine from '../lib/OrderLine.js';
import Connector from "../lib/Connector.js";
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };

const connector = new Connector();
await connector.loadMeasures(JSON.stringify(measures));

const offer = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer1"
});

const order = new Order({
    connector: connector,
    semanticId: "http://myplatform.com/order1"
});

const price = new Price({
    connector: connector,
    value: 5.42,
    vatRate: 19.9,
    unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
});

const orderLine = new OrderLine({
    connector: connector,
    semanticId: "http://myplatform.com/orderLine1",
    order: order,
    offer: offer,
    price: price,
    quantity: 2
});

const json = `{"@context":"https://www.datafoodconsortium.org","@graph":[{"@id":"_:b1","@type":"dfc-b:Price","dfc-b:VATrate":"19.9","dfc-b:hasUnit":"dfc-m:Euro","dfc-b:value":"5.42"},{"@id":"http://myplatform.com/orderLine1","@type":"dfc-b:OrderLine","dfc-b:concerns":{"@id":"http://myplatform.com/offer1"},"dfc-b:hasPrice":{"@id":"_:b1"},"dfc-b:partOf":{"@id":"http://myplatform.com/order1"},"dfc-b:quantity":"2"}]}`;

test('OrderLine:import', async () => {
    const imported = await connector.import(json);
    const importedOrderLine = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedOrderLine.equals(orderLine)).toStrictEqual(true);
});

test('OrderLine:export', async () => {
    const serialized = await connector.export([orderLine]);
    expect(serialized).toStrictEqual(json);
});

test('OrderLine:getSemanticId', async () => {
    expect(orderLine.getSemanticId()).toStrictEqual("http://myplatform.com/orderLine1");
});

test('OrderLine:getOrder', async () => {
    const expected = await orderLine.getOrder();
    expect(expected.equals(order)).toStrictEqual(true);
});

test('OrderLine:getOffer', async () => {
    const expected = await orderLine.getOffer();
    expect(expected.equals(offer)).toStrictEqual(true);
});

test('OrderLine:getPrice', async () => {
    const expected = await orderLine.getPrice();
    expect(expected.equals(price)).toStrictEqual(true);
});

test('OrderLine:getQuantity', async () => {
    expect(orderLine.getQuantity()).toStrictEqual(2);
});

test('OrderLine:setOrder', async () => {
    const order2 = new Order({
        connector: connector,
        semanticId: "http://myplatform.com/order2"
    });
    orderLine.setOrder(order2);
    const expected = await orderLine.getOrder();
    expect(expected.equals(order2)).toStrictEqual(true);
});

test('OrderLine:setOffer', async () => {
    const offer2 = new Offer({
        connector: connector,
        semanticId: "http://myplatform.com/offer2"
    });
    orderLine.setOffer(offer2);
    const expected = await orderLine.getOffer();
    expect(expected.equals(offer2)).toStrictEqual(true);
});

test('OrderLine:setPrice', async () => {
    const price2 = new Price({
        connector: connector,
        value: 2.8,
        vatRate: 7,
        unit: connector.MEASURES.UNIT.CURRENCYUNIT.EURO
    });
    orderLine.setPrice(price2);
    const expected = await orderLine.getPrice();
    expect(expected.equals(price2)).toStrictEqual(true);
});

test('OrderLine:setQuantity', async () => {
    orderLine.setQuantity(3.3);
    expect(orderLine.getQuantity()).toStrictEqual(3.3);
});