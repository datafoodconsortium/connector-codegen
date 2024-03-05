import Order from '../lib/Order.js';
import OrderLine from '../lib/OrderLine.js';
import Person from '../lib/Person.js';
import SaleSession from '../lib/SaleSession.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const customer = new Person({
    connector: connector,
    semanticId: "http://myplatform.com/person1",
});

const customer2 = new Person({
    connector: connector,
    semanticId: "http://myplatform.com/person12",
});

const saleSession = new SaleSession({
    connector: connector,
    semanticId: "http://myplatform.com/saleSession1"
});

const saleSession2 = new SaleSession({
    connector: connector,
    semanticId: "http://myplatform.com/saleSession2"
});

const orderLine = new OrderLine({
    connector: connector,
    semanticId: "http://myplatform.com/orderLine1"
});

const orderLine2 = new OrderLine({
    connector: connector,
    semanticId: "http://myplatform.com/orderLine2"
});

const order = new Order({
    connector: connector,
    semanticId: "http://myplatform.com/order1",
    number: "0001",
    date: "date",
    saleSession: saleSession,
    client: customer,
    lines: [orderLine]
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/order1","@type":"dfc-b:Order","dfc-b:belongsTo":{"@id":"http://myplatform.com/saleSession1"},"dfc-b:date":"date","dfc-b:hasPart":{"@id":"http://myplatform.com/orderLine1"},"dfc-b:orderNumber":"0001","dfc-b:orderedBy":{"@id":"http://myplatform.com/person1"}}`;

test('Order:import', async () => {
    const imported = await connector.import(json);
    const importedOrder = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedOrder.equals(order)).toStrictEqual(true);
});

test('Order:export', async () => {
    const serialized = await connector.export([order]);
    expect(serialized).toStrictEqual(json);
});

test('Order:getSemanticId', async () => {
    expect(order.getSemanticId()).toStrictEqual("http://myplatform.com/order1");
});

test('Order:getNumber', async () => {
    expect(order.getNumber()).toStrictEqual("0001");
});

test('Order:getDate', async () => {
    expect(order.getDate()).toStrictEqual("date");
});

test('Order:getSaleSession', async () => {
    const expected = await order.getSaleSession();
    expect(expected.equals(saleSession)).toStrictEqual(true);
});

test('Order:getLines', async () => {
    const expected = await order.getLines();
    expect(expected.length).toStrictEqual(1);
    expect(expected[0].equals(orderLine)).toStrictEqual(true);
});

test('Order:getClient', async () => {
    const expected = await order.getClient();
    expect(expected.equals(customer)).toStrictEqual(true);
});

test('Order:setNumber', async () => {
    order.setNumber("0002");
    expect(order.getNumber()).toStrictEqual("0002");
});

test('Order:setDate', async () => {
    order.setDate("date2");
    expect(order.getDate()).toStrictEqual("date2");
});

test('Order:setSaleSession', async () => {
    order.setSaleSession(saleSession2);
    const expected = await order.getSaleSession();
    expect(expected.equals(saleSession2)).toStrictEqual(true);
});

test('Order:setClient', async () => {
    order.setClient(customer2);
    const expected = await order.getClient();
    expect(expected.equals(customer2)).toStrictEqual(true);
});

test('Order:addLine', async () => {
    order.addLine(orderLine2);
    const expected = await order.getLines();
    expect(expected.length).toStrictEqual(2);
    expect(expected[0].equals(orderLine)).toStrictEqual(true);
    expect(expected[1].equals(orderLine2)).toStrictEqual(true);
});

test('Order:removeLine', async () => {
    order.removeLine(orderLine);
    const expected = await order.getLines();
    expect(expected.length).toStrictEqual();
    expect(expected[0].equals(orderLine2)).toStrictEqual(true);
});