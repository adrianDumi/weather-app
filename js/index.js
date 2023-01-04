let mapping = {
    "nori": [1,4,5,6,7,8,9,10,11,12,19,40,41,42,43,44,45,46,47,48,49,],
    "ploaie": [13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,
              32,33,34,35,36,37,38,39,50,51,52,53,54,55,56,57,58,59,60,
              61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,
              80,81,82,83,84,85,86,87,88,89,90,91,99],
    "sun": [0,2,]
}
let data = {
    "weatherImage": "ploaie",
    "temperature": 25,
    "precipitation": 12,
    "humidity":59,
    "wind":35,
    "location": {
        "Sacueni": "Sacueni",
        "Targoviste": "Targoviste",
        "Bucuresti": "Bucuresti",
        "Resita": "Resita",
        "Oravita": "Oravita",
        "Stinapari": "Stinapari"
    },
    "dayWeek": "Friday 11:00",
    "sky": "Cloud",
    "information": [
        {
            "time": "10:00",
            "day": "Tue",
            "image": "ploaie",
            "temperature": "22°8°"
        },
        {
            "time": "10:00",
            "day": "Fri",
            "image": "ploaie",
            "temperature": "22°8°"
        },
        {
            "time": "10:00",
            "day": "FriS",
            "image": "nori",
            "temperature": "22°8°"
        },
        {
            "time": "10:00",
            "day": "Fri",
            "image": "sun",
            "temperature": "22°8°"
        },
        {
            "time": "10:00",
            "day": "Sat",
            "image": "sun",
            "temperature": "22°8°"
        },
        {
            "time": "10:00",
            "day": "Sun",
            "image": "ploaie",
            "temperature": "22°8°"
        },
        {
            "time": "10:00",
            "day": "Mon",
            "image": "sun",
            "temperature": "22°8°"
        },
    
    ],
    "latSacueni": "44.9107",
    "longSacueni": "25.5699",
    "latTargoviste": "44.9231",
    "longTargoviste": "25.4594",
    "latBucuresti": "44.4268",
    "longBucuresti": "26.0931",
    "latResita": "45.3060",
    "longResita": "21.8854",
    "latOravita": "45.0381",
    "longOravita": "21.6860",
    "latStinapari": "45.0381",
    "longStinapari": "21.6860"
}

let currentCity;

function loadData() {
    $('#weather-image').attr('src', 'images/'+data.weatherImage+'.png');
    $('#temp').text(data.temperature);
    $('#precipitation').text(data.precipitation);
    $('#humidity').text(data.humidity);
    $('#wind').text(data.wind);
    $('#location').text(data.location[currentCity]);
    $('#dayWeek').text(data.dayWeek);
    $('#sky').text(data.sky);
    
    let info1 = data.information.slice(0,4);
    let info2 = data.information.slice(4);

    let info1Array = info1.map(function(info) {
        return `<div class="col-3">
            <div class="text-center text-small">${info.time}</div>
            <div class="mt-2 w-75 m-auto">
                <div class="text-center">${info.day}</div>
                <div class="mx-auto width-50 height-50">
                    <img class="w-100 h-auto" src="images/${info.image}.png" />
                </div>
                <div class="text-center">${info.temperature}</div>
            </div>
        </div>`;
    });
    let info1String = info1Array.join('');
    let info1Ref = document.querySelector('#info-1');
    info1Ref.innerHTML = info1String;

    let info2Array = info2.map(function(info) {
        return `<div class="col-3">
            <div class="text-center text-small">${info.time}</div>
            <div class="mt-2 w-75 m-auto">
                <div class="text-center">${info.day}</div>
                <div class="mx-auto width-50 height-50">
                    <img class="w-100 h-auto" src="images/${info.image}.png" />
                </div>
                <div class="text-center">${info.temperature}</div>
            </div>
        </div>`;
    });
    let info2String = info2Array.join('');
    let info2Ref = document.querySelector('#info-2');
    info2Ref.innerHTML = info2String;
}
function adaugiZero(number) {
    if (number < 10) {
        number = '0'+ number;
    }
    return number;
}

