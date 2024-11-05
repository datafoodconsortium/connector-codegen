import CatalogItem from '../lib/CatalogItem.js';
import SuppliedProduct from '../lib/SuppliedProduct.js';
import QuantitativeValue from '../lib/QuantitativeValue.js';
import AllergenCharacteristic from '../lib/AllergenCharacteristic.js';
import NutrientCharacteristic from '../lib/NutrientCharacteristic.js';
import PhysicalCharacteristic from '../lib/PhysicalCharacteristic.js';
import Connector from "../lib/Connector.js";
import facets from '../test/thesaurus/facets.json' assert { type: 'json' };
import measures from '../test/thesaurus/measures.json' assert { type: 'json' };
import productTypes from '../test/thesaurus/productTypes.json' assert { type: 'json' };

const connector = new Connector();

await connector.loadFacets(JSON.stringify(facets));
await connector.loadMeasures(JSON.stringify(measures));
await connector.loadProductTypes(JSON.stringify(productTypes));

const gram = connector.MEASURES.UNIT.QUANTITYUNIT.GRAM;
const kilogram = connector.MEASURES.UNIT.QUANTITYUNIT.KILOGRAM;

const quantity = new QuantitativeValue({ 
    connector: connector, 
    value: 1.2, 
    unit: kilogram
});

const allergenCharacteristic = new AllergenCharacteristic({ 
    connector: connector, 
    value: 1, 
    unit: kilogram, 
    allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.PEANUTS 
});

const allergenCharacteristic2 = new AllergenCharacteristic({ 
    connector: connector, 
    value: 3.5, 
    unit: gram, 
    allergenDimension: connector.MEASURES.DIMENSION.ALLERGENDIMENSION.EGGS 
});

const nutrientCharacteristic = new NutrientCharacteristic({ 
    connector: connector,
    value: 10, 
    unit: gram, 
    nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM 
});

const nutrientCharacteristic2 = new NutrientCharacteristic({ 
    connector: connector,
    value: 8, 
    unit: kilogram, 
    nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.FIBRE 
});

const physicalCharacteristic = new PhysicalCharacteristic({ 
    connector: connector, 
    value: 100, 
    unit: gram, 
    physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT 
});

const physicalCharacteristic2 = new PhysicalCharacteristic({ 
    connector: connector, 
    value: 32.5, 
    unit: kilogram, 
    physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.HEIGHT 
});

const catalogItem = new CatalogItem({ 
    connector: connector, 
    semanticId: "http://myplatform.com/catalogItem" 
});

const catalogItem2 = new CatalogItem({ 
    connector: connector, 
    semanticId: "http://myplatform.com/catalogItem2" 
});

