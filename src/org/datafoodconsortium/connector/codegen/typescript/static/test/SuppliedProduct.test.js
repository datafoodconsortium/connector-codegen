import * as fs from 'fs';
import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
import { assertSemanticEqual, TestObserver } from './utils.js';

const facets = JSON.parse(fs.readFileSync('./test/thesaurus/facets.json'));
const measures = JSON.parse(fs.readFileSync('./test/thesaurus/measures.json'));
const productTypes = JSON.parse(fs.readFileSync('./test/thesaurus/productTypes.json'));

const connector = new Connector();

await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));
await connector.loadProductTypes(JSON.stringify(productTypes));

const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

const quantity = connector.createQuantity({ 
    value: 1.2, 
    unit: kilogram
});

const allergenCharacteristic = connector.createAllergenCharacteristic({ 
    value: 1, 
    unit: kilogram, 
    allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS 
});

const allergenCharacteristic2 = connector.createAllergenCharacteristic({ 
    value: 3.5, 
    unit: gram, 
    allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.EGGS 
});

const nutrientCharacteristic = connector.createNutrientCharacteristic({ 
    value: 10, 
    unit: gram, 
    nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM 
});

const nutrientCharacteristic2 = connector.createNutrientCharacteristic({ 
    value: 8, 
    unit: kilogram, 
    nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.FIBRE 
});

const physicalCharacteristic = connector.createPhysicalCharacteristic({ 
    value: 100, 
    unit: gram, 
    physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT 
});

const physicalCharacteristic2 = connector.createPhysicalCharacteristic({ 
    value: 32.5, 
    unit: kilogram, 
    physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.HEIGHT 
});

const catalogItem = connector.createCatalogItem({ 
    semanticId: "http://myplatform.com/catalogItem" 
});

const catalogItem2 = connector.createCatalogItem({ 
    semanticId: "http://myplatform.com/catalogItem2" 
});

let suppliedProduct = connector.createSuppliedProduct({
    semanticId: "http://myplatform.com/tomato",
    description: "Awesome tomato",
    images: ["http://myplatform.com/image1", "http://myplatform.com/image2"],
    productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
    quantity: quantity,
    totalTheoreticalStock: 2.23,
    alcoholPercentage: 0, 
    lifetime: "a week", 
    claims: [connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS], 
    usageOrStorageConditions: "free text", 
    allergenCharacteristics: [allergenCharacteristic],
    nutrientCharacteristics: [nutrientCharacteristic],
    physicalCharacteristics: [physicalCharacteristic],
    geographicalOrigin: connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE,
    catalogItems: [catalogItem], 
    certifications: [connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB, connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU],
    natureOrigin: [connector.FACETS.NATUREORIGIN.PLANTORIGIN],
    partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT]
});

const json = `{"@context":"https://www.datafoodconsortium.org","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1.2"},{"@id":"_:b2","@type":"dfc-b:AllergenCharacteristic","dfc-b:hasAllergenDimension":"dfc-m:Peanuts","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"},{"@id":"_:b4","@type":"dfc-b:NutrientCharacteristic","dfc-b:hasNutrientDimension":"dfc-m:Calcium","dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":"10"},{"@id":"_:b6","@type":"dfc-b:PhysicalCharacteristic","dfc-b:hasPhysicalDimension":"dfc-m:Weight","dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":"100"},{"@id":"http://myplatform.com/tomato","@type":"dfc-b:SuppliedProduct","dfc-b:alcoholPercentage":"0","dfc-b:description":"Awesome tomato","dfc-b:hasAllergenCharacteristic":{"@id":"_:b2"},"dfc-b:hasCertification":[{"@id":"dfc-f:Organic-AB"},{"@id":"dfc-f:Organic-EU"}],"dfc-b:hasClaim":"dfc-f:NoAddedSugars","dfc-b:hasGeographicalOrigin":"dfc-f:CentreValLoire","dfc-b:hasNatureOrigin":{"@id":"dfc-f:PlantOrigin"},"dfc-b:hasNutrientCharacteristic":{"@id":"_:b4"},"dfc-b:hasPartOrigin":{"@id":"dfc-f:Fruit"},"dfc-b:hasPhysicalCharacteristic":{"@id":"_:b6"},"dfc-b:hasQuantity":"_:b1","dfc-b:hasType":"dfc-pt:round-tomato","dfc-b:image":["http://myplatform.com/image1","http://myplatform.com/image2"],"dfc-b:lifetime":"a week","dfc-b:referencedBy":"http://myplatform.com/catalogItem","dfc-b:totalTheoreticalStock":"2.23","dfc-b:usageOrStorageCondition":"free text"}]}`;

