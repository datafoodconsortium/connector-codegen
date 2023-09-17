<?php

namespace DataFoodConsortium\Connector;

use \VirtualAssembly\Semantizer\Semantizer;

interface IConnector {

    public function export(Array $objects): string;
    public function import(string $data, string $baseUri): Array;
    public function getSemantizer(): Semantizer;

}