import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
const facets = JSON.parse(fs.readFileSync('./test/thesaurus/facets.json'));
const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));
const productTypes = JSON.parse(fs.readFileSync('./test/thesaurus/productTypes.json'));

const connector = new Connector();

await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));
await connector.loadProductTypes(JSON.stringify(productTypes));

const quantity = connector.createQuantity();

const allergenCharacteristic = connector.createAllergenCharacteristic();
const allergenCharacteristic2 = connector.createAllergenCharacteristic();
const nutrientCharacteristic = connector.createNutrientCharacteristic();
const nutrientCharacteristic2 = connector.createNutrientCharacteristic();
const physicalCharacteristic = connector.createPhysicalCharacteristic();
const physicalCharacteristic2 = connector.createPhysicalCharacteristic();
const catalogItem = connector.createCatalogItem({ semanticId: "http://myplatform.com/catalogItem" });
const catalogItem2 = connector.createCatalogItem({ semanticId: "http://myplatform.com/catalogItem2" });

let technicalProduct = connector.createTechnicalProduct({
    semanticId: "http://myplatform.com/product",
    name: "name",
    description: "description",
    productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
    quantity: quantity,
    alcoholPercentage: 123, 
    lifetime: "lifetime", 
    claims: [connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS], 
    usageOrStorageConditions: "usageOrStorageConditions", 
    allergenCharacteristics: [allergenCharacteristic],
    nutrientCharacteristics: [nutrientCharacteristic],
    physicalCharacteristics: [physicalCharacteristic],
    geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE,
    catalogItems: [catalogItem], 
    certifications: [connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB, connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU],
    natureOrigin: [connector.FACETS.NATUREORIGIN.PLANTORIGIN],
    partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT],
    images: ["http://myplatform.com/image1", "http://myplatform.com/image2"],
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue"},{"@id":"_:b2","@type":"dfc-b:AllergenCharacteristic"},{"@id":"_:b4","@type":"dfc-b:NutrientCharacteristic"},{"@id":"_:b6","@type":"dfc-b:PhysicalCharacteristic"},{"@id":"http://myplatform.com/product","@type":"dfc-b:TechnicalProduct","dfc-b:alcoholPercentage":"123","dfc-b:description":"description","dfc-b:hasAllergenCharacteristic":"_:b2","dfc-b:hasCertification":["dfc-f:Organic-AB","dfc-f:Organic-EU"],"dfc-b:hasClaim":"dfc-f:NoAddedSugars","dfc-b:hasGeographicalOrigin":"dfc-f:CentreValLoire","dfc-b:hasNatureOrigin":"dfc-f:PlantOrigin","dfc-b:hasNutrientCharacteristic":"_:b4","dfc-b:hasPartOrigin":"dfc-f:Fruit","dfc-b:hasPhysicalCharacteristic":"_:b6","dfc-b:hasQuantity":"_:b1","dfc-b:hasType":"dfc-pt:round-tomato","dfc-b:image":["http://myplatform.com/image1","http://myplatform.com/image2"],"dfc-b:lifetime":"lifetime","dfc-b:name":"name","dfc-b:referencedBy":"http://myplatform.com/catalogItem","dfc-b:usageOrStorageCondition":"usageOrStorageConditions"}]}`;

test('TechnicalProduct:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(technicalProduct), true);
});

test('TechnicalProduct:export', async () => {
    const serialized = await connector.export([technicalProduct]);
    expect.strictEqual(serialized, json);
});

test('TechnicalProduct:getSemanticId', () => {
    expect.strictEqual(technicalProduct.getSemanticId(), "http://myplatform.com/product");
});

test('TechnicalProduct:getName', () => {
    expect.strictEqual(technicalProduct.getName(), "name");
});

test('TechnicalProduct:getDescription', () => {
    expect.strictEqual(technicalProduct.getDescription(), "description");
});

test('TechnicalProduct:getProductType', async () => {
    const expected = await technicalProduct.getProductType();
    expect.strictEqual(expected.equals(connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO), true);
});

test('TechnicalProduct:getQuantity', async () => {
    const expected = await technicalProduct.getQuantity();
    expect.strictEqual(expected.equals(quantity), true);
});

test('TechnicalProduct:getAlcoholPercentage', () => {
    expect.strictEqual(technicalProduct.getAlcoholPercentage(), 123);
});

test('TechnicalProduct:getLifetime', () => {
    expect.strictEqual(technicalProduct.getLifetime(), "lifetime");
});

test('TechnicalProduct:getClaims', async () => {
    const claims = await technicalProduct.getClaims();
    expect.strictEqual(claims.length, 1);
    expect.strictEqual(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS), true);
});

test('TechnicalProduct:getUsageOrStorageConditions', () => {
    expect.strictEqual(technicalProduct.getUsageOrStorageConditions(), "usageOrStorageConditions");
});

test('TechnicalProduct:getAllergenCharacteristics', async () => {
    const allergenCharacteristics = await technicalProduct.getAllergenCharacteristics();
    expect.strictEqual(allergenCharacteristics.length, 1);
    expect.strictEqual(allergenCharacteristics[0].equals(allergenCharacteristic), true);
});

