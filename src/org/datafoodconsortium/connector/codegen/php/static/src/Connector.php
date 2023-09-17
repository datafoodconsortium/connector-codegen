<?php

namespace DataFoodConsortium\Connector;

use \VirtualAssembly\Semantizer\Semantizer;
use \VirtualAssembly\Semantizer\IFactory;
use \VirtualAssembly\Semantizer\SemanticObjectAnonymous;

class Connector implements IConnector {

    private Semantizer $semantizer;
    private Array $context;

    public function __construct() {
        $this->semantizer = new Semantizer();
        $this->setFactory(new ConnectorFactory($this));
        //$this->semantizer->setFactory(new ConnectorFactory($this));
        // HACK: dfc should be renamed in dfc-b to comply with the UML term.
        // EasyRdf does not allow to use hyphen in prefix but it should.
        // A work in progress is here: https://github.com/sweetrdf/easyrdf/issues/32.
        $this->setPrefix("dfc", "https://github.com/datafoodconsortium/ontology/releases/latest/download/DFC_BusinessOntology.owl#");

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

    /**
     * The data can be supplied directly as string, by passing a file
     * path, or by passing a URL.
     */
    public function import(string $data, string $baseUri = null): Array {
        return $this->getSemantizer()->import($data, $baseUri);
    }

}