test('SuppliedProduct:import', async () => {
    const testObs = new TestObserver(suppliedProduct, assertSemanticEqual);
    const testSub = connector.subscribe('import', testObs);
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(suppliedProduct), true);
    expect.doesNotThrow(() => {
        testObs.complete();
        testSub.unsubscribe();
    }, '#unsubscribe');
});

test('SuppliedProduct:export', async () => {
    const serialized = await connector.export([suppliedProduct]);
    expect.strictEqual(serialized, json);
});

test('SuppliedProduct:getSemanticId', () => {
    expect.strictEqual(suppliedProduct.getSemanticId(), "http://myplatform.com/tomato");
});

test('SuppliedProduct:getDescription', () => {
    expect.strictEqual(suppliedProduct.getDescription(), "Awesome tomato");
});

test('SuppliedProduct:getProductType', async () => {
    const expected = await suppliedProduct.getProductType();
    expect.strictEqual(expected.equals(connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO), true);
});

test('SuppliedProduct:getQuantity', async () => {
    const expected = await suppliedProduct.getQuantity();
    expect.strictEqual(expected.equals(quantity), true);
});

test('SuppliedProduct:getTotalTheoreticalStock', () => {
    expect.strictEqual(suppliedProduct.getTotalTheoreticalStock(), 2.23);
});

test('SuppliedProduct:getAlcoholPercentage', () => {
    expect.strictEqual(suppliedProduct.getAlcoholPercentage(), 0);
});

test('SuppliedProduct:getLifetime', () => {
    expect.strictEqual(suppliedProduct.getLifetime(), "a week");
});

test('SuppliedProduct:getClaims', async () => {
    const claims = await suppliedProduct.getClaims();
    expect.strictEqual(claims.length, 1);
    expect.strictEqual(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS), true);
});

test('SuppliedProduct:getUsageOrStorageConditions', () => {
    expect.strictEqual(suppliedProduct.getUsageOrStorageConditions(), "free text");
});

test('SuppliedProduct:getAllergenCharacteristics', async () => {
    const allergenCharacteristics = await suppliedProduct.getAllergenCharacteristics();
    expect.strictEqual(allergenCharacteristics.length, 1);
    expect.strictEqual(allergenCharacteristics[0].equals(allergenCharacteristic), true);
});

test('SuppliedProduct:getNutrientCharacteristics', async () => {
    const nutrientCharacteristics = await suppliedProduct.getNutrientCharacteristics();
    expect.strictEqual(nutrientCharacteristics.length, 1);
    expect.strictEqual(nutrientCharacteristics[0].equals(nutrientCharacteristic), true);
});

test('SuppliedProduct:getPhysicalCharacteristics', async () => {
    const physicalCharacteristics = await suppliedProduct.getPhysicalCharacteristics();
    expect.strictEqual(physicalCharacteristics.length, 1);
    expect.strictEqual(physicalCharacteristics[0].equals(physicalCharacteristic), true);
});

test('SuppliedProduct:getGeographicalOrigin', async () => {
    const expected = await suppliedProduct.getGeographicalOrigin();
    expect.strictEqual(expected.equals(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE), true);
});

test('SuppliedProduct:getCatalogItems', async () => {
    const catalogItems = await suppliedProduct.getCatalogItems();
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem), true);
});

test('SuppliedProduct:getCertifications', async () => {
    const certifications = await suppliedProduct.getCertifications();
    expect.strictEqual(certifications.length, 2);
    expect.strictEqual(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB), true);
    expect.strictEqual(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU), true);
});

test('SuppliedProduct:getNatureOrigin', async () => {
    const natureOrigins = await suppliedProduct.getNatureOrigin();
    expect.strictEqual(natureOrigins.length, 1);
    expect.strictEqual(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.PLANTORIGIN), true);
});

test('SuppliedProduct:getPartOrigin', async () => {
    const partOrigins = await suppliedProduct.getPartOrigin();
    expect.strictEqual(partOrigins.length, 1);
    expect.strictEqual(partOrigins[0].equals(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT), true);
});

