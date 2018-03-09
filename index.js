// Get references to the tbody element, input field and button
var $tbody = document.querySelector('tbody');
 

var $searchBtn = document.querySelector('#search_button');

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener('click', handleSearchButtonClick);
//document.getElementById("myForm").addEventListener("submit", handleSearchButtonClick, true);


// 
// Level 1: Automatic Table and Date Search
// Create a basic HTML web page.

// Using the ufo dataset provided in the form of a JavaScript object, 
//write code that appends a table to your web page and then adds new rows of data for each UFO sighting.

// Make sure you have a column for date/time, city, state, country, shape, and comment at the very least.
// Add an input tag to your HTML document and write JavaScript code that will search through the 
// date/time column to find rows that match user input.


// Set filteredSightings to dataSet initially
// dataSet comes from the data.js file
var filteredSightings = dataSet;

// renderTable renders the filtereSightings to the tbody
function renderTable() {


  // First clear the table body, Then iterate over all the records 
  // in filteredSightings and retrieve all the fields within each record to display as a 
  // table (by adding rows to the table body)
  $tbody.innerHTML = '';

  for (var i = 0; i < filteredSightings.length; i++) {
    // Get get the current record object and its fields
    var record = filteredSightings[i];
    var fields = Object.keys(record);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the record object, create a new cell at set its inner text to be the 
      //current value at the current record's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = record[field];
    }
  }
}

// The function hangleSearchButtonClick is the building a new table
// of filteredSightings array by filtering the entire dataSet
// using a callback filter.

function handleSearchButtonClick() {
  // Retrieve the value of various fields in the search form for processing
  // by the filter callback function
  event.preventDefault();

  var $dateInput = document.querySelector('#date');
  var $stateInput = document.querySelector('#state');
  var $countryInput = document.querySelector('#country');
  var $cityInput = document.querySelector('#city');
  var $shapeInput = document.querySelector('#shape');


  // Set filteredSightings to an array of all signting whose "state" matches the filter
  filteredSightings = dataSet.filter(function(sighting) {

    //You can just check if the variable has a truthy value or not. That means if(filterState) {}
    // if( value ) {}
    // will evaluate to true if value is not: 
    dateFound = cityFound = stateFound = countryFound = shapeFound = false;
    if ($stateInput) {
       var recordState = sighting.state.trim().toLowerCase();
       var filterState = $stateInput.value.trim().toLowerCase(); 
       if (recordState === filterState ) {
          stateFound = true;
       }
    }

    if ($dateInput) {
      var recordDate = sighting.datetime.trim();
      var filterDate = $dateInput.value.trim(); 
      if (recordDate === filterDate ) {
         dateFound = true;
      }
    }

    if ($shapeInput) {
      var recordShape = sighting.shape.trim().toLowerCase();
      var filterShape = $shapeInput.value.trim().toLowerCase(); 
      if (recordShape === filterShape ) {
         shapeFound = true;
      }
    }

    if ($countryInput) {
      var recordCountry = sighting.country.trim().toLowerCase();
      var filterCountry = $countryInput.value.trim().toLowerCase(); 
      if (recordCountry === filterCountry ) {
        countryFound = true;
      }
    }

    if ($cityInput) {
      var recordCity = sighting.city.trim().toLowerCase();
      var filterCity = $cityInput.value.trim().toLowerCase(); 
      if (recordCity === filterCity ) {
        cityFound = true;
      }
    }
    
    if ( dateFound || cityFound || stateFound || countryFound || shapeFound ) {
         return true
    }
    
    // if ( dateFound && cityFound && stateFound && countryFound && shapeFound ){
    //     return true
    // } else { 
    //     return false
    // } 

  });
  // Now that the entire data set has been filtered and filteredSightings array
  //   has been updated based on user input, render the new result set. 
  renderTable();
} // end of handleSearchButtonClick() function
renderTable(); //This executed every time the page is reloaded.

    
 