test('TechnicalProduct:getNutrientCharacteristics', async () => {
    const nutrientCharacteristics = await technicalProduct.getNutrientCharacteristics();
    expect.strictEqual(nutrientCharacteristics.length, 1);
    expect.strictEqual(nutrientCharacteristics[0].equals(nutrientCharacteristic), true);
});

test('TechnicalProduct:getPhysicalCharacteristics', async () => {
    const physicalCharacteristics = await technicalProduct.getPhysicalCharacteristics();
    expect.strictEqual(physicalCharacteristics.length, 1);
    expect.strictEqual(physicalCharacteristics[0].equals(physicalCharacteristic), true);
});

test('TechnicalProduct:getGeographicalOrigin', async () => {
    const expected = await technicalProduct.getGeographicalOrigin();
    expect.strictEqual(expected.equals(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE), true);
});

test('TechnicalProduct:getCatalogItems', async () => {
    const catalogItems = await technicalProduct.getCatalogItems();
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem), true);
});

test('TechnicalProduct:getCertifications', async () => {
    const certifications = await technicalProduct.getCertifications();
    expect.strictEqual(certifications.length, 2);
    expect.strictEqual(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB), true);
    expect.strictEqual(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU), true);
});

test('TechnicalProduct:getNatureOrigin', async () => {
    const natureOrigins = await technicalProduct.getNatureOrigin();
    expect.strictEqual(natureOrigins.length, 1);
    expect.strictEqual(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.PLANTORIGIN), true);
});

test('TechnicalProduct:getPartOrigin', async () => {
    const partOrigins = await technicalProduct.getPartOrigin();
    expect.strictEqual(partOrigins.length, 1);
    expect.strictEqual(partOrigins[0].equals(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT), true);
});

test('TechnicalProduct:setDescription', () => {
    technicalProduct.setDescription("description2")
    expect.strictEqual(technicalProduct.getDescription(), "description2");
});

test('TechnicalProduct:setProductType', async () => {
    technicalProduct.setProductType(connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE);
    const expected = await technicalProduct.getProductType();
    expect.strictEqual(expected.equals(connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE), true);
});

test('TechnicalProduct:setQuantity', async () => {
    const quantity2 = connector.createQuantity();
    technicalProduct.setQuantity(quantity2);
    const expected = await technicalProduct.getQuantity();
    expect.strictEqual(expected.equals(quantity2), true);
});

test('TechnicalProduct:setAlcoholPercentage', () => {
    technicalProduct.setAlcoholPercentage(5.5);
    expect.strictEqual(technicalProduct.getAlcoholPercentage(), 5.5);
});

test('TechnicalProduct:setLifetime', () => {
    technicalProduct.setLifetime("lifetime2");
    expect.strictEqual(technicalProduct.getLifetime(), "lifetime2");
});

test('TechnicalProduct:addClaim', async () => {
    technicalProduct.addClaim(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE);
    const claims = await technicalProduct.getClaims();
    expect.strictEqual(claims.length, 2);
    expect.strictEqual(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS), true);
    expect.strictEqual(claims[1].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE), true);
});

/*
test('TechnicalProduct:removeClaim', async () => {
    suppliedProduct.removeClaim(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS);
    const claims = await suppliedProduct.getClaims();
    expect.strictEqual(claims.length, 1);
    expect.strictEqual(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE), true);
});*/

test('TechnicalProduct:setUsageOrStorageConditions', () => {
    technicalProduct.setUsageOrStorageConditions("free text 2");
    expect.strictEqual(technicalProduct.getUsageOrStorageConditions(), "free text 2");
});

test('TechnicalProduct:addAllergenCharacteristics', async () => {
    technicalProduct.addAllergenCharacteristic(allergenCharacteristic2);
    const allergenCharacteristics = await technicalProduct.getAllergenCharacteristics();
    expect.strictEqual(allergenCharacteristics.length, 2);
    expect.strictEqual(allergenCharacteristics[0].equals(allergenCharacteristic), true);
    expect.strictEqual(allergenCharacteristics[1].equals(allergenCharacteristic2), true);
});

/*
test('TechnicalProduct:removeAllergenCharacteristics', async () => {
    suppliedProduct.removeAllergenCharacteristic(allergenCharacteristic);
    const allergenCharacteristics = await suppliedProduct.getAllergenCharacteristics();
    expect.strictEqual(allergenCharacteristics.length, 1);
    expect.strictEqual(allergenCharacteristics[0].equals(allergenCharacteristic2), true);
});*/

test('TechnicalProduct:addNutrientCharacteristics', async () => {
    technicalProduct.addNutrientCharacteristic(nutrientCharacteristic2);
    const nutrientCharacteristics = await technicalProduct.getNutrientCharacteristics();
    expect.strictEqual(nutrientCharacteristics.length, 2);
    expect.strictEqual(nutrientCharacteristics[0].equals(nutrientCharacteristic), true);
    expect.strictEqual(nutrientCharacteristics[1].equals(nutrientCharacteristic2), true);
});

