/*
 * MIT License
 * 
 * Copyright (c) 2023 Maxime Lecoq <maxime@lecoqlibre.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

import ISKOSConcept from "./ISKOSConcept.js"
import ISKOSLabel from "./ISKOSLabel.js"
import ISKOSConceptScheme from "./ISKOSConceptScheme.js"
import { SemanticObject } from "@virtual-assembly/semantizer"
import { Semanticable } from "@virtual-assembly/semantizer"
import IConnector from "./IConnector.js";
import IGetterOptions from "./IGetterOptions.js"

export default class SKOSConcept extends SemanticObject implements ISKOSConcept {
	
	protected connector: IConnector;

	public constructor(parameters: {connector: IConnector, doNotStore?: boolean, semanticId?: string, other?: Semanticable}) {
		const type: string = "http://www.w3.org/2004/02/skos/core#Concept";
		
		if (parameters.other) {
			super({ semantizer: parameters.connector.getSemantizer(), semanticId: parameters.semanticId!, other: parameters.other });
			if (!parameters.other.isSemanticTypeOf(type))
				throw new Error("Can't create the semantic object of type " + type + " from a copy: the copy is of type " + parameters.other.getSemanticType() + ".");
		}
		else super({ semantizer: parameters.connector.getSemantizer(), semanticId: parameters.semanticId!, semanticType: type });
		
		this.connector = parameters.connector;
		
		
		if (!parameters.doNotStore)
			this.connector.store(this);
		
	}

	public async getBroader(options?: IGetterOptions): Promise<Array<ISKOSConcept>>
	 {
		const results = new Array<ISKOSConcept>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#broader");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<ISKOSConcept> semanticObject);
		}
		return results;
	}
	

	public removeBroader(broader: ISKOSConcept): void {
		throw new Error("Not yet implemented.");
	}
	

	public addNarrower(narrower: ISKOSConcept): void {
		const property: string = "http://www.w3.org/2004/02/skos/core#narrower";
		if (narrower.isSemanticObjectAnonymous()) {
			this.addSemanticPropertyAnonymous(property, narrower);
		}
		else {
			this.connector.store(narrower);
			this.addSemanticPropertyReference(property, narrower);
		}
	}
	

	public addBroader(broader: ISKOSConcept): void {
		const property: string = "http://www.w3.org/2004/02/skos/core#broader";
		if (broader.isSemanticObjectAnonymous()) {
			this.addSemanticPropertyAnonymous(property, broader);
		}
		else {
			this.connector.store(broader);
			this.addSemanticPropertyReference(property, broader);
		}
	}
	

	public removeScheme(scheme: ISKOSConceptScheme): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getNarrower(options?: IGetterOptions): Promise<Array<ISKOSConcept>>
	 {
		const results = new Array<ISKOSConcept>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#narrower");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<ISKOSConcept> semanticObject);
		}
		return results;
	}
	

	public addPrefLabel(prefLabel: ISKOSLabel): void {
		const property: string = "http://www.w3.org/2004/02/skos/core#prefLabel";
		if (prefLabel.isSemanticObjectAnonymous()) {
			this.addSemanticPropertyAnonymous(property, prefLabel);
		}
		else {
			this.connector.store(prefLabel);
			this.addSemanticPropertyReference(property, prefLabel);
		}
	}
	

	public async getPrefLabel(options?: IGetterOptions): Promise<Array<ISKOSLabel>>
	 {
		const results = new Array<ISKOSLabel>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#prefLabel");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<ISKOSLabel> semanticObject);
		}
		return results;
	}
	

	public removePrefLabel(prefLabel: ISKOSLabel): void {
		throw new Error("Not yet implemented.");
	}
	

	public addScheme(scheme: ISKOSConceptScheme): void {
		const property: string = "http://www.w3.org/2004/02/skos/core#inScheme";
		if (scheme.isSemanticObjectAnonymous()) {
			this.addSemanticPropertyAnonymous(property, scheme);
		}
		else {
			this.connector.store(scheme);
			this.addSemanticPropertyReference(property, scheme);
		}
	}
	

	public removeNarrower(narrower: ISKOSConcept): void {
		throw new Error("Not yet implemented.");
	}
	

	public async getScheme(options?: IGetterOptions): Promise<Array<ISKOSConceptScheme>>
	 {
		const results = new Array<ISKOSConceptScheme>();
		const properties = this.getSemanticPropertyAll("http://www.w3.org/2004/02/skos/core#inScheme");
		for await (const semanticId of properties) {
			const semanticObject: Semanticable | undefined = await this.connector.fetch(semanticId, options);
			if (semanticObject) results.push(<ISKOSConceptScheme> semanticObject);
		}
		return results;
	}
	

}
