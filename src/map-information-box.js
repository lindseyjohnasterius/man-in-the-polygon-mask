/*


      __  ______    ____
     /  |/  /   |  / __ \
    / /|_/ / /| | / /_/ /
   / /  / / ___ |/ ____/
  /_/  /_/_/  |_/_/

      _____   ____________
     /  _/ | / / ____/ __ \
     / //  |/ / /_  / / / /
   _/ // /|  / __/ / /_/ /
  /___/_/ |_/_/    \____/

      ____  ____ _  __
     / __ )/ __ \ |/ /
    / __  / / / /   /
   / /_/ / /_/ /   |
  /_____/\____/_/|_|


  A basic info box that appears
  when a map location is selected

*/

import {ready} fron './helpers.js'


export class MapInformationBox extends HTMLElement {
  connectedCallback(){
  	this.geo_map = this.closest('geo-map')
  	this.innerHTML = '<h1>Found Parent Geo Map</h1>'
  	if(this.geo_map === null){
  		this.innerHTML = '<h1>This component requires a geo map container</h1>'
  	}
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

customElements.define('map-info', MapInformationBox)


