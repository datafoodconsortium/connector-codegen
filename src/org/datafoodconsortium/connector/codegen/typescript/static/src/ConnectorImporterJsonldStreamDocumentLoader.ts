import context from "./context.js";
const preloadUrl = "https://www.datafoodconsortium.org/wp-content/plugins/wordpress-context-jsonld/context_2.0.0.jsonld";

export class ConnectorImporterJsonldStreamDocumentLoader {

    public async load(url: string): Promise<any> {

        if (url === preloadUrl) {
            const jsonContext = { "@context": context };
            return jsonContext;
        }

        const response = await fetch(url);
        
        if (response.ok) {
            return await response.json();
        } 
        
        return Promise.reject("Unable to load context from cache.");
    }

}