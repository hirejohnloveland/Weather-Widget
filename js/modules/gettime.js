const timekey = ""

class Timestamp{
    constructor(jsonobj){
    this.json = jsonobj
    this.date
    this.year
    this.month
    this.day
    this.hour
    this.minute
    this.suffix = "AM"
    this.displaytime
    this.displaydate
    this.formatstring()
    }

    /**
    * Unsupported private internal method of TimeStamp class.
    * This method populates the fields of timeStamp object and
    * should only be called by the constructor method
    */
    formatstring(){
            // Split date stamp received from json object to set date
            this.date = this.json.formatted.split(" ")[0]
            let datesplit = this.date.split("-")
            this.year = datesplit[0]
            this.month = datesplit[1]
            this.day = datesplit[2]
            this.displaydate = this.month + "-" + this.day + "-" + this.year
            
            // Split date stamp received from json object to set time
            let mTime = this.json.formatted.split(" ")[1]
            let mTimeSplit = mTime.split(":")

            // Set the minutes
            this.minute = mTimeSplit[1]

            // Convert 24 hour time to 12 hour time
            this.hour = mTimeSplit[0]
            if (this.hour > 12) {
                this.hour = this.hour - 12
                this.suffix = "PM"
            }

            //Produce the display sting
            this.displaytime = this.hour + ":" + this.minute + " " + this.suffix
        }   
}

/**
* 
* Returns a promise object to the caller which resolves to timestamp JSON data or an error message 
*/
function timezoneAPI(key, location) {
    return axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&lng=${location.longitude}&lat=${location.latitude}&by=position&format=json`)
    .then(response => response.data)}


/**
* TimeStamp factory function, finds the time and returns
* a new TimeStamp 
*/  
export async function getTimeStamp (location) {  
    try {
        let timestamp = new Timestamp(await timezoneAPI(timekey,location))
        return timestamp
    } catch (e) {
    console.log('ERROR');
    console.log(e.message)
    }
}
