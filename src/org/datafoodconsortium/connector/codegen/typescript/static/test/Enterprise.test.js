import expect from 'node:assert';
import { test } from 'node:test';
import Enterprise from '../lib/Enterprise.js';
import Address from '../lib/Address.js';
import CustomerCategory from '../lib/CustomerCategory.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import Catalog from '../lib/Catalog.js';
import CatalogItem from '../lib/CatalogItem.js';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const address = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address1",
    city: "Briouze"
});

const address2 = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address2",
});

const customerCategory = new CustomerCategory({
    connector: connector,
    semanticId: "http://myplatform.com/customerCategory1"
});

const customerCategory2 = new CustomerCategory({
    connector: connector,
    semanticId: "http://myplatform.com/customerCategory2"
});

const suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct1"
});

const suppliedProduct2 = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/suppliedProduct2"
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
    semanticId: "http://myplatform.com/catalogItem1"
});

const catalogItem2 = new CatalogItem({
    connector: connector,
    semanticId: "http://myplatform.com/catalogItem2"
});

const enterprise = new Enterprise({
    connector: connector,
    semanticId: "http://myplatform.com/enterprise1",
    description: "description",
    localizations: [address],
    vatNumber: "vatNumber",
    customerCategories: [customerCategory],
    suppliedProducts: [suppliedProduct],
    //technicalProducts: [],
    catalogs: [catalog],
    catalogItems: [catalogItem]
});

const json = `{"@context":"https://www.datafoodconsortium.org","@id":"http://myplatform.com/enterprise1","@type":"dfc-b:Enterprise","dfc-b:VATnumber":"vatNumber","dfc-b:defines":"http://myplatform.com/customerCategory1","dfc-b:hasAddress":{"@id":"http://myplatform.com/address1"},"dfc-b:hasDescription":"description","dfc-b:maintains":{"@id":"http://myplatform.com/catalog1"},"dfc-b:manages":"http://myplatform.com/catalogItem1","dfc-b:supplies":"http://myplatform.com/suppliedProduct1"}`;

test('Enterprise:import', async () => {
    const imported = await connector.import(json);
    const importedEnterprise = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedEnterprise.equals(enterprise), true);
});

test('Enterprise:export', async () => {
    const serialized = await connector.export([enterprise]);
    expect.strictEqual(serialized, json);
});

test('Enterprise:getSemanticId', () => {
    expect.strictEqual(enterprise.getSemanticId(), "http://myplatform.com/enterprise1");
});

test('Enterprise:getDescription', () => {
    expect.strictEqual(enterprise.getDescription(), "description");
});

test('Enterprise:getLocalizations', async () => {
    const localizations = await enterprise.getLocalizations();
    expect.strictEqual(localizations.length, 1);
    expect.strictEqual(localizations[0].equals(address), true);
});

test('Enterprise:getVatNumber', () => {
    expect.strictEqual(enterprise.getVatNumber(), "vatNumber");
});

test('Enterprise:getCustomerCategories', async () => {
    const customerCategories = await enterprise.getCustomerCategories();
    expect.strictEqual(customerCategories.length, 1);
    expect.strictEqual(customerCategories[0].equals(customerCategory), true);
});

test('Enterprise:getSuppliedProducts', async () => {
    const suppliedProducts = await enterprise.getSuppliedProducts();
    expect.strictEqual(suppliedProducts.length, 1);
    expect.strictEqual(suppliedProducts[0].equals(suppliedProduct), true);
});

test('Enterprise:getMaintainedCatalogs', async () => {
    const catalogs = await enterprise.getMaintainedCatalogs();
    expect.strictEqual(catalogs.length, 1);
    expect.strictEqual(catalogs[0].equals(catalog), true);
});

test('Enterprise:getManagedCatalogItems', async () => {
    const catalogItems = await enterprise.getManagedCatalogItems();
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem), true);
});

test('Enterprise:setDescription', () => {
    enterprise.setDescription("description2");
    expect.strictEqual(enterprise.getDescription(), "description2");
});

test('Enterprise:addLocalization', async () => {
    enterprise.addLocalization(address2);
    const localizations = await enterprise.getLocalizations();
    expect.strictEqual(localizations.length, 2);
    expect.strictEqual(localizations[1].equals(address2), true);
});

test('Enterprise:setVatNumber', () => {
    expect.strictEqual(enterprise.getVatNumber(), "vatNumber");
});

test('Enterprise:addCustomerCategory', async () => {
    enterprise.addCustomerCategory(customerCategory2);
    const customerCategories = await enterprise.getCustomerCategories();
    expect.strictEqual(customerCategories.length, 2);
    expect.strictEqual(customerCategories[1].equals(customerCategory2), true);
});

test('Enterprise:supplyProduct', async () => {
    enterprise.supplyProduct(suppliedProduct2);
    const suppliedProducts = await enterprise.getSuppliedProducts();
    expect.strictEqual(suppliedProducts.length, 2);
    expect.strictEqual(suppliedProducts[0].equals(suppliedProduct), true);
    expect.strictEqual(suppliedProducts[1].equals(suppliedProduct2), true);
});

test('Enterprise:unsupplyProduct', async () => {
    enterprise.unsupplyProduct(suppliedProduct);
    const suppliedProducts = await enterprise.getSuppliedProducts();
    expect.strictEqual(suppliedProducts.length, 1);
    expect.strictEqual(suppliedProducts[0].equals(suppliedProduct2), true);
});

test('Enterprise:maintainCatalog', async () => {
    enterprise.maintainCatalog(catalog2);
    const catalogs = await enterprise.getMaintainedCatalogs();
    expect.strictEqual(catalogs.length, 2);
    expect.strictEqual(catalogs[0].equals(catalog), true);
    expect.strictEqual(catalogs[1].equals(catalog2), true);
});

test('Enterprise:unmaintainCatalog', async () => {
    enterprise.unmaintainCatalog(catalog);
    const catalogs = await enterprise.getMaintainedCatalogs();
    expect(catalogs.length).strictEqual();
    expect.strictEqual(catalogs[0].equals(catalog2), true);
});

test('Enterprise:manageCatalogItem', async () => {
    enterprise.manageCatalogItem(catalogItem2);
    const catalogItems = await enterprise.getManagedCatalogItems();
    expect.strictEqual(catalogItems.length, 2);
    expect.strictEqual(catalogItems[1].equals(catalogItem2), true);
});

test('Enterprise:unmanageCatalogItem', async () => {
    enterprise.unmanageCatalogItem(catalogItem);
    const catalogItems = await enterprise.getManagedCatalogItems();
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem2), true);
});