<?php declare(strict_types=1);

namespace DataFoodConsortium\Connector;
use PHPUnit\Framework\TestCase;

require_once("./vendor/autoload.php");

final class TaxTest extends TestCase {

	public function testImport(): void {
        $connector = new Connector();

        $objects = $connector->import(__DIR__ . '/thesaurus/measures.json');
        $cur = $connector->getSemantizer()->fetch("https://github.com/datafoodconsortium/taxonomies/releases/latest/download/measures.rdf#CurrencyUnit");
        //echo $objects[0]->getGraph()->dump('text');
        echo $cur->getPrefLabel()[0];
    }

}