test('SuppliedProduct:setDescription', () => {
    suppliedProduct.setDescription("description2")
    expect.strictEqual(suppliedProduct.getDescription(), "description2");
});

test('SuppliedProduct:setProductType', async () => {
    suppliedProduct.setProductType(connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE);
    const expected = await suppliedProduct.getProductType();
    expect.strictEqual(expected.equals(connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE), true);
});

test('SuppliedProduct:setQuantity', async () => {
    const quantity2 = connector.createQuantity({ 
            quantity: 3, 
        unit: kilogram 
    });
    suppliedProduct.setQuantity(quantity2);
    const expected = await suppliedProduct.getQuantity();
    expect.strictEqual(expected.equals(quantity2), true);
});

test('SuppliedProduct:setTotalTheoreticalStock', () => {
    suppliedProduct.setTotalTheoreticalStock(5);
    expect.strictEqual(suppliedProduct.getTotalTheoreticalStock(), 5);
});

test('SuppliedProduct:setAlcoholPercentage', () => {
    suppliedProduct.setAlcoholPercentage(5.5);
    expect.strictEqual(suppliedProduct.getAlcoholPercentage(), 5.5);
});

test('SuppliedProduct:setLifetime', () => {
    suppliedProduct.setLifetime("lifetime2");
    expect.strictEqual(suppliedProduct.getLifetime(), "lifetime2");
});

test('SuppliedProduct:addClaim', async () => {
    suppliedProduct.addClaim(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE);
    const claims = await suppliedProduct.getClaims();
    expect.strictEqual(claims.length, 2);
    expect.strictEqual(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS), true);
    expect.strictEqual(claims[1].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE), true);
});

/*
test('SuppliedProduct:removeClaim', async () => {
    suppliedProduct.removeClaim(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS);
    const claims = await suppliedProduct.getClaims();
    expect.strictEqual(claims.length, 1);
    expect.strictEqual(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE), true);
});*/

test('SuppliedProduct:setUsageOrStorageConditions', () => {
    suppliedProduct.setUsageOrStorageConditions("free text 2");
    expect.strictEqual(suppliedProduct.getUsageOrStorageConditions(), "free text 2");
});

test('SuppliedProduct:addAllergenCharacteristics', async () => {
    suppliedProduct.addAllergenCharacteristic(allergenCharacteristic2);
    const allergenCharacteristics = await suppliedProduct.getAllergenCharacteristics();
    expect.strictEqual(allergenCharacteristics.length, 2);
    expect.strictEqual(allergenCharacteristics[0].equals(allergenCharacteristic), true);
    expect.strictEqual(allergenCharacteristics[1].equals(allergenCharacteristic2), true);
});

/*
test('SuppliedProduct:removeAllergenCharacteristics', async () => {
    suppliedProduct.removeAllergenCharacteristic(allergenCharacteristic);
    const allergenCharacteristics = await suppliedProduct.getAllergenCharacteristics();
    expect.strictEqual(allergenCharacteristics.length, 1);
    expect.strictEqual(allergenCharacteristics[0].equals(allergenCharacteristic2), true);
});*/

test('SuppliedProduct:addNutrientCharacteristics', async () => {
    suppliedProduct.addNutrientCharacteristic(nutrientCharacteristic2);
    const nutrientCharacteristics = await suppliedProduct.getNutrientCharacteristics();
    expect.strictEqual(nutrientCharacteristics.length, 2);
    expect.strictEqual(nutrientCharacteristics[0].equals(nutrientCharacteristic), true);
    expect.strictEqual(nutrientCharacteristics[1].equals(nutrientCharacteristic2), true);
});

/*
test('SuppliedProduct:removeNutrientCharacteristics', async () => {
    suppliedProduct.removeNutrientCharacteristic(nutrientCharacteristic);
    const nutrientCharacteristics = await suppliedProduct.getNutrientCharacteristics();
    expect.strictEqual(nutrientCharacteristics.length, 1);
    expect.strictEqual(nutrientCharacteristics[0].equals(nutrientCharacteristic2), true);
});*/

test('SuppliedProduct:getPhysicalCharacteristics', async () => {
    suppliedProduct.addPhysicalCharacteristic(physicalCharacteristic2);
    const physicalCharacteristics = await suppliedProduct.getPhysicalCharacteristics();
    expect.strictEqual(physicalCharacteristics.length, 2);
    expect.strictEqual(physicalCharacteristics[0].equals(physicalCharacteristic), true);
    expect.strictEqual(physicalCharacteristics[1].equals(physicalCharacteristic2), true);
});

