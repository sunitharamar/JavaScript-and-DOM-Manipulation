// Getting references
var $tbody = document.querySelector("#table-body");
var $dateInput = document.querySelector("#date-input");
var $cityInput = document.querySelector("#city-input");
var $stateInput = document.querySelector("#state-input");
var $countryInput = document.querySelector("#country-input");
var $shapeInput = document.querySelector("#shape-input");
var $submitButton = document.querySelector("#submit");

// Filtered list
var filteredSightings = dataSet;

// Set starting index and results per page
var startingIndex = 0;
var resultsPerPage = 1000;

// Rendering table
renderTable();

// Function to render table
function renderTable() {

    // Set the value of ending index
    var endingIndex = startingIndex + resultsPerPage;

    // Looping through data set
    for (let i = 0; i < filteredSightings.length; i++) {
    
        // Insert a row
        let $row = $tbody.insertRow(i);

        // Get current object & keys
        let currentSighting = filteredSightings[i];
        let fields = Object.keys(currentSighting);

        // Insert filteredSightings
        for(let j = 0; j < fields.length; j++) {
            let field = fields[j];
            let $cell = $row.insertCell(j);
            $cell.innerText = currentSighting[field];
        };
    };
};

// Event listener for submit button
$submitButton.addEventListener("click", filterInput);

// Function to filter date
function filterDate(sighting) {
    return sighting.datetime == $dateInput.value.trim().toLowerCase();
};

// Function to filter city
function filterCity(sighting) {
    return sighting.city == $cityInput.value.trim().toLowerCase();
};

// Function to filter state
function filterState(sighting) {
    return sighting.state == $stateInput.value.trim().toLowerCase();
};

// Function to filter country
function filterCountry(sighting) {
    return sighting.country == $countryInput.value.trim().toLowerCase();
};

// Function to filter shape
function filterShape(sighting) {
    return sighting.shape == $shapeInput.value.trim().toLowerCase();
};

// Function to filter input
function filterInput(event) {

    // Prevent default
    event.preventDefault();

    // Reseting data set each time button is clicked
    filteredSightings = dataSet;

    // Filters
    if ($dateInput.value) {
        filteredSightings = filteredSightings.filter(filterDate);
    };

    if ($cityInput.value) {
        filteredSightings = filteredSightings.filter(filterCity);
    };

    if ($stateInput.value) {
        filteredSightings = filteredSightings.filter(filterState);
    };

    if ($countryInput.value) {
        filteredSightings = filteredSightings.filter(filterCountry);
    };

    if ($shapeInput.value) {
        filteredSightings = filteredSightings.filter(filterShape);
    };

    if (!$dateInput && !$cityInput && !$stateInput && !$countryInput && !$shapeInput) {
        filteredSightings = dataSet;
    };

    // Reset inputs
    $dateInput.value = "";
    $cityInput.value = "";
    $stateInput.value = "";
    $countryInput.value = "";
    $shapeInput.value = "";

    // Re-render table
    $tbody.innerHTML = "";
    renderTable();
};
