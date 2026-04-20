import expect from 'node:assert';
import { test } from 'node:test';
import Connector from "../lib/Connector.js";
import ConnectorImporterJsonldStream from "../lib/ConnectorImporterJsonldStream.js";
import context from "../lib/context.js";

const connector = new Connector();

class Loader {
    async load(url) {
        return {
            "@context": context
        }
    }
}
const importer = new ConnectorImporterJsonldStream({ documentLoader: new Loader() });

const data = `{"@context":"https://www.datafoodconsortium.org","@graph":[{"@id":"_:b1","@type":"dfc-b:Price","dfc-b:VATrate":"8","dfc-b:hasUnit":"dfc-m:Euro","dfc-b:value":"2.54"},{"@id":"http://myplatform.com/offer1","@type":"dfc-b:Offer","dfc-b:offeredItem":{"@id":"http://myplatform.com/suppliedProduct1"},"dfc-b:offeredTo":{"@id":"http://myplatform.com/customerCategory1"},"dfc-b:price":{"@id":"_:b1"},"dfc-b:stockLimitation":"4.21"}]}`;

test('Connector:test', async () => {
    expect.ok('Connector is OK', connector);
    const imported = await connector.import(data, { importer: importer });
    const expected = imported[0];
    expect.ok('Imported value at index 0 is OK', expected);
});
