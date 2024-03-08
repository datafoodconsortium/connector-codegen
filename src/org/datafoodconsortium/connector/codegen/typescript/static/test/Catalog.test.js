import Catalog from '../lib/Catalog.js';
import CatalogItem from '../lib/CatalogItem.js';
import Enterprise from '../lib/Enterprise.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/catalog1","@type":"dfc-b:Catalog","dfc-b:lists":{"@id":"http://myplatform.com/catalogItem1"},"dfc-b:maintainedBy":{"@id":"http://myplatform.com/enterprise1"}}`;

const enterprise = new Enterprise({
    connector: connector,
    semanticId: "http://myplatform.com/enterprise1"
});

const enterprise2 = new Enterprise({
    connector: connector,
    semanticId: "http://myplatform.com/enterprise2"
});

const catalogItem = new CatalogItem({
    connector: connector,
    semanticId: "http://myplatform.com/catalogItem1"
});

const catalogItem2 = new CatalogItem({
    connector: connector,
    semanticId: "http://myplatform.com/catalogItem2"
});

const catalog = new Catalog({
    connector: connector,
    semanticId: "http://myplatform.com/catalog1",
    maintainers: [enterprise],
    items: [catalogItem]
});

test('Catalog:import', async () => {
    const imported = await connector.import(json);
    const importedCatalog = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedCatalog.equals(catalog)).toStrictEqual(true);
});

test('Catalog:export', async () => {
    const serialized = await connector.export([catalog]);
    expect(serialized).toStrictEqual(json);
});

test('Catalog:getSemanticId', async () => {
    expect(catalog.getSemanticId()).toStrictEqual("http://myplatform.com/catalog1");
});

test('Catalog:getMaintainers', async () => {
    const maintainers = await catalog.getMaintainers();
    expect(maintainers.length).toStrictEqual(1);
    expect(maintainers[0].equals(enterprise)).toStrictEqual(true);
});

test('Catalog:getItems', async () => {
    const items = await catalog.getItems();
    expect(items.length).toStrictEqual(1);
    expect(items[0].equals(catalogItem)).toStrictEqual(true);
});

test('Catalog:addMaintainer', async () => {
    catalog.addMaintainer(enterprise2);
    const maintainers = await catalog.getMaintainers();
    expect(maintainers.length).toStrictEqual(2);
    expect(maintainers[0].equals(enterprise)).toStrictEqual(true);
    expect(maintainers[1].equals(enterprise2)).toStrictEqual(true);
});

test('Catalog:addItem', async () => {
    catalog.addItem(catalogItem2);
    const items = await catalog.getItems();
    expect(items.length).toStrictEqual(2);
    expect(items[0].equals(catalogItem)).toStrictEqual(true);
    expect(items[1].equals(catalogItem2)).toStrictEqual(true);
});

test('Catalog:removeMaintainer', async () => {
    catalog.removeMaintainer(enterprise);
    const maintainers = await catalog.getMaintainers();
    expect(maintainers.length).toStrictEqual(1);
    expect(maintainers[0].equals(enterprise2)).toStrictEqual(true);
});

test('Catalog:removeItem', async () => {
    catalog.removeItem(catalogItem);
    const items = await catalog.getItems();
    expect(items.length).toStrictEqual(1);
    expect(items[0].equals(catalogItem2)).toStrictEqual(true);
});