import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/catalog1","@type":"dfc-b:Catalog","dfc-b:lists":"http://myplatform.com/catalogItem1","dfc-b:maintainedBy":"http://myplatform.com/organization1"}`;

const organization = connector.createOrganization({
    semanticId: "http://myplatform.com/organization1"
});

const organization2 = connector.createOrganization({
    semanticId: "http://myplatform.com/organization2"
});

const catalogItem = connector.createCatalogItem({
    semanticId: "http://myplatform.com/catalogItem1"
});

const catalogItem2 = connector.createCatalogItem({
    semanticId: "http://myplatform.com/catalogItem2"
});

const catalog = connector.createCatalog({
    semanticId: "http://myplatform.com/catalog1",
    maintainers: [organization],
    items: [catalogItem]
});

test('Catalog:import', async () => {
    const imported = await connector.import(json);
    const importedCatalog = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedCatalog.equals(catalog), true);
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
    expect.strictEqual(maintainers[0].equals(organization), true);
});

test('Catalog:getItems', async () => {
    const items = await catalog.getItems();
    expect.strictEqual(items.length, 1);
    expect.strictEqual(items[0].equals(catalogItem), true);
});

test('Catalog:addMaintainer', async () => {
    catalog.addMaintainer(organization2);
    const maintainers = await catalog.getMaintainers();
    expect.strictEqual(maintainers.length, 2);
    expect.strictEqual(maintainers[0].equals(organization), true);
    expect.strictEqual(maintainers[1].equals(organization2), true);
});

test('Catalog:addItem', async () => {
    catalog.addItem(catalogItem2);
    const items = await catalog.getItems();
    expect.strictEqual(items.length, 2);
    expect.strictEqual(items[0].equals(catalogItem), true);
    expect.strictEqual(items[1].equals(catalogItem2), true);
});

test('Catalog:setItems', async () => {
    const catalogItem3 = connector.createCatalogItem({
        semanticId: "http://myplatform.com/catalogItem3"
    });
    expect.strictEqual((await catalog.getItems()).length, 2);
    catalog.setItems([catalogItem3]);
    const items = await catalog.getItems();
    expect.strictEqual(items.length, 1);
    expect.strictEqual(items[0].equals(catalogItem3), true);
});

/*
test('Catalog:removeMaintainer', async () => {
    catalog.removeMaintainer(enterprise);
    const maintainers = await catalog.getMaintainers();
    expect.strictEqual(maintainers.length, 1);
    expect.strictEqual(maintainers[0].equals(organization2), true);
});

test('Catalog:removeItem', async () => {
    catalog.removeItem(catalogItem);
    const items = await catalog.getItems();
    expect.strictEqual(items.length, 1);
    expect.strictEqual(items[0].equals(catalogItem2), true);
});*/