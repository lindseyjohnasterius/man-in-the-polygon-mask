/*
      __  ______    ____
     /  |/  /   |  / __ \
    / /|_/ / /| | / /_/ /
   / /  / / ___ |/ ____/
  /_/  /_/_/  |_/_/

      __  ______    ____  __ __ __________
     /  |/  /   |  / __ \/ //_// ____/ __ \
    / /|_/ / /| | / /_/ / ,<  / __/ / /_/ /
   / /  / / ___ |/ _, _/ /| |/ /___/ _, _/
  /_/  /_/_/  |_/_/ |_/_/ |_/_____/_/ |_|

  MAP MARKER

  This is what appears on the mapbox map. To not 
  have a marker, create an empty map-marker element.

*/

export class GeoMapMarker extends HTMLElement {

  initialize(map, lng_lat){
    this.map = map
    const marker = document.createElement('span')
    marker.innerHTML = this.innerHTML
    const parent_el = this.closest('map-location')

    let rotation_alignment = this.getAttribute('alignment')
    if(rotation_alignment === null || rotation_alignment === ""){
      rotation_alignment = 'viewport'
    }

    this.marker = new mapboxgl.Marker({
      draggable: false,
      scale: 0,
      rotationAlignment: rotation_alignment,
      pitchAlignment: rotation_alignment,
      element:marker
    }).setLngLat(lng_lat)
    .addTo(this.map)  
  }

  setLngLat(new_lng_lat){
    this.marker.setLngLat(new_lng_lat)
  }
 
  disconnectedCallback() {
    this.marker.remove()
  }

  remove(){
    this.marker.remove()
  }
}

customElements.define('map-marker', GeoMapMarker)


export const default_marker_markup =  `
<svg width="4em" height="4em" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <path d="m600.09 171.43c-177.77 0-322.46 144.52-322.46 321.95 0 173.14 296.91 514.8 309.43 529.2 3.2539 3.7695 8.0547 5.9961 13.027 5.9961 4.9727 0 9.6016-2.2266 12.855-6 12.684-14.402 309.43-356.06 309.43-529.2 0-177.43-144.52-321.94-322.29-321.94zm0 490.63c-92.914 0-168.52-75.773-168.52-168.69 0-92.742 75.602-168.34 168.52-168.34 92.742 0 168.34 75.602 168.34 168.34 0 92.914-75.602 168.69-168.34 168.69z" fill="#ff814a"/>
</svg>`

