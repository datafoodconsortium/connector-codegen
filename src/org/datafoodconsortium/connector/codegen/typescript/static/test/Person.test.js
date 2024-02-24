import Person from '../lib/Person.js';
import Address from '../lib/Address.js';
import Connector from "../lib/Connector.js";
import Enterprise from '../lib/Enterprise.js';

const connector = new Connector();

const address = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address/address1"
});

const address2 = new Address({
    connector: connector,
    semanticId: "http://myplatform.com/address/address2"
});

const enterprise = new Enterprise({
    connector: connector,
    semanticId: "http://myplatform.com/address/enterprise1"
});

const enterprise2 = new Enterprise({
    connector: connector,
    semanticId: "http://myplatform.com/address/enterprise2"
});

const person = new Person({
    connector: connector,
    semanticId: "http://myplatform.com/person1",
    firstName: "John",
    lastName: "Smith",
    localizations: [address],
    organizations: [enterprise]
});

const json = `{"@context":"http://static.datafoodconsortium.org/ontologies/context.json","@id":"http://myplatform.com/person1","@type":"dfc-b:Person","dfc-b:affiliates":"http://myplatform.com/address/enterprise1","dfc-b:familyName":"Smith","dfc-b:firstName":"John","dfc-b:hasAddress":{"@id":"http://myplatform.com/address/address1"}}`;

test('Person:import', async () => {
    const imported = await connector.import(json);
    const importedPerson = imported[0];
    expect(imported.length).toStrictEqual(1);
    expect(importedPerson.equals(person)).toStrictEqual(true);
});

test('Person:export', async () => {
    const serialized = await connector.export([person]);
    expect(serialized).toStrictEqual(json);
});

test('Person:getSemanticId', async () => {
    expect(person.getSemanticId()).toStrictEqual("http://myplatform.com/person1");
});

test('Person:getFirstName', async () => {
    expect(person.getFirstName()).toStrictEqual("John");
});

test('Person:getLastName', async () => {
    expect(person.getLastName()).toStrictEqual("Smith");
});

test('Person:getLocalizations', async () => {
    const localizations = await person.getLocalizations();
    expect(localizations.length).toStrictEqual(1);
    expect(localizations[0].equals(address)).toStrictEqual(true);
});

test('Person:getAffiliatedOrganizations', async () => {
    const organizations = await person.getAffiliatedOrganizations();
    expect(organizations.length).toStrictEqual(1);
    expect(organizations[0].equals(enterprise)).toStrictEqual(true);
});

test('Person:setFirstName', async () => {
    person.setFirstName("John2");
    expect(person.getFirstName()).toStrictEqual("John2");
});

test('Person:setLastName', async () => {
    person.setLastName("Smith2");
    expect(person.getLastName()).toStrictEqual("Smith2");
});

test('Person:addLocalization', async () => {
    person.addLocalization(address2);
    const localizations = await person.getLocalizations();
    expect(localizations.length).toStrictEqual(2);
    expect(localizations[0].equals(address)).toStrictEqual(true);
    expect(localizations[1].equals(address2)).toStrictEqual(true);
});

test('Person:affiliatedTo', async () => {
    person.affiliateTo(enterprise2);
    const organizations = await person.getAffiliatedOrganizations();
    expect(organizations.length).toStrictEqual(2);
    expect(organizations[0].equals(enterprise)).toStrictEqual(true);
    expect(organizations[1].equals(enterprise2)).toStrictEqual(true);
});

test('Person:removeLocalization', async () => {
    person.removeLocalization(address);
    const localizations = await person.getLocalizations();
    expect(localizations.length).toStrictEqual();
    expect(localizations[0].equals(address2)).toStrictEqual(true);
});

test('Person:leaveAaffiliatedOrganization', async () => {
    person.leaveAaffiliatedOrganization(enterprise);
    const organizations = await person.affiliatedOrganizations();
    expect(organizations.length).toStrictEqual(1);
    expect(organizations[0].equals(enterprise2)).toStrictEqual(true);
});