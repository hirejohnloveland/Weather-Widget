// Module imports
import {getLocation} from './modules/getlocation.js'
import {getTimeStamp} from './modules/gettime.js'
import {getWeather} from './modules/getweather.js'


// Module level variables
var location
var timestamp
var weather



// Produce and display the widget
window.getWeatherWidget = async function getWeatherWidget() {
  try {
  location = await getLocation()
  timestamp = await getTimeStamp(location)
  weather = await getWeather(location)
  drawWidget(location, timestamp,weather)
  
  // update the time every minute
  setInterval(timeStampUpdate, 60000) 
  // update the weather every 15 minutes
  setInterval(weatherUpdate, 900000)
  } catch{
    // If draw widget fails, erase the widget entirely
    console.log('Error - Cannot produce widget')
    eraseWidget()
  }
}


/**
 * Draws the widget on the screen in the specified elements
 * @param location location object
 * @param timestamp timestamp object
 * @param weather weather object
 */
function drawWidget (location, timestamp, weather) {
  document.getElementById('city').innerHTML = location.displayaddress
  document.getElementById('temp').innerHTML = weather.temp
  document.getElementById('forecast').innerHTML = weather.forecast
  document.getElementById('icon').src = weather.iconURL
  document.getElementById('time').innerHTML = timestamp.displaytime
  document.getElementById('date').innerHTML = timestamp.displaydate

}

/**
 * Erase the widget from the screen by elemating the text
 * of the elements 
 */
function eraseWidget () {
  document.getElementById('city').innerHTML = ""
  document.getElementById('temp').innerHTML = ""
  document.getElementById('forecast').innerHTML = ""
  document.getElementById('icon').src = ""
  document.getElementById('time').innerHTML = ""
  document.getElementById('date').innerHTML = ""
}

/**
 * Updates the time data then displays the  
 * new time on the widget
 */
async function timeStampUpdate () {  
    timestamp = await getTimeStamp(location)
    drawWidget(location, timestamp, weather)
    console.log("time updated")
}

/**
 * Updates the weather data then displays the  
 * new weather on the widget
 */
async function weatherUpdate () {  
  weather = await getWeather(location)
  drawWidget(location, timestamp, weather)
  console.log("weather updated")
}

// Event listener to call the widget on pageload
window.addEventListener('load', getWeatherWidget)





