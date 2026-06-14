import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const quantity = connector.createQuantity({});
const order = connector.createOrder({ semanticId: "http://myplatform.com/order" });
const saleSession = connector.createSaleSession({ semanticId: "http://myplatform.com/saleSession" });
const deliveredPlace = connector.createPhysicalPlace({ semanticId: "http://myplatform.com/physicalPlace" });

const deliveryOption = connector.createDeliveryOption({
    semanticId: "http://myplatform.com/deliveryOption",
    name: "name",
    description: "description",
    fee: 123,
    quantity,
    order,
    saleSession,
    deliveredPlace,
    deliveryConstraint: "deliveryConstraint",
    accessibilityInformation: "accessibilityInformation",
    beginDate: new Date(2026, 5, 18).toDateString(),
    endDate: new Date(2026, 5, 19).toDateString(),
});

const json = '{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue"},{"@id":"http://myplatform.com/deliveryOption","@type":"dfc-b:DeliveryOption","dfc-b:accessibilityInfo":"accessibilityInformation","dfc-b:deliveredAt":"http://myplatform.com/physicalPlace","dfc-b:deliveryConstraint":"deliveryConstraint","dfc-b:description":"description","dfc-b:endDate":"Fri Jun 19 2026","dfc-b:fee":"123","dfc-b:hasQuantity":"_:b1","dfc-b:name":"name","dfc-b:optionOf":"http://myplatform.com/saleSession","dfc-b:selectedBy":"http://myplatform.com/order","dfc-b:startDate":"Thu Jun 18 2026"}]}';

test('DeliveryOption:import', async () => {
    const imported = await connector.import(json);
    const expected = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(expected.equals(deliveryOption), true);
});

test('DeliveryOption:export', async () => {
    const serialized = await connector.export([deliveryOption]);
    expect.strictEqual(serialized, json);
});

test('DeliveryOption:getSemanticId', () => {
    expect.strictEqual(deliveryOption.getSemanticId(), "http://myplatform.com/deliveryOption");
});

test('DeliveryOption:getName', () => {
    expect.strictEqual(deliveryOption.getName(), "name");
});

test('DeliveryOption:getDescription', () => {
    expect.strictEqual(deliveryOption.getDescription(), "description");
});

test('DeliveryOption:getFee', () => {
    expect.strictEqual(deliveryOption.getFee(), 123);
});

test('DeliveryOption:getQuantity', () => {
    expect.strictEqual(deliveryOption.getQuantity(), quantity);
});

test('DeliveryOption:getOrder', async () => {
    expect.strictEqual(await deliveryOption.getOrder(), order);
});

test('DeliveryOption:getSaleSession', async () => {
    expect.strictEqual(await deliveryOption.getSaleSession(), saleSession);
});

test('DeliveryOption:getDeliveredPlace', async () => {
    expect.strictEqual(await deliveryOption.getDeliveredPlace(), deliveredPlace);
});

test('DeliveryOption:getDeliveryConstraint', () => {
    expect.strictEqual(deliveryOption.getDeliveryConstraint(), "deliveryConstraint");
});

test('DeliveryOption:getAccessibilityInformation', () => {
    expect.strictEqual(deliveryOption.getAccessibilityInformation(), "accessibilityInformation");
});

test('DeliveryOption:getBeginDate', () => {
    expect.strictEqual(deliveryOption.getBeginDate(), "Thu Jun 18 2026");
});

test('DeliveryOption:getEndDate', () => {
    expect.strictEqual(deliveryOption.getEndDate(), "Fri Jun 19 2026");
});

test('DeliveryOption:setName', () => {
    deliveryOption.setName("name2");
    expect.strictEqual(deliveryOption.getName(), "name2");
});

test('DeliveryOption:setDescription', () => {
    deliveryOption.setDescription("description2");
    expect.strictEqual(deliveryOption.getDescription(), "description2");
});

test('DeliveryOption:setFee', () => {
    deliveryOption.setFee(345);
    expect.strictEqual(deliveryOption.getFee(), 345);
});

test('DeliveryOption:setQuantity', () => {
    const quantity2 = connector.createQuantity({});
    deliveryOption.setQuantity(quantity2);
    expect.strictEqual(deliveryOption.getQuantity(), quantity2);
});

test('DeliveryOption:setOrder', async () => {
    const order2 = connector.createOrder({
        semanticId: "http://myplatform.com/order2"
    });
    deliveryOption.setOrder(order2);
    expect.strictEqual(await deliveryOption.getOrder(), order2);
});

test('DeliveryOption:setSaleSession', async () => {
    const saleSession2 = connector.createSaleSession({
        semanticId: "http://myplatform.com/saleSession2"
    });
    deliveryOption.setSaleSession(saleSession2);
    expect.strictEqual(await deliveryOption.getSaleSession(), saleSession2);
});

test('DeliveryOption:setDeliveredPlace', async () => {
    const deliveredPlace2 = connector.createPhysicalPlace({
        semanticId: "http://myplatform.com/physicalPlace2"
    });
    deliveryOption.setDeliveredPlace(deliveredPlace2);
    expect.strictEqual(await deliveryOption.getDeliveredPlace(), deliveredPlace2);
});

test('DeliveryOption:setDeliveryConstraint', () => {
    deliveryOption.setDeliveryConstraint("deliveryConstraint2")
    expect.strictEqual(deliveryOption.getDeliveryConstraint(), "deliveryConstraint2");
});

test('DeliveryOption:setAccessibilityInformation', () => {
    deliveryOption.setAccessibilityInformation("accessibilityInformation2");
    expect.strictEqual(deliveryOption.getAccessibilityInformation(), "accessibilityInformation2");
});

test('DeliveryOption:setBeginDate', () => {
    deliveryOption.setBeginDate(new Date(2026, 5, 20).toDateString());
    expect.strictEqual(deliveryOption.getBeginDate(), "Sat Jun 20 2026");
});

test('DeliveryOption:setEndDate', () => {
    deliveryOption.setEndDate(new Date(2026, 5, 21).toDateString());
    expect.strictEqual(deliveryOption.getEndDate(), "Sun Jun 21 2026");
});