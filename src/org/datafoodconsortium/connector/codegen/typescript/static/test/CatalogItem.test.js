import expect from 'node:assert';
import { test } from 'node:test';
import CatalogItem from '../lib/CatalogItem.js';
import Catalog from '../lib/Catalog.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import Offer from '../lib/Offer.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/catalogItem1","@type":"dfc-b:CatalogItem","dfc-b:listedIn":{"@id":"http://myplatform.com/catalog1"},"dfc-b:offeredThrough":"http://myplatform.com/offer1","dfc-b:references":"http://myplatform.com/suppliedProduct1","dfc-b:sku":"sku","dfc-b:stockLimitation":"6.32"}`;

const suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct1"
});

const suppliedProduct2 = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct2"
});

const offer1 = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer1"
});

const offer2 = new Offer({
    connector: connector,
    semanticId: "http://myplatform.com/offer2"
});

const catalog = new Catalog({
    connector: connector,
    semanticId: "http://myplatform.com/catalog1"
});

const catalog2 = new Catalog({
    connector: connector,
    semanticId: "http://myplatform.com/catalog2"
});

const catalogItem = new CatalogItem({
    connector: connector,
    semanticId: "http://myplatform.com/catalogItem1",
    catalogs: [catalog],
    offers: [offer1],
    product: suppliedProduct,
    sku: "sku",
    stockLimitation: 6.32
});

test('CatalogItem:import', async () => {
    const imported = await connector.import(json);
    const importedCatalogItem = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedCatalogItem.equals(catalogItem), true);
});

test('CatalogItem:export', async () => {
    const serialized = await connector.export([catalogItem]);
    expect.strictEqual(serialized, json);
});

test('CatalogItem:getSemanticId', () => {
    expect.strictEqual(catalogItem.getSemanticId(), "http://myplatform.com/catalogItem1");
});

test('CatalogItem:getCatalogs', async () => {
    const catalogs = await catalogItem.getCatalogs();
    expect.strictEqual(catalogs.length, 1);
    expect.strictEqual(catalogs[0].equals(catalog), true);
});

test('CatalogItem:getOfferers', async () => {
    const offers = await catalogItem.getOfferers();
    expect.strictEqual(offers.length, 1);
    expect.strictEqual(offers[0].equals(offer1), true);
});

test('CatalogItem:getOfferedProduct', async () => {
    const offeredProduct = await catalogItem.getOfferedProduct();
    expect.strictEqual(offeredProduct.equals(suppliedProduct), true);
});

test('CatalogItem:getSku', () => {
    expect.strictEqual(catalogItem.getSku(), "sku");
});

test('CatalogItem:getStockLimitation', () => {
    expect.strictEqual(catalogItem.getStockLimitation(), 6.32);
});

test('CatalogItem:registerInCatalog', async () => {
    catalogItem.registerInCatalog(catalog2);
    const catalogs = await catalogItem.getCatalogs();
    expect.strictEqual(catalogs.length, 2);
    expect.strictEqual(catalogs[0].equals(catalog), true);
    expect.strictEqual(catalogs[1].equals(catalog2), true);
});

test('CatalogItem:setSku', () => {
    catalogItem.setSku("sku2");
    expect.strictEqual(catalogItem.getSku(), "sku2");
});

test('CatalogItem:setStockLimitation', () => {
    catalogItem.setStockLimitation(5);
    expect.strictEqual(catalogItem.getStockLimitation(), 5);
});

test('CatalogItem:setOfferedProduct', async () => {
    catalogItem.setOfferedProduct(suppliedProduct2);
    const offeredProduct = await catalogItem.getOfferedProduct();
    expect.strictEqual(offeredProduct.equals(suppliedProduct2), true);
});

test('CatalogItem:addOffer', async () => {
    catalogItem.addOffer(offer2);
    const offers = await catalogItem.getOfferers();
    expect.strictEqual(offers.length, 2);
    expect.strictEqual(offers[0].equals(offer1), true);
    expect.strictEqual(offers[1].equals(offer2), true);
});