/*

     __________  ____  ______
    / ____/ __ \/ __ \/ ____/
   / /   / / / / /_/ / __/
  / /___/ /_/ / _, _/ /___
  \____/\____/_/ |_/_____/

  GEO MAP CORE

  Generates the GEO-MAP component that holds
  all child elements. 

*/

import {ready, getURLValues, setURLValues, debounce } from './helpers.js'
import  SlideShowControls  from './map-slideshow.js'

export class GeoMap extends HTMLElement {
  
  /*
    
    CONNECTED CALL BACK

    this runs when the div is attached to the dom

  */

  connectedCallback(){
    if(typeof(mapboxgl) === 'undefined'){
      this.innerHTML = '<error>STORY MAP REQUIRES MAPBOXGL TO WORK: https://docs.mapbox.com/mapbox-gl-js/api/</error>'
    }
    const URLvalues = getURLValues()

    /*
      @todo: check if URL values are malformed

    */
  
    this.access_token = this.getAttribute('accesstoken')
    if(this.access_token === null){
      const access_token_error = `
        Error: Story Map requires a Mapbox access token. 
        Please consult the readme for more information`
      this.innerHTML = `<error> ${access_token_error} </error>`
      return new Error(access_token_error)
    }
    this.removeAttribute('accesstoken')
    mapboxgl.accessToken = this.access_token

    // Initial Location, set in Map Attributes

    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null) this.latitude = 0
    this.latitude = URLvalues.latitude ? URLvalues.latitude : this.latitude

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null) this.longitude = 0
    this.longitude = URLvalues.longitude ? URLvalues.longitude : this.longitude

    this.zoom = this.getAttribute('zoom')
    if(this.zoom === null) this.zoom = 1
    this.zoom = URLvalues.zoom ? URLvalues.zoom : this.zoom

    this.bearing = this.getAttribute('bearing')
    if(this.bearing === null) this.bearing = 0
    this.bearing = URLvalues.bearing ? URLvalues.bearing : this.bearing

    this.pitch = this.getAttribute('pitch')
    if(this.pitch === null) this.pitch = 0
    this.pitch = URLvalues.pitch ? URLvalues.pitch : this.pitch

    this.popups = this.getAttribute('popups')
    if(this.popups === null){
      this.popups = false} 
    else {
      this.popups = true
    }

    this.orbit = this.getAttribute('orbit')
    if(this.orbit === null){
      this.orbit = false
    } else {
      this.orbit = true
    }

    this.no_sky = this.getAttribute('no-sky')
    if(this.no_sky === null){
      this.no_sky = false
    } else {
      this.no_sky = true
    }

    this.home_coord = {
      center:[this.longitude, this.latitude],
      zoom:this.zoom,
      pitch: this.pitch,
      bearing: this.bearing
    }
    this.styleurl = this.getAttribute('styleurl')
    if(this.styleurl === null || this.styleurl === ""){
      console.warn('could not find style url, using the default')
      this.styleurl = 'mapbox://styles/mapbox/streets-v11'
    }
    this.removeAttribute('styleurl')

    this.locked = this.getAttribute('locked')
    if(this.locked === null){
      this.locked = false
    } else {
      this.locked = true
    }

    this.slideshow = this.getAttribute('slideshow')

  	ready(() => this.initialize())
  }

  /*
        _____   ___________________    __    _________   ______
       /  _/ | / /  _/_  __/  _/   |  / /   /  _/__  /  / ____/
       / //  |/ // /  / /  / // /| | / /    / /   / /  / __/
     _/ // /|  // /  / / _/ // ___ |/ /____/ /   / /__/ /___
    /___/_/ |_/___/ /_/ /___/_/  |_/_____/___/  /____/_____/

    you can call this function using super() in your own div, 
    or just override it

  */

  initialize(){  

    const el = document.createElement('map-container')
    this.appendChild(el)
    this.map = new mapboxgl.Map({
      container: el, // container ID
      style: this.styleurl, // style URL
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
      bearing: this.bearing,
      pitch: this.pitch,
      style: this.styleurl,
      interactive: !this.locked
    })

    this.geocoder = this.getAttribute('geocoder')
    if(this.geocoder !== null){   
      if(typeof(MapboxGeocoder) === 'undefined'){
        this.innerHTML = `If you would like to use the geocoder element, 
        you must include the geocoder plugin in your HTML: 
        https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/`
        return
      } 
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        zoom: 18,
        marker: false,
        placeholder: 'Search for an Address'
      })
      geocoder.on('result', (e) => { this.geocoderResult(e) })
      this.map.addControl( geocoder )
    } // end GeoCoder

    this.geolocate = this.getAttribute('geolocate')
    if(this.geolocate !== null){
      this.map.addControl(new mapboxgl.GeolocateControl({
        showAccuracy: false,
        showUserLocation: false
      }))
    }

    
    this.navigation_control = this.getAttribute('navigation')
    if(this.navigation_control !== null){
      this.map.addControl(
        new mapboxgl.NavigationControl({visualizePitch: true})
      )
    }

    if(this.slideshow !== null){
      this.map.addControl(new SlideShowControls(this.map, this.geo_map))
    }


    this.map.on('load', () => {this.mapLoaded()})
  }

  /*
    
    For easy styling, use .near, .middle and .far
    in the css files

  */

  setZoomClass(){
    if(this.zoom < 10){
      this.classList.add('far')
      this.classList.remove('middle')
      this.classList.remove('near')
    } else if(this.zoom >= 10 && this.zoom <= 15){
      this.classList.add('middle')
      this.classList.remove('far')
      this.classList.remove('near')
    } else {
      this.classList.add('near')
      this.classList.remove('middle')
      this.classList.remove('far')
    }
  }

  /*
    
    MAP LOADED
    runs when the mapbox map
    is done initializing

  */

  mapLoaded(){


    this.map.on('moveend', (e) => {
      if(this.orbiting) return
      let center  = this.map.getCenter()
      this.longitude = center.lng
      this.latitude = center.lat
      this.zoom = this.map.getZoom()
      this.bearing = this.map.getBearing()
      this.pitch = this.map.getPitch()

      this.setZoomClass()

      const new_pos = {
        latitude: this.latitude, 
        longitude: this.longitude,
        zoom: this.zoom,
        bearing: this.bearing, 
        pitch: this.pitch,
      }


      debounce(setURLValues(new_pos), 10000)
    })//end moveend

    window.history.pushState({page: 1}, "", "");
    window.addEventListener('popstate', () => {
      const new_location = getURLValues()
      this.map.flyTo({
        center: [new_location.longitude, new_location.latitude],
        zoom: new_location.zoom,
        bearing: new_location.bearing,
        pitch: new_location.pitch
      })
    })


    this.dispatchEvent(new CustomEvent('INITIALIZED'))
    this.initialized = true

  }


  // static get observedAttributes() {
  //   return [];
  // }

  // attributeChangedCallback(name, old_value, new_value){
  //   switch(name){
  //     default:
  //   }
  // }

}

customElements.define('geo-map', GeoMap)


