const buttonSend = document.querySelector('.ip-send')

const myIcon = L.icon({
  iconUrl: './assets/icon-location.svg',
  iconSize: [40, 50],
  
})

const myMap = L.map('mapid').setView([34.08057, -118.07285], 17);
myMap.zoomControl.remove()

L.marker([34.08057, -118.07285], {icon: myIcon}).addTo(myMap)

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

buttonSend.onclick = function() {
  const userIP = document.querySelector('.ip-input')
  const IP = userIP.value

  getLocation(IP)
}

const getLocation = async (IP) => {
  const apiKEY = 'at_Yd7mTaxa7AviXSBV15z4hTyDfWKXh'
  const apiURL = `https://geo.ipify.org/api/v1?apiKey=${apiKEY}&ipAddress=${IP}`
  
  const response = await fetch(apiURL)
  const result = await response.json()

  const location = result.location
  const isp = result.isp

  console.log(location)

  putIPInfos(IP, location, isp)
  
}

const putIPInfos = (ipAddress, location, ispText) => {  
  const addressElement = document.querySelector('.address')
  addressElement.innerHTML = ipAddress
  
  const locationElement = document.querySelector('.location')
  const locationValue = `${location.city}, ${location.country} ${location.postalCode}`
  locationElement.innerHTML = locationValue

  const timezoneElement = document.querySelector('.timezone')
  const timezoneValue = `UTC ${location.timezone}`
  timezoneElement.innerHTML = timezoneValue

  const ispElement = document.querySelector('.isp')
  ispElement.innerHTML = ispText

  return renderMap(location.lat, location.lng)

}

const renderMap = (lat, lng) => {
  const newLocation = [lat, lng]
  
  myMap.eachLayer((marker) => {
    marker.remove()
    
  })
  
  myMap.setView(newLocation);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  return L.marker(newLocation, {icon: myIcon}).addTo(myMap)

}
