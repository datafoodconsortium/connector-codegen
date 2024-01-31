<?php

namespace DataFoodConsortium\Connector;

use \VirtualAssembly\Semantizer\Semantizer;
use \VirtualAssembly\Semantizer\Semanticable;

interface IConnector {

    public function export(Array $objects): string;
    public function fetch(string $semanticId): Semanticable;
    public function import(string $data, string $baseUri): Array;
    public function getSemantizer(): Semantizer;

}