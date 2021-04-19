const userIP = document.querySelector('.input')
const buttonSend = document.querySelector('form')

const map = L.map('mapid')
map.zoomControl.remove()

const myIcon = L.icon({
  iconUrl: './assets/icon-location.svg',
  iconSize: [40, 50],
  
})

buttonSend.addEventListener('submit', event => {
  const IP = userIP.value

  event.preventDefault()
  return getLocation(IP)

})

const getLocation = async (IP = '') => {
  const apiKEY = 'at_Yd7mTaxa7AviXSBV15z4hTyDfWKXh'
  const apiURL = `https://geo.ipify.org/api/v1?apiKey=${apiKEY}&ipAddress=${IP}`
  
  try {
    let response = await fetch(apiURL)
    let result = await response.json()

    if ( result.ip === undefined ) return errorState()

    userIP.value = result.ip
    userIP.placeholder = 'Search for any IP address or domain'

    return putIPInfos(result.ip, result.location, result.isp)

  } catch (err) {
    errorState()
    return console.log('Request Failed', err)

  }
}

const putIPInfos = (ipAddress, location, ispText) => {
  userIP.classList.remove('input--state-error')

  const addressElement = document.querySelector('.address')
  addressElement.innerHTML = ipAddress
  
  const locationElement = document.querySelector('.location')
  locationElement.innerHTML = `${location.city}, ${location.country} ${location.postalCode}`

  const timezoneElement = document.querySelector('.timezone')
  timezoneElement.innerHTML = `UTC ${location.timezone}`

  const ispElement = document.querySelector('.isp')
  ispElement.innerHTML = ispText

  return renderMap(location.lat, location.lng)
}

const renderMap = (lat, lng) => {
  const newLocation = [lat, lng]
  
  L.marker([34.08057, -118.07285], {icon: myIcon}).addTo(map)
  
  map.eachLayer(marker => marker.remove())
  map.setView(newLocation, 17);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: false})
  .addTo(map);
  
  return L.marker(newLocation, {icon: myIcon}).addTo(map)

}

const errorState = () => {
  userIP.classList.add('input--state-error')
  userIP.placeholder = "Please use a valid IP address"
  userIP.value = ""
}
