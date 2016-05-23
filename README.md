# locationWeatherCache
Update the function save locations and remove locations 

// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
    // Save the desired location to local storage
    //localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}


var b = JSON.parse(localStorage.getItem(APP_PREFIX +"locations"));
var d = document.getElementById("locationList");
var a = "";
var indexValue = LocationWeatherCache.addLocation
var tempMax  = []





for(var i=0; i < b.length; i++){
    nickname = b[i].Nickname;


a += '<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation(0);">'
a +=                '<span class="mdl-list__item-primary-content">'
a +=                  '<img class="mdl-list__item-icon" id="icon0" src="images/loading.png" class="list-avatar" />'
a +=                  '<span>'+ nickname +'</span>'
a +=                  '<span id="weather0" class="mdl-list__item-sub-title">Weather summary</span>'
a +=                '</span>'
}
d.innerHTML = a;
