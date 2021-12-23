import GeoMapElement from './map-element.js'


/*



     #   #    #    ####
     #   #   # #   #   #
     ## ##  #   #  #   #
     # # #  #   #  ####
     #   #  #####  #
     #   #  #   #  #
     #   #  #   #  #



     ####     #    #####    #
      #  #   # #     #     # #
      #  #  #   #    #    #   #
      #  #  #   #    #    #   #
      #  #  #####    #    #####
      #  #  #   #    #    #   #
     ####   #   #    #    #   #

    MAP DATA

    Takes an URL of a well formed GEOJSON file, 
    converts those points into map-locations


    @todo: convert old version code to this version



*/



function convertGeoJSONEntry(point){
  console.log(point)
  return {
    latitude: point.geometry.coordinates[1], 
    longitude: point.geometry.coordinates[0],
    altitude: point.geometry.coordinates[2]
  }

}

function generateLocationDiv(story_location){

  const location = convertGeoJSONEntry(story_location)

  // earliest pure black
  // taking time


  return `
    <map-location id="story_location-${story_location.id}"
      latitude="${location.latitude}"
      longitude="${location.longitude}"
      zoom="${Math.random() * 5 + 14}"
      pitch="45"
      bearing="30"
    >
    <map-marker><h1 style="opacity:0.6; height:2em; width:2em; background-color:red; border-radius:50%; transform:scale(${story_location.properties.mag}); color:transparent; text-shadow:none;">${story_location.properties.mag}</h1></map-marker>
    <map-marker><h1 style="color:white;">${story_location.properties.mag}</h1></map-marker>
    </map-location>`
}


export default class GeoMapData extends GeoMapElement {

  errorCheck(){
    this.src = this.getAttribute('src')
    if(this.src === null){
      console.error('Map-Data component requires a src')
    }

    this.renderFunction = this.getAttribute('render')
    if(this.renderFunction === null){
      this.renderFunction = generateLocationDiv
    }
  }
  initialize(){


    fetch(this.src).then(res => res.json()).then(res => {
      console.log(res)
      let update = ''
      res.features.forEach(story_location => {
        update += this.renderFunction(story_location)
      })
      const location_container = document.createElement('div')
      location_container.innerHTML = update
      this.appendChild(location_container)
      this.geo_map.dispatchEvent(new CustomEvent('SHOW HOME'))

    })

  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('map-data', GeoMapData)


/*

old code: 

class MapData extends HTMLElement {
  connectedCallback(){
    this.style.display = 'none'
    this.src = this.getAttribute('src')
    if(this.src === null){
      const src_error = `
        Error: This element requires the attribute src to work.  
        Please consult the readme for more information`
      this.innerHTML = `<error> ${src_error} </error>`
      return new Error(src_error)
    }
    this.removeAttribute('src')
    this.initialize()
  }

  async initialize(){
    this.fetchStoriesFromURL(this.src)
  }
  
  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

  async fetchStoriesFromURL(url){
    function generateLocationDiv(story_location){
      let story_location_image = ''
      if(story_location.image_link && story_location.image_link !== 'NaN'){
        story_location_image = `<img src="${story_location.image_link}" style="width:100%; height:auto" />`   
      }
      return `
        <map-location id="story_location-${story_location.id}"
          latitude="${story_location.latitude}"
          longitude="${story_location.longitude}"
          zoom="${story_location.zoom}"
          pitch="${story_location.pitch}"
          bearing="${story_location.bearing}"
          title="${_.escape(story_location.title)}"
          originator="${story_location.originator}"
          location_name="${story_location.location}"
        >
        <h2>${story_location.location}</h2>
        ${story_location_image}
          <h1>${_.escape(story_location.title)}</h1>
          <small>Latitude:${story_location.latitude.toFixed(2)}, Longitude:${story_location.longitude.toFixed(2)}</small>
          <p><a style="text-decoration:none;" href="${story_location.description_link}" target="_blank"> ${_.escape(story_location.description)}</a></p>
          <cite><a href="${story_location.citation_link}">${_.escape(story_location.citation)}</a></cite>
        </map-location>`
    }

    fetch(url).then(res => res.json()).then(res => {
      let update = ''
      res.markers.forEach(story_location => {
        update += generateLocationDiv(story_location)
      })
      const location_container = document.createElement('div')
      location_container.innerHTML = update
      this.appendChild(location_container)
      dispatchMapEvent('SHOW HOME')
    })
  }
}

customElements.define('map-data', MapData)


*/