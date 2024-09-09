
var city="Dhaka";
Update(city);

function weather(){
    let Input = document.getElementById('binput').value;
    Update(Input);
}
// https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=d485d9581b56343f362d8004bd8ef66e

function Update(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d485d9581b56343f362d8004bd8ef66e`;
fetch(url)
  .then((response) => {
    if(!response.ok){
        throw new Error ('City Not Found!');
    }
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    // document.getElementById('temp').innerText = data.main.temp;

    // Weather Type
    document.getElementById("type").innerText = data.weather[0].main;

    // Weather Type Image
    let icon = data.weather[0].icon;
    document.getElementById(
      "image"
    ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Country
    document.getElementById("country").innerText = data.sys.country;

    // City Name
    document.getElementById("city").innerText = data.name;

    // Temperature
    let Temp = parseFloat(data.main.temp);
    Temp -= 273.15;
    document.getElementById("temper").innerText = Temp.toFixed(2) + " °C";

    // Feels Like
    let feels = parseFloat(data.main.feels_like);
    feels -= 273.15;
    document.getElementById("feelsLike").innerText = feels.toFixed(2) + " °C";

    //  Humidity
    document.getElementById("humidity").innerText = data.main.humidity + "%";

    // TimeZone
    let timeZone = parseInt(data.timezone);
    let time = timeZone / 3600;
    if(time>0){
        document.getElementById("timeZone").innerText = `(UTC +${time})`;
    }
    else{
        document.getElementById("timeZone").innerText = `(UTC ${time})`;
    }
    

    // Sun Rise
    let rise = parseInt(data.sys.sunrise);
    let Rise = new Date(rise * 1000);
    // document.getElementById('sunRise').innerHTML = Rise;

    let formattedRise = Rise.toLocaleString("en-GB", {
      timeZone: "UTC",
      hour12: false,
    });
    document.getElementById("sunRise").innerHTML = formattedRise + " (UTC)";

    // Sun Set
    let set = parseInt(data.sys.sunset);
    let Set = new Date(set * 1000);
    // document.getElementById('sunSet').innerHTML = Set;
    let formattedSet = Set.toLocaleString("en-GB", {
      timeZone: "UTC",
      hour12: false,
    });
    document.getElementById("sunSet").innerHTML = formattedSet + " (UTC)";
  });

}
