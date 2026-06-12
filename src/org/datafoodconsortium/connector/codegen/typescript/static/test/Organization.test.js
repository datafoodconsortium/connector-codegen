import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const address = connector.createAddress({
    semanticId: "http://myplatform.com/address1",
    city: "Briouze"
});

const address2 = connector.createAddress({
    semanticId: "http://myplatform.com/address2",
});

const customerCategory = connector.createCustomerCategory({
    semanticId: "http://myplatform.com/customerCategory1"
});

const customerCategory2 = connector.createCustomerCategory({
    semanticId: "http://myplatform.com/customerCategory2"
});

const suppliedProduct = connector.createSuppliedProduct({
    semanticId: "http://myplatform.com/suppliedProduct1"
});

const technicalProduct = connector.createTechnicalProduct({
    semanticId: "http://myplatform.com/technicalProduct"
});

const technicalProduct2 = connector.createTechnicalProduct({
    semanticId: "http://myplatform.com/technicalProduct2"
});

const mainContact = connector.createPerson({
    semanticId: "http://myplatform.com/mainContact"
});

const mainContact2 = connector.createPerson({
    semanticId: "http://myplatform.com/mainContact2"
});

const suppliedProduct2 = connector.createSuppliedProduct({
    semanticId: "http://myplatform.com/suppliedProduct2"
});

const catalog = connector.createCatalog({
    semanticId: "http://myplatform.com/catalog1"
});

const catalog2 = connector.createCatalog({
    semanticId: "http://myplatform.com/catalog2"
});

const catalogItem = connector.createCatalogItem({
    semanticId: "http://myplatform.com/catalogItem1"
});

const catalogItem2 = connector.createCatalogItem({
    semanticId: "http://myplatform.com/catalogItem2"
});

const organization = connector.createOrganization({
    semanticId: "http://myplatform.com/organization1",
    name: "name",
    description: "description",
    localizations: [address],
    vatNumber: "vatNumber",
    customerCategories: [customerCategory],
    catalogs: [catalog],
    catalogItems: [catalogItem],
    suppliedProducts: [suppliedProduct],
    technicalProducts: [technicalProduct],
    mainContact,
    logo: "logo"
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/organization1","@type":"dfc-b:Organization","dfc-b:VATnumber":"vatNumber","dfc-b:defines":"http://myplatform.com/customerCategory1","dfc-b:hasAddress":"http://myplatform.com/address1","dfc-b:hasDescription":"description","dfc-b:hasMainContact":"http://myplatform.com/mainContact","dfc-b:logo":"logo","dfc-b:maintains":"http://myplatform.com/catalog1","dfc-b:manages":"http://myplatform.com/catalogItem1","dfc-b:name":"name","dfc-b:proposes":"http://myplatform.com/technicalProduct","dfc-b:supplies":"http://myplatform.com/suppliedProduct1"}`;

test('Organization:import', async () => {
    const imported = await connector.import(json);
    const importedOrganization = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedOrganization.equals(organization), true);
});

test('Organization:export', async () => {
    const serialized = await connector.export([organization]);
    expect.strictEqual(serialized, json);
});

test('Organization:getSemanticId', () => {
    expect.strictEqual(organization.getSemanticId(), "http://myplatform.com/organization1");
});

test('Organization:getName', () => {
    expect.strictEqual(organization.getName(), "name");
});

test('Organization:getDescription', () => {
    expect.strictEqual(organization.getDescription(), "description");
});

test('Organization:getLocalizations', async () => {
    const localizations = await organization.getLocalizations();
    expect.strictEqual(localizations.length, 1);
    expect.strictEqual(localizations[0].equals(address), true);
});

test('Organization:getVatNumber', () => {
    expect.strictEqual(organization.getVatNumber(), "vatNumber");
});

test('Organization:getCustomerCategories', async () => {
    const customerCategories = await organization.getCustomerCategories();
    expect.strictEqual(customerCategories.length, 1);
    expect.strictEqual(customerCategories[0].equals(customerCategory), true);
});

test('Organization:getSuppliedProducts', async () => {
    const suppliedProducts = await organization.getSuppliedProducts();
    expect.strictEqual(suppliedProducts.length, 1);
    expect.strictEqual(suppliedProducts[0].equals(suppliedProduct), true);
});

test('Organization:getProposedTechnicalProducts', async () => {
    const technicalProducts = await organization.getProposedTechnicalProducts();
    expect.strictEqual(technicalProducts.length, 1);
    expect.strictEqual(technicalProducts[0].equals(technicalProduct), true);
});

test('Organization:getMainContact', async () => {
    expect.strictEqual(await organization.getMainContact(), mainContact);
});

test('Organization:getDescription', () => {
    expect.strictEqual(organization.getLogo(), "logo");
});

test('Organization:getMaintainedCatalogs', async () => {
    const catalogs = await organization.getMaintainedCatalogs();
    expect.strictEqual(catalogs.length, 1);
    expect.strictEqual(catalogs[0].equals(catalog), true);
});

test('Organization:getManagedCatalogItems', async () => {
    const catalogItems = await organization.getManagedCatalogItems();
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem), true);
});

