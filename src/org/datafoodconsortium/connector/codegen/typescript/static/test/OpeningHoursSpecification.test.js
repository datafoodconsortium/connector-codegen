import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";

const connector = new Connector();

const openingHoursSpecification = connector.createOpeningHoursSpecification({
    semanticId: "http://myplatform.com/openingHoursSpecification",
    dayOfWeek: "dayOfWeek",
    opens: "opens",
    closes: "closes",
});

const json = '{"@context":"https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld","@id":"http://myplatform.com/openingHoursSpecification","@type":"https://schema.org/OpeningHoursSpecification","https://schema.org/closes":"closes","https://schema.org/dayOfWeek":"dayOfWeek","https://schema.org/opens":"opens"}';

test('OpeningHoursSpecification:import', async () => {
    const imported = await connector.import(json);
    const expected = imported[0];
    expect.strictEqual(imported.length, 1);
    expect.strictEqual(expected.equals(openingHoursSpecification), true);
});

test('OpeningHoursSpecification:export', async () => {
    const serialized = await connector.export([openingHoursSpecification]);
    expect.strictEqual(serialized, json);
});

test('OpeningHoursSpecification:getSemanticId', () => {
    expect.strictEqual(openingHoursSpecification.getSemanticId(), "http://myplatform.com/openingHoursSpecification");
});

test('OpeningHoursSpecification:getDayOfWeek', () => {
    expect.strictEqual(openingHoursSpecification.getDayOfWeek(), "dayOfWeek");
});

test('OpeningHoursSpecification:getOpens', () => {
    expect.strictEqual(openingHoursSpecification.getOpens(), "opens");
});

test('OpeningHoursSpecification:getCloses', () => {
    expect.strictEqual(openingHoursSpecification.getCloses(), "closes");
});

test('OpeningHoursSpecification:setDayOfWeek', () => {
    openingHoursSpecification.setDayOfWeek("dayOfWeek2");
    expect.strictEqual(openingHoursSpecification.getDayOfWeek(), "dayOfWeek2");
});

test('OpeningHoursSpecification:setOpens', () => {
    openingHoursSpecification.setOpens("opens2");
    expect.strictEqual(openingHoursSpecification.getOpens(), "opens2");
});

test('OpeningHoursSpecification:setCloses', () => {
    openingHoursSpecification.setCloses("closes2");
    expect.strictEqual(openingHoursSpecification.getCloses(), "closes2");
});