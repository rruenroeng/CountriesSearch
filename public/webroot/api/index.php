<?php

/**
 * This is a template php file for your countries search.
 * Use as you will, or start over. It's up to you.
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS');
header('Content-Type: application/json');
?>
<?php
class QueryResponse
{
    var $countryData = [];
    var $regions = [];
    var $subregions = [];
}
class CountryData
{
    public string $full_name;
    public string $ac2;
    public string $ac3;
    public string $flag;
    public string $flagPng;
    public string $region;
    public string $subregion;
    public int $population;
    var $languages = [];
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

$json = utf8_encode(file_get_contents('php://input')); // Returns data from the request body

$c_json_data = json_decode($json);


if (strcmp($c_json_data[0], "Name") == 0) {
    $name = str_replace(" ", "%20", $c_json_data[1]);
    $api_url = 'https://restcountries.com/v3.1/name/' . $name;
} elseif (strcmp($c_json_data[0], "Full Name") == 0) {
    $full_name = str_replace(" ", "%20", $c_json_data[1]);
    $api_url = 'https://restcountries.com/v3.1/name/' . $full_name . '?fullText=true';
} elseif (strcmp($c_json_data[0], "Code") == 0) {
    $code = str_replace(" ", "%20", $c_json_data[1]);
    $api_url = 'https://restcountries.com/v3.1/alpha/' . $code;
}

$query_Response = new QueryResponse();
// Read JSON file
$json_data = file_get_contents($api_url);

// Decode JSON data into PHP array
$response_data = json_decode($json_data);

if ($response_data == false) {
    echo '{"found": 0}';
    exit;
}
$countries = [];

/* @var $employee country */
foreach ($response_data as $country) {
    $current = parse_Country_Data($country);

    // file_put_contents('php://stdout', json_encode($current) . "\n");
    array_push($countries, $current);
    //Regions
    if (!array_key_exists($current->region, $query_Response->regions)) {
        $query_Response->regions[$current->region] = 1;
    } else {
        $query_Response->regions[$current->region]++;
    }
    //Sub-Regions
    if (!array_key_exists($current->subregion, $query_Response->subregions)) {
        $query_Response->subregions[$current->subregion] = 1;
    } else {
        $query_Response->subregions[$current->subregion]++;
    }
}

function comparator($object1, $object2)
{
    return $object1->population < $object2->population;
}
usort($countries, 'comparator');
$query_Response->countryData = $countries;
$query_Response->found = true;
arsort($query_Response->subregions);
arsort($query_Response->regions);
echo json_encode($query_Response);


function parse_Country_Data($country): CountryData
{
    $countryParsed = new CountryData();
    $countryParsed->full_name = $country->name->official;
    $countryParsed->ac2 = $country->cca2;
    $countryParsed->ac3 = $country->cca3;
    $countryParsed->flagPng = $country->flags->png;
    if (!isset($country->region)) {
        $countryParsed->region = "???";
    } else {
        $countryParsed->region = $country->region;
    }

    if (!isset($country->subregion)) {
        $countryParsed->subregion = "???";
    } else {
        $countryParsed->subregion = $country->subregion;
    }
    $countryParsed->population = $country->population;

    foreach ($country->languages as $language) {
        array_push($countryParsed->languages, $language);
    }
    return $countryParsed;
}

?>