/*
test('SuppliedProduct:removePhysicalCharacteristics', async () => {
    suppliedProduct.removePhysicalCharacteristic(physicalCharacteristic);
    const physicalCharacteristics = await suppliedProduct.getPhysicalCharacteristics();
    expect.strictEqual(physicalCharacteristics.length, 1);
    expect.strictEqual(physicalCharacteristics[0].equals(physicalCharacteristic2), true);
});*/

test('SuppliedProduct:setGeographicalOrigin', async () => {
    suppliedProduct.setGeographicalOrigin(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY);
    const expected = await suppliedProduct.getGeographicalOrigin();
    expect.strictEqual(expected.equals(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY), true);
});

test('SuppliedProduct:addCatalogItem', async () => {
    suppliedProduct.addCatalogItem(catalogItem2);
    const catalogItems = await suppliedProduct.getCatalogItems()
    expect.strictEqual(catalogItems.length, 2);
    expect.strictEqual(catalogItems[0].equals(catalogItem), true);
    expect.strictEqual(catalogItems[1].equals(catalogItem2), true);
});

/*
test('SuppliedProduct:removeCatalogItem', async () => {
    suppliedProduct.removeCatalogItem(catalogItem);
    const catalogItems = await suppliedProduct.getCatalogItems()
    expect.strictEqual(catalogItems.length, 1);
    expect.strictEqual(catalogItems[0].equals(catalogItem2), true);
});*/

test('SuppliedProduct:addCertification', async () => {
    suppliedProduct.addCertification(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES);
    const certifications = await suppliedProduct.getCertifications();
    expect.strictEqual(certifications.length, 3);
    expect.strictEqual(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB), true);
    expect.strictEqual(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU), true);
    expect.strictEqual(certifications[2].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES), true);
});

/*
test('SuppliedProduct:removeCertification', async () => {
    suppliedProduct.removeCertification(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU);
    const certifications = await suppliedProduct.getCertifications();
    expect.strictEqual(certifications.length, 2);
    expect.strictEqual(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB), true);
    expect.strictEqual(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES), true);
});*/

test('SuppliedProduct:addNatureOrigin', async () => {
    suppliedProduct.addNatureOrigin(connector.FACETS.NATUREORIGIN.ALGAE);
    const natureOrigins = await suppliedProduct.getNatureOrigin();
    expect.strictEqual(natureOrigins.length, 2);
    expect.strictEqual(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.PLANTORIGIN), true);
    expect.strictEqual(natureOrigins[1].equals(connector.FACETS.NATUREORIGIN.ALGAE), true);
});

/*
test('SuppliedProduct:removeNatureOrigin', async () => {
    suppliedProduct.removeNatureOrigin(connector.FACETS.NATUREORIGIN.PLANTORIGIN);
    const natureOrigins = await suppliedProduct.getNatureOrigin();
    expect.strictEqual(natureOrigins.length, 1);
    expect.strictEqual(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.ALGAE), true);
});*/

test('SuppliedProduct:addPartOrigin', async () => {
    suppliedProduct.addPartOrigin(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW)
    const partOrigins = await suppliedProduct.getPartOrigin();
    expect.strictEqual(partOrigins.length, 2);
    expect.strictEqual(partOrigins[0].equals(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT), true);
    expect.strictEqual(partOrigins[1].equals(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW), true);
});

/*
test('SuppliedProduct:removePartOrigin', async () => {
    suppliedProduct.removePartOrigin(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT)
    const partOrigins = await suppliedProduct.getPartOrigin();
    expect.strictEqual(partOrigins.length, 1);
    expect.strictEqual(partOrigins[0].equals(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW), true);
});*/

test('SuppliedProduct:getImages', () => {
    expect.strictEqual(suppliedProduct.getImages().length, 2);
    expect.strictEqual(suppliedProduct.getImages().every(e => ["http://myplatform.com/image1", "http://myplatform.com/image2"].includes(e)), true);
});

test('SuppliedProduct:addImage', () => {
    suppliedProduct.addImage("http://myplatform.com/image3");
    expect.strictEqual(suppliedProduct.getImages().length, 3);
    expect.strictEqual(suppliedProduct.getImages().every(e => ["http://myplatform.com/image1", "http://myplatform.com/image2", "http://myplatform.com/image3"].includes(e)), true);
});