let suppliedProduct = new SuppliedProduct({
    connector: connector,
    semanticId: "http://myplatform.com/tomato",
    description: "Awesome tomato",
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

const json = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1.2"},{"@id":"_:b2","@type":"dfc-b:AllergenCharacteristic","dfc-b:hasAllergenDimension":"dfc-m:Peanuts","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"},{"@id":"_:b4","@type":"dfc-b:NutrientCharacteristic","dfc-b:hasNutrientDimension":{"@id":"dfc-m:Calcium"},"dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":"10"},{"@id":"_:b6","@type":"dfc-b:PhysicalCharacteristic","dfc-b:hasPhysicalDimension":"dfc-m:Weight","dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":"100"},{"@id":"http://myplatform.com/tomato","@type":"dfc-b:SuppliedProduct","dfc-b:alcoholPercentage":"0","dfc-b:description":"Awesome tomato","dfc-b:hasAllergenCharacteristic":{"@id":"_:b2"},"dfc-b:hasCertification":[{"@id":"dfc-f:Organic-AB"},{"@id":"dfc-f:Organic-EU"}],"dfc-b:hasClaim":"dfc-f:NoAddedSugars","dfc-b:hasGeographicalOrigin":"dfc-f:CentreValLoire","dfc-b:hasNatureOrigin":{"@id":"dfc-f:PlantOrigin"},"dfc-b:hasNutrientCharacteristic":{"@id":"_:b4"},"dfc-b:hasPartOrigin":{"@id":"dfc-f:Fruit"},"dfc-b:hasPhysicalCharacteristic":{"@id":"_:b6"},"dfc-b:hasQuantity":"_:b1","dfc-b:hasType":"dfc-pt:round-tomato","dfc-b:lifetime":"a week","dfc-b:referencedBy":"http://myplatform.com/catalogItem","dfc-b:totalTheoreticalStock":"2.23","dfc-b:usageOrStorageCondition":"free text"}]}`;

test('SuppliedProduct:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect(importedAll.length).toStrictEqual(1);
    expect(imported.equals(suppliedProduct)).toStrictEqual(true);
});

test('SuppliedProduct:export', async () => {
    const serialized = await connector.export([suppliedProduct]);
    expect(serialized).toStrictEqual(json);
});

test('SuppliedProduct:getSemanticId', async () => {
    expect(suppliedProduct.getSemanticId()).toStrictEqual("http://myplatform.com/tomato");
});

test('SuppliedProduct:getDescription', async () => {
    expect(suppliedProduct.getDescription()).toStrictEqual("Awesome tomato");
});

test('SuppliedProduct:getProductType', async () => {
    const expected = await suppliedProduct.getProductType();
    expect(expected.equals(connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO)).toStrictEqual(true);
});

test('SuppliedProduct:getQuantity', async () => {
    const expected = await suppliedProduct.getQuantity();
    expect(expected.equals(quantity)).toStrictEqual(true);
});

test('SuppliedProduct:getTotalTheoreticalStock', async () => {
    expect(suppliedProduct.getTotalTheoreticalStock()).toStrictEqual(2.23);
});

test('SuppliedProduct:getAlcoholPercentage', async () => {
    expect(suppliedProduct.getAlcoholPercentage()).toStrictEqual(0);
});

test('SuppliedProduct:getLifetime', async () => {
    expect(suppliedProduct.getLifetime()).toStrictEqual("a week");
});

test('SuppliedProduct:getClaims', async () => {
    const claims = await suppliedProduct.getClaims();
    expect(claims.length).toStrictEqual(1);
    expect(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS)).toStrictEqual(true);
});

test('SuppliedProduct:getUsageOrStorageConditions', async () => {
    expect(suppliedProduct.getUsageOrStorageConditions()).toStrictEqual("free text");
});

test('SuppliedProduct:getAllergenCharacteristics', async () => {
    const allergenCharacteristics = await suppliedProduct.getAllergenCharacteristics();
    expect(allergenCharacteristics.length).toStrictEqual(1);
    expect(allergenCharacteristics[0].equals(allergenCharacteristic)).toStrictEqual(true);
});

test('SuppliedProduct:getNutrientCharacteristics', async () => {
    const nutrientCharacteristics = await suppliedProduct.getNutrientCharacteristics();
    expect(nutrientCharacteristics.length).toStrictEqual(1);
    expect(nutrientCharacteristics[0].equals(nutrientCharacteristic)).toStrictEqual(true);
});

test('SuppliedProduct:getPhysicalCharacteristics', async () => {
    const physicalCharacteristics = await suppliedProduct.getPhysicalCharacteristics();
    expect(physicalCharacteristics.length).toStrictEqual(1);
    expect(physicalCharacteristics[0].equals(physicalCharacteristic)).toStrictEqual(true);
});

test('SuppliedProduct:getGeographicalOrigin', async () => {
    const expected = await suppliedProduct.getGeographicalOrigin();
    expect(expected.equals(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.CENTREVALLOIRE)).toStrictEqual(true);
});

test('SuppliedProduct:getCatalogItems', async () => {
    const catalogItems = await suppliedProduct.getCatalogItems();
    expect(catalogItems.length).toStrictEqual(1);
    expect(catalogItems[0].equals(catalogItem)).toStrictEqual(true);
});

test('SuppliedProduct:getCertifications', async () => {
    const certifications = await suppliedProduct.getCertifications();
    expect(certifications.length).toStrictEqual(2);
    expect(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB)).toStrictEqual(true);
    expect(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU)).toStrictEqual(true);
});

test('SuppliedProduct:getNatureOrigin', async () => {
    const natureOrigins = await suppliedProduct.getNatureOrigin();
    expect(natureOrigins.length).toStrictEqual(1);
    expect(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.PLANTORIGIN)).toStrictEqual(true);
});

test('SuppliedProduct:getPartOrigin', async () => {
    const partOrigins = await suppliedProduct.getPartOrigin();
    expect(partOrigins.length).toStrictEqual(1);
    expect(partOrigins[0].equals(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT)).toStrictEqual(true);
});

test('SuppliedProduct:setDescription', async () => {
    suppliedProduct.setDescription("description2")
    expect(suppliedProduct.getDescription()).toStrictEqual("description2");
});