/*
test('TechnicalProduct:removeNutrientCharacteristics', async () => {
    suppliedProduct.removeNutrientCharacteristic(nutrientCharacteristic);
    const nutrientCharacteristics = await suppliedProduct.getNutrientCharacteristics();
    expect.strictEqual(nutrientCharacteristics.length, 1);
    expect.strictEqual(nutrientCharacteristics[0].equals(nutrientCharacteristic2), true);
});*/

test('TechnicalProduct:getPhysicalCharacteristics', async () => {
    technicalProduct.addPhysicalCharacteristic(physicalCharacteristic2);
    const physicalCharacteristics = await technicalProduct.getPhysicalCharacteristics();
    expect.strictEqual(physicalCharacteristics.length, 2);
    expect.strictEqual(physicalCharacteristics[0].equals(physicalCharacteristic), true);
    expect.strictEqual(physicalCharacteristics[1].equals(physicalCharacteristic2), true);
});

/*
test('TechnicalProduct:removePhysicalCharacteristics', async () => {
    suppliedProduct.removePhysicalCharacteristic(physicalCharacteristic);
    const physicalCharacteristics = await suppliedProduct.getPhysicalCharacteristics();
    expect.strictEqual(physicalCharacteristics.length, 1);
    expect.strictEqual(physicalCharacteristics[0].equals(physicalCharacteristic2), true);
});*/

test('TechnicalProduct:setGeographicalOrigin', async () => {
    technicalProduct.setGeographicalOrigin(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY);
    const expected = await technicalProduct.getGeographicalOrigin();
    expect.strictEqual(expected.equals(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY), true);
});

test('TechnicalProduct:addCatalogItem', async () => {
    technicalProduct.addCatalogItem(catalogItem2);
    const catalogItems = await technicalProduct.getCatalogItems()
    expect.strictEqual(catalogItems.length, 2);
    expect.strictEqual(catalogItems[0].equals(catalogItem), true);
    expect.strictEqual(catalogItems[1].equals(catalogItem2), true);
});

/*
test('TechnicalProduct:removeCatalogItem', async () => {
    suppliedProduct.removeCatalogItem(catalogItem);
    const catalogItems = await suppliedProduct.getCatalogItems()
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem2), true);
});*/

test('TechnicalProduct:addCertification', async () => {
    technicalProduct.addCertification(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES);
    const certifications = await technicalProduct.getCertifications();
    expect.strictEqual(certifications.length, 3);
    expect.strictEqual(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB), true);
    expect.strictEqual(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU), true);
    expect.strictEqual(certifications[2].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES), true);
});

/*
test('TechnicalProduct:removeCertification', async () => {
    suppliedProduct.removeCertification(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU);
    const certifications = await suppliedProduct.getCertifications();
    expect.strictEqual(certifications.length, 2);
    expect.strictEqual(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB), true);
    expect.strictEqual(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES), true);
});*/

test('TechnicalProduct:addNatureOrigin', async () => {
    technicalProduct.addNatureOrigin(connector.FACETS.NATUREORIGIN.ALGAE);
    const natureOrigins = await technicalProduct.getNatureOrigin();
    expect.strictEqual(natureOrigins.length, 2);
    expect.strictEqual(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.PLANTORIGIN), true);
    expect.strictEqual(natureOrigins[1].equals(connector.FACETS.NATUREORIGIN.ALGAE), true);
});

/*
test('TechnicalProduct:removeNatureOrigin', async () => {
    suppliedProduct.removeNatureOrigin(connector.FACETS.NATUREORIGIN.PLANTORIGIN);
    const natureOrigins = await suppliedProduct.getNatureOrigin();
    expect.strictEqual(natureOrigins.length, 1);
    expect.strictEqual(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.ALGAE), true);
});*/

test('TechnicalProduct:addPartOrigin', async () => {
    technicalProduct.addPartOrigin(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW)
    const partOrigins = await technicalProduct.getPartOrigin();
    expect.strictEqual(partOrigins.length, 2);
    expect.strictEqual(partOrigins[0].equals(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT), true);
    expect.strictEqual(partOrigins[1].equals(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW), true);
});

/*
test('TechnicalProduct:removePartOrigin', async () => {
    suppliedProduct.removePartOrigin(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT)
    const partOrigins = await suppliedProduct.getPartOrigin();
    expect.strictEqual(partOrigins.length, 1);
    expect.strictEqual(partOrigins[0].equals(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW), true);
});*/

test('TechnicalProduct:getImages', () => {
    expect.strictEqual(technicalProduct.getImages().length, 2);
    expect.strictEqual(technicalProduct.getImages().every(e => ["http://myplatform.com/image1", "http://myplatform.com/image2"].includes(e)), true);
});

test('TechnicalProduct:addImage', () => {
    technicalProduct.addImage("http://myplatform.com/image3");
    expect.strictEqual(technicalProduct.getImages().length, 3);
    expect.strictEqual(technicalProduct.getImages().every(e => ["http://myplatform.com/image1", "http://myplatform.com/image2", "http://myplatform.com/image3"].includes(e)), true);
});