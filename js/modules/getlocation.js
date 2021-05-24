const ipkey = ""
const locationIQToken = ""

class Location {
    constructor (jsonobj) {
        this.json = jsonobj
        this.latitude 
        this.longitude
        this.city
        this.state
        this.displayaddress
        this.buildLocation()
    }
    
    /**
    * Unsupported private internal method of Location class.
    * This method populates the fields of location object and
    * should only be called by the constructor method
    */
    buildLocation = async () => {
        if (this.json.coords) {
            // case if user allowed geolocation
            this.latitude = this.json.coords.latitude
            this.longitude = this.json.coords.longitude
        } else {
            // case if user did not allow geolocation and location was 
            // approximated by ipdata API
            this.latitude = this.json.latitude
            this.longitude = this.json.longitude
        }
        //Get city and state
        await this.locationIQ();
        //format for single field html display
        this.displayaddress = this.city + ", " + this.state.toUpperCase()
        
    }
    
    /**
    * Unsupported private internal method of Location class.
    * This method populates the fields of location object and
    * should only be called by the constructor method
    */
    locationIQ = async () => {
        // Acquire the city and state data from the LocationIQ API
        try{
            var locationIQ = (await getLocationIQ(this.latitude, this.longitude))
            this.city = locationIQ.data.address.city
            this.state = locationIQ.data.address.state_code
            } catch (e) {
              console.log('ERROR');
              console.log(e.message)
            }
    }

}


/**
* Returns a promise object to the caller which resolves to json location 
* data if the user approves geolocation, otherwise the promise is 
* rejected
*/
function geolocateMe() {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
}


/** 
* Returns a promise object to the caller which resolves to json Location 
* data or an error
*/
function getLocationbyIP(key) {
    return axios.get(`https://api.ipdata.co/?api-key=${key}`)
    .then(response => response.data)
    .catch(error => console.log(error))}


/**
* Returns a promise object to the caller which resolves to json location
* data or an error 
*/   
function getLocationIQ(latitude, longitude) {
    return axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${locationIQToken}&lat=${latitude}&lon=${longitude}&format=json&statecode=1`)
}


/**
* Location factory function, locates the user and returns
* a new Location 
*/  
export async function getLocation() {
    try {
      // Attempt to geolocate user
      let location = new Location(await geolocateMe())
      return location
    } catch (e) {
      console.log('ERROR');
      console.log(e.message)

      try{
          // If the user denies access to the devices location, or geoLocate() fails
          // for any other reason, recover by finding the user's approximate location 
          // via their IP address
      let location = new Location(await getLocationbyIP(ipkey))
      console.log("user denied access, approximate location determined by IP")
      return location
      } catch (e) {
        console.log('ERROR');
        console.log(e.message)
      }
  }}
