<?php

/**
 * This is a template php file for your countries search.
 * Use as you will, or start over. It's up to you.
 */
header('Content-Type: application/json');
//echo json_encode(['data' => ['Your data']]);
?>
<?php
class QueryResponse
{
    public CountryData $countryData;
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

if (!empty($_POST['Name'])) {
    $name = $_POST['Name'];
    $api_url = 'https://restcountries.com/v3.1/name/' . $name;
} elseif (!empty($_POST['Full_Name'])) {
    $full_name = $_POST['Full_Name'];
    $api_url = 'https://restcountries.com/v3.1/name/' . $full_name . '?fullText=true';
} elseif (!empty($_POST['Code'])) {
    $code = $_POST['Code'];
    $api_url = 'https://restcountries.com/v3.1/alpha/' . $code;
}

$query_Response = new QueryResponse();
// Read JSON file
$json_data = file_get_contents($api_url);

// Decode JSON data into PHP array
$response_data = json_decode($json_data);

// All user data exists in 'data' object
$country_data = $response_data->Name;
//print_r($response_data);

$name = $_POST['name'];

$countries = [];
/* @var $employee country */
foreach ($response_data as $country) {
    $current = parse_Country_Data($country);
    print_r($current);
    echo "\n";
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
print_r($query_Response);
print_r(json_encode($query_Response));


function parse_Country_Data($country): CountryData
{
    $countryParsed = new CountryData();
    $countryParsed->full_name = $country->name->official;
    $countryParsed->ac2 = $country->cca2;
    $countryParsed->ac3 = $country->cca3;
    $countryParsed->flag = $country->flag;
    $countryParsed->flagPng = $country->flags->png;
    $countryParsed->region = $country->region;
    $countryParsed->subregion = $country->subregion;
    foreach ($country->languages as $language) {
        array_push($countryParsed->languages, $language);
    }

    return $countryParsed;
}

?>