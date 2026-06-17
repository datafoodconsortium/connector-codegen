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

const nutrientCharacteristic = connector.createNutrientCharacteristic({ 
    value: 10, 
    unit: gram, 
    nutrientDimension: connector.MEASURES.DIMENSION.NUTRIENTDIMENSION.CALCIUM 
});

const physicalCharacteristic = connector.createPhysicalCharacteristic({ 
    value: 100, 
    unit: gram, 
    physicalDimension: connector.MEASURES.DIMENSION.PHYSICALDIMENSION.WEIGHT 
});

const catalogItem = connector.createCatalogItem({ 
    semanticId: "http://myplatform.com/catalogItem" 
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@graph":[{"@id":"_:b1","@type":"dfc-b:QuantitativeValue","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1.2"},{"@id":"_:b2","@type":"dfc-b:AllergenCharacteristic","dfc-b:hasAllergenDimension":"dfc-m:Peanuts","dfc-b:hasUnit":"dfc-m:Kilogram","dfc-b:value":"1"},{"@id":"_:b3","@type":"dfc-b:NutrientCharacteristic","dfc-b:hasNutrientDimension":"dfc-m:Calcium","dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":"10"},{"@id":"_:b4","@type":"dfc-b:PhysicalCharacteristic","dfc-b:hasPhysicalDimension":"dfc-m:Weight","dfc-b:hasUnit":"dfc-m:Gram","dfc-b:value":"100"},{"@id":"http://myplatform.com/variant","@type":"dfc-b:Variant","dfc-b:alcoholPercentage":"0","dfc-b:description":"description","dfc-b:hasAllergenCharacteristic":"_:b2","dfc-b:hasCertification":["dfc-f:Organic-AB","dfc-f:Organic-EU"],"dfc-b:hasClaim":"dfc-f:NoAddedSugars","dfc-b:hasGeographicalOrigin":"dfc-f:CentreValLoire","dfc-b:hasNatureOrigin":"dfc-f:PlantOrigin","dfc-b:hasNutrientCharacteristic":"_:b3","dfc-b:hasPartOrigin":"dfc-f:Fruit","dfc-b:hasPhysicalCharacteristic":"_:b4","dfc-b:hasQuantity":"_:b1","dfc-b:hasType":"dfc-pt:round-tomato","dfc-b:image":["http://myplatform.com/image1","http://myplatform.com/image2"],"dfc-b:lifetime":"lifetime","dfc-b:name":"name","dfc-b:referencedBy":"http://myplatform.com/catalogItem","dfc-b:usageOrStorageCondition":"usageOrStorageConditions"}]}`;

const variant = connector.createVariant({
    semanticId: "http://myplatform.com/variant",
    name: "name",
    description: "description",
    images: ["http://myplatform.com/image1", "http://myplatform.com/image2"],
    productType: connector.PRODUCT_TYPES.VEGETABLE.TOMATO.ROUND_TOMATO, 
    quantity: quantity,
    totalTheoreticalStock: 2.23,
    alcoholPercentage: 0, 
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
    partOrigin: [connector.FACETS.PARTORIGIN.PLANTPARTORIGIN.FRUIT]
});

test('Variant:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(variant), true);
});

test('Variant:export', async () => {
    const serialized = await connector.export([variant]);
    expect.strictEqual(serialized, json);
});