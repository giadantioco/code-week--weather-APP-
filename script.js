// imports
import { cities } from './data/cities.js'
import { API_KEY } from './keys.js'

// select global elements
let containerEl = document.querySelector('.weather-result')


// select list generator
const dropDownSelect = (city) => {
    // console.log(city)

    // select elements
    const selectEl = document.querySelector('.city-select')
    // create elements
    const cityEl = document.createElement('option')

    // give to created element attributes name and value
    cityEl.textContent = city.name
    cityEl.classList.add('selected-city')
    cityEl.value = city.value // the value will be utilised later on

    // append cityEl to father element
    selectEl.append(cityEl)
    // console.log(selectEl)
    
}
// generate HTML elements for each object (city) in the array cities 
// dropDownSelect(cities) -> WRONG! You cant pass an array to a function designed for a single element.. will be UNDEFINED
cities.forEach(city => dropDownSelect(city))

// API fetch with then -->
// const GET = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)

// .then(resp => {
//     if(!resp.ok) {
//         throw new Error('response: ' + resp.statusText)
//     }
//     return resp.json()
// })

// .then(data => {
//     console.log(data)
// })

// .catch(error => {
//     console.error('problematic fetch ', error)
// })

// GET()


// API call with awayt asinc --> https://api.openweathermap.org/data/2.5/weather?q=milan&appid=&{APP_KEY}

const endpoint = 'milano'

// from MDN -> 
async function fetchWeather() {
    
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${endpoint}&appid=${API_KEY}&units=metric&lang=it`);
    const data = await response.json();
    // console.log(data)

    // pass the renderWeather function to display data
    renderWeather(data);

    // updateBackground(data)

    cambiaColoreSfondo();

    // success(data)


  } 

  

  catch (error) {
    console.error(error)

    const bodyEl = document.querySelector('body')
    const loadErrTitleEl = document.createElement('h1')

    loadErrTitleEl.textContent = 'Page loading error'

    bodyEl.appendChild(loadErrTitleEl)
  }


}

  fetchWeather()

  //display weather API result on HTML
  function renderWeather(weather) {
    // console.log(weather)

    // clear the container when updating fetch
    containerEl.innerHTML = "";

    // create H2 for city name
    const cityName = document.createElement('h2')
    // create p tags for description, temperature & date
    const dayTimeEl = document.createElement('p')
    const descriptionEl = document.createElement('p')
    const temperatureEl = document.createElement('p')
    //create img tag for weather icon
    const imgEl = document.createElement('img')

    // get the API infos 
    cityName.textContent = weather.name
    dayTimeEl.textContent = weather.dt
    descriptionEl.textContent = weather.weather[0].description
    temperatureEl.textContent = `${weather.main.temp} °C`

    const iconCode = weather.weather[0].icon
    imgEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png` 
    

    // display the infos in the HTML tags just created
    containerEl.append(cityName, dayTimeEl, descriptionEl, temperatureEl, imgEl)
    // console.log(containerEl)   

    const renderDateTime = () => {
      // access the content inside element
      let dayTime = dayTimeEl.textContent;
      
      // convert dayTime to Num 
      let dayTimeToNum = Number(dayTime)
      console.log(dayTimeToNum)

      // create the data object based on the UNIX
      let date = new Date(dayTimeToNum * 1000)
      console.log(date)
      
      // render time from the dayTime var
      const hours = date.getHours()
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')

      // display time in 00:00:00 format 
      const formattedTime = `${hours} : ${minutes} : ${seconds}`
      console.log(formattedTime)

      // get only DD/MM/YY
      const onlyDate = date.toString().substring(0, 16)
      console.log(onlyDate)

      dayTimeEl.textContent = onlyDate + formattedTime
      
    }
    
    renderDateTime()

  }

  // let i = 0
  // const cityValue = cities[i].value
  // console.log(cityValue)
  
  // get cities array value out
  // WRONG!! --> need to get the value out of the option TAG!
  // const getValue = () => { 
  //   for(let i = 0; i < cities.length; i++) {
  //     const cityValue = cities[i].value
  //     console.log(cityValue)
  //   }
  // }

  // getValue()


