import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const customer = connector.createPerson({
    semanticId: "http://myplatform.com/person1",
});

const customer2 = connector.createPerson({
    semanticId: "http://myplatform.com/person12",
});

const saleSession = connector.createSaleSession({
    semanticId: "http://myplatform.com/saleSession1"
});

const saleSession2 = connector.createSaleSession({
    semanticId: "http://myplatform.com/saleSession2"
});

const orderLine = connector.createOrderLine({
    semanticId: "http://myplatform.com/orderLine1"
});

const orderLine2 = connector.createOrderLine({
    semanticId: "http://myplatform.com/orderLine2"
});

const order = connector.createOrder({
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
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedOrder.equals(order), true);
});

test('Order:export', async () => {
    const serialized = await connector.export([order]);
    expect.strictEqual(serialized, json);
});

test('Order:getSemanticId', () => {
    expect.strictEqual(order.getSemanticId(), "http://myplatform.com/order1");
});

test('Order:getNumber', () => {
    expect.strictEqual(order.getNumber(), "0001");
});

test('Order:getDate', () => {
    expect.strictEqual(order.getDate(), "date");
});

test('Order:getSaleSession', async () => {
    const expected = await order.getSaleSession();
    expect.strictEqual(expected.equals(saleSession), true);
});

test('Order:getLines', async () => {
    const expected = await order.getLines();
    expect.strictEqual(expected.length, 1);
    expect.strictEqual(expected[0].equals(orderLine), true);
});

test('Order:getClient', async () => {
    const expected = await order.getClient();
    expect.strictEqual(expected.equals(customer), true);
});

test('Order:setNumber', () => {
    order.setNumber("0002");
    expect.strictEqual(order.getNumber(), "0002");
});

test('Order:setDate', () => {
    order.setDate("date2");
    expect.strictEqual(order.getDate(), "date2");
});

test('Order:setSaleSession', async () => {
    order.setSaleSession(saleSession2);
    const expected = await order.getSaleSession();
    expect.strictEqual(expected.equals(saleSession2), true);
});

test('Order:setClient', async () => {
    order.setClient(customer2);
    const expected = await order.getClient();
    expect.strictEqual(expected.equals(customer2), true);
});

test('Order:addLine', async () => {
    order.addLine(orderLine2);
    const expected = await order.getLines();
    expect.strictEqual(expected.length, 2);
    expect.strictEqual(expected[0].equals(orderLine), true);
    expect.strictEqual(expected[1].equals(orderLine2), true);
});

/*
test('Order:removeLine', async () => {
    order.removeLine(orderLine);
    const expected = await order.getLines();
    expect(expected.length).strictEqual();
    expect.strictEqual(expected[0].equals(orderLine2), true);
});*/