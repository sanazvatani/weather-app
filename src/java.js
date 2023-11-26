function refereshWeather(response){
    let temperatureElement= document.querySelector("#weather-app-temperature");
    let temperature= response.data.temperature.current;
    let cityElement= document.querySelector("#weather-app-city");
    let descriptionElement= document.querySelector("#description");
    let humidityElement= document.querySelector("#humidity");
    let windspeedElement= document.querySelector("#wind-speed");
    let timeshowElement= document.querySelector("#show-time");
    let date= new Date(response.data.time*1000);

    let iconElement= document.querySelector("#icon");

     iconElement.innerHTML= `<img  src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;


    console.log(response.data)

    timeshowElement.innerHTML=formatDate(date);
    cityElement.innerHTML = response.data.city;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    windspeedElement.innerHTML= `${response.data.wind.speed}km/h`;
    descriptionElement.innerHTML= response.data.condition.description;
    temperatureElement.innerHTML= Math.round(temperature);
}

function formatDate(date){
   
    let  minutes= date.getMinutes();
    let hours= date.getHours();
    let days= ["sunday", "monday", "tuesday", "wednseday", "thurseday", "friday", "saturday"];
    let day= days[date.getDay()];


    if (minutes<10) {
        minutes= `0${minutes}`;
    }

    return `${day} ${hours}: ${minutes}`;
}


function searchCity(city){
    //make Api call and update the interfrace
    let apikey= "b2a5adocct04b3178913oc335f405433";
    let apiurl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
    axios.get(apiurl).then(refereshWeather)
}


function handlesearchsubmit(event){
    event.preventDefault();
    let searchInput= document.querySelector("#search-city");
    //let cityElement= document.querySelector("#weather-app-city");
    //cityElement.innerHTML = searchInput.value;
    //basic search engine
    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector("#weather-app-search");
searchFormElement.addEventListener("submit", handlesearchsubmit);

searchCity("paris"); //if reload the page it just go on to show the paris
