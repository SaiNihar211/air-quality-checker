const form = document.getElementById("form");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");

const resultContainer = document.getElementById("result");

const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm2Result = document.getElementById("pm2");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;

    const url = `https://air-quality.p.rapidapi.com/history/airquality?lon=${longitude}&lat=${latitude}`;   
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c4ee0693c6msh8687874ced0cab4p10cc5djsne7c7264407a6',
            'x-rapidapi-host': 'air-quality.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let readings = data.data[0];

            // Ensure that the data exists before assigning
            if (readings) {
                aqiResult.textContent = readings.aqi ?? 'N/A';
                coResult.textContent = readings.co ?? 'N/A';
                no2Result.textContent = readings.no2 ?? 'N/A';
                o3Result.textContent = readings.o3 ?? 'N/A';
                pm2Result.textContent = readings.pm25 ?? 'N/A';
                pm10Result.textContent = readings.pm10 ?? 'N/A';
                so2Result.textContent = readings.so2 ?? 'N/A';

                // Show the result container
                resultContainer.style.display = "block";
            } else {
                console.log("No data available for the provided location.");
            }
        })
        .catch(error => {
            console.error('Error fetching air quality data:', error);
        });
});
