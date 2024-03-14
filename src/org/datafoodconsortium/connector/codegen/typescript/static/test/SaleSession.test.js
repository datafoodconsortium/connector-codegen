import expect from 'node:assert';
import { test } from 'node:test';
import Offer from '../lib/Offer.js';
import SaleSession from '../lib/SaleSession.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const offer = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer1"
});

const offer2 = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer2"
});

const saleSession = new SaleSession({
    connector: connector,
    semanticId: "http://myplatform.com/saleSession1",
    beginDate: "beginDate",
    endDate: "endDate",
    quantity: 5,
    offers: [offer]
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/saleSession1","@type":"dfc-b:SaleSession","dfc-b:beginDate":"beginDate","dfc-b:endDate":"endDate","dfc-b:lists":{"@id":"http://myplatform.com/offer1"},"dfc-b:quantity":"5"}`;

test('SaleSession:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(saleSession), true);
});

test('SaleSession:export', async () => {
    const serialized = await connector.export([saleSession]);
    expect.strictEqual(serialized, json);
});

test('SaleSession:getSemanticId', () => {
    expect.strictEqual(saleSession.getSemanticId(), "http://myplatform.com/saleSession1");
});

test('SaleSession:getBeginDate', () => {
    expect.strictEqual(saleSession.getBeginDate(), "beginDate");
});

test('SaleSession:getEndDate', () => {
    expect.strictEqual(saleSession.getEndDate(), "endDate");
});

test('SaleSession:getQuantity', () => {
    expect.strictEqual(saleSession.getQuantity(), 5);
});

test('SaleSession:getOffers', async () => {
    const offers = await saleSession.getOffers();
    expect.strictEqual(offers.length, 1);
    expect.strictEqual(offers[0].equals(offer), true);
});

test('SaleSession:setBeginDate', () => {
    saleSession.setBeginDate("beginDate2");
    expect.strictEqual(saleSession.getBeginDate(), "beginDate2");
});

test('SaleSession:setEndDate', () => {
    saleSession.setEndDate("endDate2");
    expect.strictEqual(saleSession.getEndDate(), "endDate2");
});

test('SaleSession:setQuantity', () => {
    saleSession.setQuantity(2.3);
    expect.strictEqual(saleSession.getQuantity(), 2.3);
});

test('SaleSession:addOffer', async () => {
    saleSession.addOffer(offer2);
    const offers = await saleSession.getOffers();
    expect.strictEqual(offers.length, 2);
    expect.strictEqual(offers[0].equals(offer), true);
    expect.strictEqual(offers[1].equals(offer2), true);
});

/*
test('SaleSession:removeOffer', async () => {
    saleSession.removeOffer(offer);
    const offers = await saleSession.getOffers();
    expect.strictEqual(offers.length, 1);
    expect.strictEqual(offers[0].equals(offer2), true);
});*/