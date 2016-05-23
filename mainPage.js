// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}

// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}


// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";
var dataValue;
var publicDataObject


function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};
   

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
        return locations.length
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
        return locations[index];
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname)
    {
        var data = {
            Latitude: latitude,
            Longitude: longitude,
            Nickname: nickname,
            forecasts: {}
            
        }
        
        

      if (localStorage.length > 0){
       a = localStorage.getItem(APP_PREFIX +"locations")
       var b = JSON.parse(a)
          for(var i = 0; b.length > i; i++){
            locations.push(b[i])
        }
        
      }

        
        
        locations.push(data)
        var dataValue = JSON.stringify(locations)
        localStorage.setItem(APP_PREFIX +"locations", dataValue)
        var index = this.length() - 1
        return index
        
        
    }
    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        locations.splice(index,1)
        
        
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
        return locations;
        
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
        for(var i = 0; i< locationWeatherCachePDO;i++){
            locations.push(publicDataObject[i])
        }
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(index, date, callback) {
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
        
        
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
        var searchLocations = []
        for (var i=0; i<locations.length;i++){
            if(latitude === locations[i].Latitude && longitude === locations[i].Longitude){
                return i
            }
                else{
                    return -1
                }
            }
        }
    }

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
    locationWeatherCache = new LocationWeatherCache()
    
    //Checks the browser for local Storage. If a local storage exists, then the value with the key weatherApplocations is obtained from the local storage and destringified/parsed and then assigned to the variable private variable publicDataObject. This value is the existing cache object
    if(typeof(Storage) !== undefined){
        
        var cacheSearch = localStorage.getItem(APP_PREFIX +"locations")
        publicDataObject = JSON.parse(cacheSearch)
    }
    
    //if there is an existing cache object, the variable publicDataObject would not be null, and if it is not null then it should initalise the locationWeatherCache object from the serialised version in local storage.
    if (publicDataObject !== null){
        locationWeatherCache.initialiseFromPDO(publicDataObject)
    }
    
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
    
    
    
}