test('SuppliedProduct:setProductType', async () => {
    suppliedProduct.setProductType(connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE);
    const expected = await suppliedProduct.getProductType();
    expect(expected.equals(connector.PRODUCT_TYPES.VEGETABLE.ARTICHOKE)).toStrictEqual(true);
});

test('SuppliedProduct:setQuantity', async () => {
    const quantity2 = new QuantitativeValue({ 
        connector: connector, 
        quantity: 3, 
        unit: kilogram 
    });
    suppliedProduct.setQuantity(quantity2);
    const expected = await suppliedProduct.getQuantity();
    expect(expected.equals(quantity2)).toStrictEqual(true);
});

test('SuppliedProduct:setTotalTheoreticalStock', async () => {
    suppliedProduct.setTotalTheoreticalStock(5);
    expect(suppliedProduct.getTotalTheoreticalStock()).toStrictEqual(5);
});

test('SuppliedProduct:setAlcoholPercentage', async () => {
    suppliedProduct.setAlcoholPercentage(5.5);
    expect(suppliedProduct.getAlcoholPercentage()).toStrictEqual(5.5);
});

test('SuppliedProduct:setLifetime', async () => {
    suppliedProduct.setLifetime("lifetime2");
    expect(suppliedProduct.getLifetime()).toStrictEqual("lifetime2");
});

test('SuppliedProduct:addClaim', async () => {
    suppliedProduct.addClaim(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE);
    const claims = await suppliedProduct.getClaims();
    expect(claims.length).toStrictEqual(2);
    expect(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS)).toStrictEqual(true);
    expect(claims[1].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE)).toStrictEqual(true);
});

test('SuppliedProduct:removeClaim', async () => {
    suppliedProduct.removeClaim(connector.FACETS.CLAIM.NUTRITIONALCLAIM.NOADDEDSUGARS);
    const claims = await suppliedProduct.getClaims();
    expect(claims.length).toStrictEqual(1);
    expect(claims[0].equals(connector.FACETS.CLAIM.NUTRITIONALCLAIM.FATFREE)).toStrictEqual(true);
});

test('SuppliedProduct:setUsageOrStorageConditions', async () => {
    suppliedProduct.setUsageOrStorageConditions("free text 2");
    expect(suppliedProduct.getUsageOrStorageConditions()).toStrictEqual("free text 2");
});

test('SuppliedProduct:addAllergenCharacteristics', async () => {
    suppliedProduct.addAllergenCharacteristic(allergenCharacteristic2);
    const allergenCharacteristics = await suppliedProduct.getAllergenCharacteristics();
    expect(allergenCharacteristics.length).toStrictEqual(2);
    expect(allergenCharacteristics[0].equals(allergenCharacteristic)).toStrictEqual(true);
    expect(allergenCharacteristics[1].equals(allergenCharacteristic2)).toStrictEqual(true);
});

test('SuppliedProduct:removeAllergenCharacteristics', async () => {
    suppliedProduct.removeAllergenCharacteristic(allergenCharacteristic);
    const allergenCharacteristics = await suppliedProduct.getAllergenCharacteristics();
    expect(allergenCharacteristics.length).toStrictEqual(1);
    expect(allergenCharacteristics[0].equals(allergenCharacteristic2)).toStrictEqual(true);
});

test('SuppliedProduct:addNutrientCharacteristics', async () => {
    suppliedProduct.addNutrientCharacteristic(nutrientCharacteristic2);
    const nutrientCharacteristics = await suppliedProduct.getNutrientCharacteristics();
    expect(nutrientCharacteristics.length).toStrictEqual(2);
    expect(nutrientCharacteristics[0].equals(nutrientCharacteristic)).toStrictEqual(true);
    expect(nutrientCharacteristics[1].equals(nutrientCharacteristic2)).toStrictEqual(true);
});

test('SuppliedProduct:removeNutrientCharacteristics', async () => {
    suppliedProduct.removeNutrientCharacteristic(nutrientCharacteristic);
    const nutrientCharacteristics = await suppliedProduct.getNutrientCharacteristics();
    expect(nutrientCharacteristics.length).toStrictEqual(1);
    expect(nutrientCharacteristics[0].equals(nutrientCharacteristic2)).toStrictEqual(true);
});

