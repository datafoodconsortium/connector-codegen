import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/certification","@type":"dfc-b:Certfication","dfc-b:certiferReference":"certificationReference","dfc-b:certificationScore":"certificationScore","dfc-b:certifies":"http://myplatform.com/organization","dfc-b:hasDescription":"description","dfc-b:name":"name","dfc-b:operatorId":"operatorId"}`;

const organization = connector.createOrganization({ semanticId: "http://myplatform.com/organization" });

const certification = connector.createCertification({
    semanticId: "http://myplatform.com/certification",
    name: "name",
    description: "description",
    certificationReferences: ["certificationReference"],
    certificationScores: ["certificationScore"],
    operatorIds: ["operatorId"],
    certifiedOrganizations: [organization],
});

test('Certification:import', async () => {
    const imported = await connector.import(json);
    const importedObject = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(importedObject.equals(certification), true);
});

test('Certification:export', async () => {
    const serialized = await connector.export([certification]);
    expect.strictEqual(serialized, json);
});