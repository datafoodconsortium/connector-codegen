import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
import { assertSemanticEqual, TestObserver } from './utils.js';

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/catalog1","@type":"dfc-b:Catalog","dfc-b:lists":{"@id":"http://myplatform.com/catalogItem1"},"dfc-b:maintainedBy":{"@id":"http://myplatform.com/enterprise1"}}`;

const enterprise = connector.createEnterprise({
    semanticId: "http://myplatform.com/enterprise1"
});

const enterprise2 = connector.createEnterprise({
    semanticId: "http://myplatform.com/enterprise2"
});

const catalogItem = connector.createCatalogItem({
    semanticId: "http://myplatform.com/catalogItem1"
});

const catalogItem2 = connector.createCatalogItem({
    semanticId: "http://myplatform.com/catalogItem2"
});

const catalog = connector.createCatalog({
    semanticId: "http://myplatform.com/catalog1",
    maintainers: [enterprise],
    items: [catalogItem]
});

test('Catalog:import', async () => {
    const testObs = new TestObserver(catalog, assertSemanticEqual);
    const testSub = connector.subscribe('import', testObs);
    const imported = await connector.import(json);
    const importedCatalog = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedCatalog.equals(catalog), true);
    expect.doesNotThrow(() => {
        testObs.complete();
        testSub.unsubscribe();
    }, '#unsubscribe');
});

test('Catalog:export', async () => {
    const serialized = await connector.export([catalog]);
    expect.strictEqual(serialized, json);
});

test('Catalog:getSemanticId', () => {
    expect.strictEqual(catalog.getSemanticId(), "http://myplatform.com/catalog1");
});

test('Catalog:getMaintainers', async () => {
    const maintainers = await catalog.getMaintainers();
    expect.strictEqual(maintainers.length, 1);
    expect.strictEqual(maintainers[0].equals(enterprise), true);
});

test('Catalog:getItems', async () => {
    const items = await catalog.getItems();
    expect.strictEqual(items.length, 1);
    expect.strictEqual(items[0].equals(catalogItem), true);
});

test('Catalog:addMaintainer', async () => {
    catalog.addMaintainer(enterprise2);
    const maintainers = await catalog.getMaintainers();
    expect.strictEqual(maintainers.length, 2);
    expect.strictEqual(maintainers[0].equals(enterprise), true);
    expect.strictEqual(maintainers[1].equals(enterprise2), true);
});

test('Catalog:addItem', async () => {
    catalog.addItem(catalogItem2);
    const items = await catalog.getItems();
    expect.strictEqual(items.length, 2);
    expect.strictEqual(items[0].equals(catalogItem), true);
    expect.strictEqual(items[1].equals(catalogItem2), true);
});

/*
test('Catalog:removeMaintainer', async () => {
    catalog.removeMaintainer(enterprise);
    const maintainers = await catalog.getMaintainers();
    expect.strictEqual(maintainers.length, 1);
    expect.strictEqual(maintainers[0].equals(enterprise2), true);
});

test('Catalog:removeItem', async () => {
    catalog.removeItem(catalogItem);
    const items = await catalog.getItems();
    expect.strictEqual(items.length, 1);
    expect.strictEqual(items[0].equals(catalogItem2), true);
});*/