# Weather-Widget

This is a modular weather widget built in Javascript.  It uses Geolocation (or  IP addressing if the user doesn't grant permissions) to get a users location and then displays the location, time, and weather data in a nav bar.  The widget refreshes the time every minute, and the weather every fifteen minutes.  Each distinct type of API call is in a separate class / module for readability and separation of concerns, and in the event of a failed API call the widget erases itself so as not to display in an invalid state. 