function updateCity(location) {
    $('#currentC').text(location);
    currentCity = location;
}
function getWeather1() {
    if (currentCity === 'Sacueni') {
        getWeather(data.latSacueni, data.longSacueni);
    }
    if (currentCity === 'Targoviste') {
        getWeather(data.latTargoviste, data.longTargoviste);
    }
    if (currentCity === 'Bucuresti') {
        getWeather(data.latBucuresti, data.longBucuresti);
    }
    if (currentCity === 'Resita') {
        getWeather(data.latResita, data.longResita);
    }
    if (currentCity === 'Oravita') {
        getWeather(data.latOravita, data.longOravita);
    }
    if (currentCity === 'Stinapari') {
        getWeather(data.latStinapari, data.longStinapari);
    }
}
function getWeather(lat, long) {
    let url = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+long+'&current_weather=true&daily=temperature_2m_max,weathercode,precipitation_sum&timezone=EET&hourly=relativehumidity_2m';
    $.ajax(url)
    .done(function(response){
        let responseTemperatures = response.daily.temperature_2m_max;
        data.temperature = responseTemperatures[0];
        data.information.map(function(info, index){
            info.temperature = responseTemperatures[index];
            return info;
        });
        let responsePrecip = response.daily.precipitation_sum;
        data.precipitation = responsePrecip[0];
        let responseHumidity = response.hourly.relativehumidity_2m;
        let humiditySlice = responseHumidity.slice(0,24);
        let sum = 0;
        humiditySlice.forEach(function(number) {
            sum = sum + number;
        });
        data.humidity = parseInt(sum / 24);
        data.wind = response.current_weather.windspeed;
        let ziuaArray = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let azi = new Date();
        let ziua = azi.getDay();
        let arrayLength = ziuaArray.length;
        let arrayPrim = ziuaArray.slice(0,ziua);
        let arrayDoi = ziuaArray.slice(ziua);
        let arrayDoiPrim = arrayDoi.concat(arrayPrim);
        data.information.map(function(info, index){
            info.day = arrayDoiPrim[index];
            return info;
        });
        let hour = azi.getHours();
        let minutes = azi.getMinutes();
        let ziuaArray2 = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let hourMinutes =  adaugiZero(hour) +':'+ adaugiZero(minutes);
        let actualTime = ziuaArray2[ziua] +' '+ hourMinutes;
        data.dayWeek = actualTime;
        data.information.map(function(info, index){
            info.time = hourMinutes;
            return info;
        });
        mapping.nori.forEach(function(code) {
            if (code === response.current_weather.weathercode) {
                data.weatherImage = 'nori';
                data.sky = 'Cloud';
            }
        });
        mapping.ploaie.forEach(function(code) {
            if (code === response.current_weather.weathercode) {
                data.weatherImage = 'ploaie';
                data.sky = 'Rain';
            }
        });
        mapping.sun.forEach(function(code) {
            if (code === response.current_weather.weathercode) {
                data.weatherImage = 'sun';
                data.sky = 'Sun';
            }
        });
        data.information.map(function(info, index){
            let amActualizat = false;
            mapping.nori.forEach(function(code) {
                if (code === response.daily.weathercode[index]) {
                    info.image = 'nori';
                    amActualizat = true;
                }
            });
            if (amActualizat) {
                return info;
            }
            mapping.ploaie.forEach(function(code) {
                if (code === response.daily.weathercode[index]) {
                    info.image = 'ploaie';
                    amActualizat = true;
                }
            });
            if (amActualizat) {
                return info;
            }
            mapping.sun.forEach(function(code) {
                if (code === response.daily.weathercode[index]) {
                    info.image = 'sun';
                }
            });
            return info;
        });
        loadData();
    })
    .fail(function(error){
        console.log('response FAILURE');
    });
}
updateCity('Sacueni');
getWeather1();