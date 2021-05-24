const weatherkey = ""

export class Weather {
    constructor(jsonobj){
    this.json = jsonobj
    this.temp
    this.city
    this.forecast
    this.icon
    this.iconURL
    this.parse()
    }

    /**
    * Unsupported private internal method of TimeStamp class.
    * This method populates the fields of timeStamp object and
    * should only be called by the constructor method
    */
    parse () {
        this.temp = Math.round(this.json.main.temp) + "°F"
        this.city = this.json.name
        this.forecast = this.toTitleCase(this.json.weather[0]['description'])
        this.icon = this.json.weather[0]['icon']
        this.iconURL = `http://openweathermap.org/img/wn/${this.icon}@2x.png`
    }
    /**
    * Unsupported private internal method of TimeStamp class.
    * This method populates converts a string to title case
    */
    toTitleCase = (str) =>  {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        )
      }
}

/**
* 
* Returns a promise object to the caller which resolves to Weather JSON data or an error message 
*/
export function weatherAPI(location) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherkey}&units=imperial`)
    .then(response => response.data)
    .catch(error => console.log(error))}


/**
* Weather factory function, finds the time and returns
* a new Weather object
*/  
export async function getWeather(location) {
  try {
    let weather = new Weather(await weatherAPI(location))
    return weather
  } catch (e) {
    console.log('ERROR');
    console.log(e.message)
  }}