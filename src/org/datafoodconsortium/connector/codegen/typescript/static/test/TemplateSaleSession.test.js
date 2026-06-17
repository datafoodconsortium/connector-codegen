import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/templateSaleSession","@type":"dfc-b:TemplateSaleSession","dfc-b:hostedAt":"http://myplatform.com/physicalPlace","dfc-b:isTemplateSaleSessionOf":"http://myplatform.com/organization"}`;

const organization = connector.createOrganization({ semanticId: "http://myplatform.com/organization" });
const physicalPlace = connector.createPhysicalPlace({ semanticId: "http://myplatform.com/physicalPlace" });

const templateSaleSession = connector.createTemplateSaleSession({
    semanticId: "http://myplatform.com/templateSaleSession",
    hostingPlaces: [physicalPlace],
    organizations: [organization],
});

test('TemplateSaleSession:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(templateSaleSession), true);
});

test('TemplateSaleSession:export', async () => {
    const serialized = await connector.export([templateSaleSession]);
    expect.strictEqual(serialized, json);
});