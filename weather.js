// let countryCode = document.querySelector('.countryCode')
// let citynamemain = document.querySelector('.citynamemain')
// let mainTemp = document.querySelector('.mainTemp')
// let tempMin = document.querySelector('.tempMin')
// let tempMax = document.querySelector('.tempMax')
// let windSpeed = document.querySelector('.windSpeed')
// let degree = document.querySelector('.degree')
// let gust = document.querySelector('.gust')
// let sunrise = document.querySelector('.sunrise')
// let sunset = document.querySelector('.sunset')
// let pressure = document.querySelector('.pressure')
// let humidity = document.querySelector('.humidity')
// let seaLevel = document.querySelector('.seaLevel')
// let input = document.querySelector('input')

// let city = prompt("enter city name")
// //===
// // let handleChange = (e) => {
// //   console.log(input.value)
// // }
// // input.addEventListener('change', handleChange())
// //===
// let fetching = async () => {
//   let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=12a8706d052c4b8d12686a30a9542686`)
//   let data = await resp.json()
//   console.log(data)
//   countryCode.textContent = data.sys.country
//   citynamemain.textContent = data.name

// }

// fetching()



let countryCode = document.querySelector('.countryCode');
let citynamemain = document.querySelector('.citynamemain');
let mainTemp = document.querySelector('.mainTemp');
let tempMin = document.querySelector('.tempMin');
let tempMax = document.querySelector('.tempMax');
let windSpeed = document.querySelector('.windSpeed');
let degree = document.querySelector('.degree');
let gust = document.querySelector('.gust');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');
let pressure = document.querySelector('.pressure');
let humidity = document.querySelector('.humidity');
let seaLevel = document.querySelector('.seaLevel');
let input = document.querySelector("input");
let form = document.querySelector("form");

// -----------------------------
// FORM EVENT (NO REFRESH)
// -----------------------------
form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop refresh

    let city = input.value.trim();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetching(city);
});

// -----------------------------
// FETCH FUNCTION
// -----------------------------
let fetching = async (city) => {
    try {
        let resp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=12a8706d052c4b8d12686a30a9542686&units=metric`
        );

        let data = await resp.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        // ---- Update UI ----
        countryCode.textContent = data.sys.country;
        citynamemain.textContent = data.name;

        mainTemp.textContent = data.main.temp + "°C";
        tempMin.textContent = "min : " + data.main.temp_min + "°C";
        tempMax.textContent = "max : " + data.main.temp_max + "°C";

        windSpeed.textContent = "wind speed : " + data.wind.speed + " m/s";
        degree.textContent = "degree : " + data.wind.deg;
        gust.textContent = "gust : " + (data.wind.gust || "—");

        sunrise.textContent = 
            "sunrise : " + new Date(data.sys.sunrise * 1000).toLocaleTimeString();

        sunset.textContent = 
            "sunset : " + new Date(data.sys.sunset * 1000).toLocaleTimeString();

        pressure.textContent = "pressure : " + data.main.pressure + " hPa";
        humidity.textContent = "humidity : " + data.main.humidity + "%";
        seaLevel.textContent = "sea-level : " + (data.main.sea_level || "—");

    } catch (err) {
        console.log("Error:", err);
        alert("Something went wrong!");
    }
};
