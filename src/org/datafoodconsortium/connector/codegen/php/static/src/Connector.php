<?php

namespace DataFoodConsortium\Connector;

use \VirtualAssembly\Semantizer\Semantizer;
use \VirtualAssembly\Semantizer\Semanticable;
use \VirtualAssembly\Semantizer\IFactory;

class Connector implements IConnector {

    private Semantizer $semantizer;
    private Array $context;

    public function __construct() {
        $this->semantizer = new Semantizer();
        $this->setFactory(new ConnectorFactory($this));
        $this->setPrefix("dfc-b", "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#");
        $this->setPrefix("dfc-f", "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/facets.rdf#");
        $this->setPrefix("dfc-m", "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf#");
        $this->setPrefix("dfc-pt", "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/productTypes.rdf#");
        $this->setPrefix("dfc-v", "https://github.com/datafoodconsortium/taxonomies/releases/latest/download/vocabulary.rdf#");
        $this->context = ["https://www.datafoodconsortium.org"];
    }

    public function setFactory(IFactory $factory): void {
        $this->getSemantizer()->setFactory($factory);
    }

    public function getFactory(): IFactory {
        $this->getSemantizer()->getFactory();
    }

    public function setFetchFunction(\Closure $fetch): void {
        $this->getSemantizer()->setFetchFunction($fetch);
    }

    public function getFetchFunction(): \Closure {
        $this->getSemantizer()->getFetchFunction();
    }

    public function getSemantizer(): Semantizer {
        return $this->semantizer;
    }

    public function setPrefix(string $prefix, string $uri): void {
        $this->getSemantizer()->setPrefix($prefix, $uri);
    }

    public function getContext(): Array {
        return $this->context;
    }

    public function setContext(Array $context): void {
        $this->context = $context;
    }

    public function export(Array $objects, Array $context = null): string {
        $context = $context? $context: $this->context;
        return $this->getSemantizer()->export($objects, $context);
    }

    public function fetch(string $semanticId): Semanticable {
        $expanded = $this->getSemantizer()->expand($semanticId); // allow to use prefixed id, like "dfc-m:Kilogram".
        return $this->getSemantizer()->fetch($expanded);
    }

    /**
     * The data can be supplied directly as string, by passing a file
     * path, or by passing a URL.
     */
    public function import(string $data, string $baseUri = null): Array {
        return $this->getSemantizer()->import($data, $baseUri);
    }

}