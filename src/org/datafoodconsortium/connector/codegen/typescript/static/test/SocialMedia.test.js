import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

let socialMedia = connector.createSocialMedia({
    semanticId: "http://myplatform.com/socialMedia",
    name: "name",
    url: "url",
});

const json = `{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_1.16.0.jsonld","@id":"http://myplatform.com/socialMedia","@type":"dfc-b:SocialMedia","dfc-b:URL":"url","dfc-b:name":"name"}`;

test('SocialMedia:import', async () => {
    const importedAll = await connector.import(json);
    const imported = importedAll[0];
    expect.strictEqual(importedAll.length, 1);
    expect.strictEqual(imported.equals(socialMedia), true);
});

test('SocialMedia:export', async () => {
    const serialized = await connector.export([socialMedia]);
    expect.strictEqual(serialized, json);
});

test('SocialMedia:getSemanticId', () => {
    expect.strictEqual(socialMedia.getSemanticId(), "http://myplatform.com/socialMedia");
});

test('SocialMedia:getName', () => {
    expect.strictEqual(socialMedia.getName(), "name");
});

test('SocialMedia:getUrl', () => {
    expect.strictEqual(socialMedia.getUrl(), "url");
});