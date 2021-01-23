<?php

namespace App\Utilities;

function calculateGrossPrice($net, $vat){
    return $net * (1 + $vat/100);
}