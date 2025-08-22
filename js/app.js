console.log("js loading..");

function callApi(city) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b1a7b07a8f5248e7bc370037251308&q=${city}&days=7&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            setValues(data); // call function to update UI

            const hourlyContainer = document.getElementById("hourly-forecast");
            hourlyContainer.innerHTML = ""; // clear old cards

            const current = data.current;
            const hours = data.forecast.forecastday[0].hour;
            const now = new Date().getHours();

            // Now card
            const nowCard = `
                <div class="text-center" style="min-width: 80px;">
                    <p class="mb-1">Now</p>
                    <img src="https:${current.condition.icon}" alt="icon" class="my-2" width="40"/>
                    <p class="fw-bold mb-0">${Math.round(current.temp_c)}°C</p>
                </div>
                `;
            hourlyContainer.innerHTML += nowCard;

            // Next 12 hours
            const nextHours = hours.slice(now + 1, now + 13);
            nextHours.forEach(h => {
                const timeLabel = new Date(h.time).toLocaleTimeString([], { hour: "numeric", hour12: true });
                const temp = Math.round(h.temp_c);
                const icon = "https:" + h.condition.icon;

                const card = `
                    <div class="text-center" style="min-width: 80px;">
                        <p class="mb-1">${timeLabel}</p>
                        <img src="${icon}" alt="icon" class="my-2" width="40"/>
                        <p class="fw-bold mb-0">${temp}°C</p>
                    </div>
                `;
                hourlyContainer.innerHTML += card;
            });

            // 7day Forecast
            const dailyContainer = document.getElementById("daily-forecast");
            dailyContainer.innerHTML = ""; // clear old data

            data.forecast.forecastday.slice(0, 7).forEach((day, index) => {
                // Day label
                let dayLabel = "";
                const forecastDate = new Date(day.date);
                if (index === 0) dayLabel = "Today";
                else if (index === 1) dayLabel = "Tomorrow";
                else dayLabel = forecastDate.toLocaleDateString("en-US", { weekday: "short" });

                const icon = "https:" + day.day.condition.icon;
                const conditionText = day.day.condition.text;
                const feelsLike = Math.round(day.hour[12].feelslike_c); //Feels like at 12


                // card html
                const card = `
                    <div class="d-flex justify-content-between align-items-center p-3 bg-white bg-opacity-10 rounded-3">
                        <div class="d-flex align-items-center">
                            <p class="fw-medium" style="width: 100px;">${dayLabel}</p>
                            <img src="${icon}" alt="icon" class="mx-3" width="30"/>
                            <p>${conditionText}</p>
                        </div>
                        <div class="d-flex gap-3">
                           <p class="text-light opacity-75">Feels like ${feelsLike}°C</p>
                        </div>
                    </div>
                    `;
                dailyContainer.innerHTML += card;
            });
        })
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
        let city = searchCity.value;
        console.log(city);
        callApi(city);

    }
})


// set values -------------------------
function setValues(values) {

    document.getElementById("city_name").innerText = values.location.name + ", " + values.location.region + ", " + values.location.country;
    document.getElementById("current-temp").innerText = Math.round(values.current.temp_c);
    document.getElementById("current-condition").innerText = values.current.condition.text;
    document.getElementById("current_condi_icon").src = "https:" + values.current.condition.icon;
    document.getElementById("wind").innerText = Math.round(values.current.wind_kph) + " km/h";
    document.getElementById("Humidity").innerText = Math.round(values.current.humidity) + " %";
    document.getElementById("UV").innerText = Math.round(values.current.uv);
    document.getElementById("FeelsLike").innerText = "Feels Like " + Math.round(values.current.feelslike_c) + " °C";

    document.getElementById("w_speed").innerText = Math.round(values.current.wind_kph) + " km/h";
    document.getElementById("w_speed").innerText = Math.round(values.current.wind_kph) + " km/h";
    document.getElementById("Direction").innerText = values.current.wind_dir;
    document.getElementById("hPa").innerText = values.current.pressure_mb;

    document.getElementById("Sunrise").innerText = values.forecast.forecastday[0].astro.sunrise;
    document.getElementById("Sunset").innerText = values.forecast.forecastday[0].astro.sunset;
}
callApi();