const renderNewCity = () => {

  // select elements
  const selectEl = document.querySelector('.city-select')
  // const btnEl = document.querySelector('.submit')
  // const optionEl = document.querySelectorAll('option')
  // const opElValue = optionEl.value
    console.log(selectEl)
  
  // add CHANGE event listener bubbling on selectEl
  selectEl.addEventListener('change', (event) => {
    //target the value of optionEl 
    const clickedValue = event.target.value
    console.log(clickedValue)
    
    // if optionEl clicked
    if (clickedValue) {
     // update city var with clickedValue
      let city = clickedValue

       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=it`)
       .then((res) => res.json())
       .then((data) => {

        

        const result = data
        console.log(result)

        
        renderWeather(result)
        
       })
      
    }

  })

}
// cities.forEach(city => selectListGen(city))
renderNewCity()


// const updateBackground = (data) => {
//   // const sunriseEl = document.createElement('p') 
//   // const sunsetEl = document.createElement('p') 

//   // sunriseEl.textContent = data.sys.sunrise
//   // sunsetEl.textContent = data.sys.sunset
//   // // console.log(sunriseEl, sunsetEl)

//   // const sunriseDate = new Date(data.sys.sunrise * 1000);
//   // const sunsetDate = new Date(data.sys.sunset * 1000);

//   // console.log(`${sunriseDate.toLocaleTimeString()}`);
//   // console.log(`${sunsetDate.toLocaleTimeString()}`);

//   const currentTime = data.dt
//   const sunrise = data.sys.sunrise
//   const sunset = data.sys.sunset
//   console.log(currentTime, sunrise, sunset)

//   const checkTime = () => {
//     if (currentTime === sunrise) {
//       document.body.style.backgroundColor = 'red';  
//     } else if (currentTime === sunset) {
//       document.body.style.backgroundColor = 'black';  
//     } else {
//       document.body.style.backgroundColor = 'blue'; 
//     }
//   }

//   checkTime()

// }


// function camabia colore sfondo --> I needed to change it at the hour, not on the second! and I can get the hour directly from the current device with new Date().getHours(), without trying catching it from the API :)
function cambiaColoreSfondo() {
  // Ottieni l'ora corrente
  const oraCorrente = new Date().getHours();
  console.log(oraCorrente)
  let coloreSfondo;

  // Imposta il colore di sfondo in base all'ora corrente perché ti interessa quella non i minuti
  if (oraCorrente >= 6 && oraCorrente < 12) {                
      coloreSfondo = '#FFD700';
  } else if (oraCorrente >= 12 && oraCorrente < 18) {            
      coloreSfondo = '#87CEEB';
  } else if (oraCorrente >= 18 && oraCorrente < 21) {              
      coloreSfondo = '#FF8C00'; 
  } else {              
      coloreSfondo = '#2F4F4F'; 
  }

  // Imposta il colore di sfondo
  document.body.style.backgroundColor = coloreSfondo;
}




// trying geolocation 
if ('geolocation' in navigator) {

  console.log('Geolocation is Available');
  
  function success(position) {

    const geolocationEl = document.querySelector('.geolocation')

    console.log(position);
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    console.log(lat, lon)

    geolocationEl.addEventListener('click', function() {

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=it`)
      .then((res) => res.json())
      .then((data) => {

        renderWeather(data)
      })
    })

  }
  
  navigator.geolocation.getCurrentPosition(success);

} else {
  
  console.log('Geolocation is NOT Available');
}



// input any city
const inputNewCity = () => {

  const inputEl = document.querySelector('#city-input')
  const buttonEl = document.querySelector('#submit')

  buttonEl.addEventListener('click', function() {
    const inputValueEl = inputEl.value
    console.log(inputValueEl)

    if(inputValueEl) {
      fetchWeather(inputValueEl)
    }
  })
  // const inputValueEl = inputEl.value
  // console.log(inputValueEl)
}

inputNewCity()

