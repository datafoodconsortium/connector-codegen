<?php

namespace DataFoodConsortium\Connector;

class TestUtils {

	public static function testBlankNodeArray(array $ref, array $test): bool {
		if (count($ref) !== count($test))
			return false;
			
		$diff = function ($testValue) use($ref) {
			foreach ($ref as $refValue)
			if ($testValue->equals($refValue))
			return false;
			return true;
		};
			
		return empty(array_filter($test, $diff));
	}
		
}