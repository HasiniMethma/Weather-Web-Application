console.log("js loading..");

function callApi(data) {
    fetch("http://api.weatherapi.com/v1/forecast.json?key=b1a7b07a8f5248e7bc370037251308&q=colombo&days=7&aqi=no&alerts=no")
        .then(response => response.json())
        .then(data => setValues(data));
}
callApi();

// set date----------------------------- 
let today = new Date;
console.log(today);

formatData = {
    "weekday": `long`,
    "month": `long`,
    "year": `numeric`,
    "day": `numeric`
}
let currentDate = today.toLocaleDateString("en-US", formatData);
document.getElementById("current-date").innerText = currentDate;
console.log(currentDate);


// get enter value----------------------
let searchCity = document.getElementById("txtSearch");

searchCity.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        console.log(searchCity.value);
    }
})


// set values -------------------------

function setValues(values) {
    document.getElementById("city_name").innerText = values.location.name + ", " + values.location.region + ", " + values.location.country;
    document.getElementById("current-temp").innerText = Math.round(values.current.temp_c);
    document.getElementById("current-condi-icon").src = "https:" + values.current.condition.icon;
    document.getElementById("current-condition").innerText = values.current.condition.text;
    document.getElementById("Feels-like").innerText = "Feels like "+Math.round(values.current.feelslike_c)+" °C";


}
callApi();