test('SuppliedProduct:getPhysicalCharacteristics', async () => {
    suppliedProduct.addPhysicalCharacteristic(physicalCharacteristic2);
    const physicalCharacteristics = await suppliedProduct.getPhysicalCharacteristics();
    expect(physicalCharacteristics.length).toStrictEqual(2);
    expect(physicalCharacteristics[0].equals(physicalCharacteristic)).toStrictEqual(true);
    expect(physicalCharacteristics[1].equals(physicalCharacteristic2)).toStrictEqual(true);
});

test('SuppliedProduct:removePhysicalCharacteristics', async () => {
    suppliedProduct.removePhysicalCharacteristic(physicalCharacteristic);
    const physicalCharacteristics = await suppliedProduct.getPhysicalCharacteristics();
    expect(physicalCharacteristics.length).toStrictEqual(1);
    expect(physicalCharacteristics[0].equals(physicalCharacteristic2)).toStrictEqual(true);
});

test('SuppliedProduct:setGeographicalOrigin', async () => {
    suppliedProduct.setGeographicalOrigin(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY);
    const expected = await suppliedProduct.getGeographicalOrigin();
    expect(expected.equals(connector.FACETS.TERRITORIALORIGIN.EUROPE.FRANCE.NORMANDY)).toStrictEqual(true);
});

test('SuppliedProduct:addCatalogItem', async () => {
    suppliedProduct.addCatalogItem(catalogItem2);
    const catalogItems = await suppliedProduct.getCatalogItems()
    expect(catalogItems.length).toStrictEqual(2);
    expect(catalogItems[0].equals(catalogItem)).toStrictEqual(true);
    expect(catalogItems[1].equals(catalogItem2)).toStrictEqual(true);
});

test('SuppliedProduct:removeCatalogItem', async () => {
    suppliedProduct.removeCatalogItem(catalogItem);
    const catalogItems = await suppliedProduct.getCatalogItems()
    expect(catalogItems.length).toStrictEqual(1);
    expect(catalogItems[0].equals(catalogItem2)).toStrictEqual(true);
});

test('SuppliedProduct:addCertification', async () => {
    suppliedProduct.addCertification(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES);
    const certifications = await suppliedProduct.getCertifications();
    expect(certifications.length).toStrictEqual(3);
    expect(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB)).toStrictEqual(true);
    expect(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU)).toStrictEqual(true);
    expect(certifications[2].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES)).toStrictEqual(true);
});

test('SuppliedProduct:removeCertification', async () => {
    suppliedProduct.removeCertification(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_EU);
    const certifications = await suppliedProduct.getCertifications();
    expect(certifications.length).toStrictEqual(2);
    expect(certifications[0].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.ORGANIC_AB)).toStrictEqual(true);
    expect(certifications[1].equals(connector.FACETS.CERTIFICATION.ORGANICLABEL.NATUREETPROGRES)).toStrictEqual(true);
});

test('SuppliedProduct:addNatureOrigin', async () => {
    suppliedProduct.addNatureOrigin(connector.FACETS.NATUREORIGIN.ALGAE);
    const natureOrigins = await suppliedProduct.getNatureOrigin();
    expect(natureOrigins.length).toStrictEqual(2);
    expect(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.PLANTORIGIN)).toStrictEqual(true);
    expect(natureOrigins[1].equals(connector.FACETS.NATUREORIGIN.ALGAE)).toStrictEqual(true);
});

test('SuppliedProduct:removeNatureOrigin', async () => {
    suppliedProduct.removeNatureOrigin(connector.FACETS.NATUREORIGIN.PLANTORIGIN);
    const natureOrigins = await suppliedProduct.getNatureOrigin();
    expect(natureOrigins.length).toStrictEqual(1);
    expect(natureOrigins[0].equals(connector.FACETS.NATUREORIGIN.ALGAE)).toStrictEqual(true);
});

test('SuppliedProduct:addPartOrigin', async () => {
    suppliedProduct.addPartOrigin(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW)
    const partOrigins = await suppliedProduct.getPartOrigin();
    expect(partOrigins.length).toStrictEqual(2);
    expect(partOrigins[0].equals(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT)).toStrictEqual(true);
    expect(partOrigins[1].equals(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW)).toStrictEqual(true);
});

test('SuppliedProduct:removePartOrigin', async () => {
    suppliedProduct.removePartOrigin(connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT)
    const partOrigins = await suppliedProduct.getPartOrigin();
    expect(partOrigins.length).toStrictEqual(1);
    expect(partOrigins[0].equals(connector.FACETS.PARTORIGIN.ANIMALPARTORIGIN.COW)).toStrictEqual(true);
});