test('Organization:setName', () => {
    organization.setName("name2");
    expect.strictEqual(organization.getName(), "name2");
});

test('Organization:setDescription', () => {
    organization.setDescription("description2");
    expect.strictEqual(organization.getDescription(), "description2");
});

test('Organization:addLocalization', async () => {
    organization.addLocalization(address2);
    const localizations = await organization.getLocalizations();
    expect.strictEqual(localizations.length, 2);
    expect.strictEqual(localizations[1].equals(address2), true);
});

test('Organization:setVatNumber', () => {
    organization.setVatNumber("vatNumber2")
    expect.strictEqual(organization.getVatNumber(), "vatNumber2");
});

test('Organization:addCustomerCategory', async () => {
    organization.addCustomerCategory(customerCategory2);
    const customerCategories = await organization.getCustomerCategories();
    expect.strictEqual(customerCategories.length, 2);
    expect.strictEqual(customerCategories[1].equals(customerCategory2), true);
});

test('Organization:supplyProduct', async () => {
    organization.supplyProduct(suppliedProduct2);
    const suppliedProducts = await organization.getSuppliedProducts();
    expect.strictEqual(suppliedProducts.length, 2);
    expect.strictEqual(suppliedProducts[0].equals(suppliedProduct), true);
    expect.strictEqual(suppliedProducts[1].equals(suppliedProduct2), true);
});

test('Organization:proposeTechnicalProducts', async () => {
    organization.proposeTechnicalProducts(technicalProduct2);
    const technicalProducts = await organization.getProposedTechnicalProducts();
    expect.strictEqual(technicalProducts.length, 2);
    expect.strictEqual(technicalProducts[0].equals(technicalProduct), true);
    expect.strictEqual(technicalProducts[1].equals(technicalProduct2), true);
});

test('Organization:setMainContact', async () => {
    organization.setMainContact(mainContact2)
    expect.strictEqual(await organization.getMainContact(), mainContact2);
});

test('Organization:setLogo', () => {
    organization.setLogo("logo2");
    expect.strictEqual(organization.getLogo(), "logo2");
});

/*
test('Organization:unsupplyProduct', async () => {
    enterprise.unsupplyProduct(suppliedProduct);
    const suppliedProducts = await enterprise.getSuppliedProducts();
    expect.strictEqual(suppliedProducts.length, 1);
    expect.strictEqual(suppliedProducts[0].equals(suppliedProduct2), true);
});*/

test('Organization:maintainCatalog', async () => {
    organization.maintainCatalog(catalog2);
    const catalogs = await organization.getMaintainedCatalogs();
    expect.strictEqual(catalogs.length, 2);
    expect.strictEqual(catalogs[0].equals(catalog), true);
    expect.strictEqual(catalogs[1].equals(catalog2), true);
});

/*
test('Organization:unmaintainCatalog', async () => {
    enterprise.unmaintainCatalog(catalog);
    const catalogs = await enterprise.getMaintainedCatalogs();
    expect(catalogs.length).strictEqual();
    expect.strictEqual(catalogs[0].equals(catalog2), true);
});*/

test('Organization:manageCatalogItem', async () => {
    organization.manageCatalogItem(catalogItem2);
    const catalogItems = await organization.getManagedCatalogItems();
    expect.strictEqual(catalogItems.length, 2);
    expect.strictEqual(catalogItems[1].equals(catalogItem2), true);
});

/*
test('Organization:unmanageCatalogItem', async () => {
    enterprise.unmanageCatalogItem(catalogItem);
    const catalogItems = await enterprise.getManagedCatalogItems();
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem2), true);
});*/