/*

      __  ______    ____
     /  |/  /   |  / __ \
    / /|_/ / /| | / /_/ /
   / /  / / ___ |/ ____/
  /_/  /_/_/  |_/_/

      ______  ______   ____________
     /  _/  |/  /   | / ____/ ____/
     / // /|_/ / /| |/ / __/ __/
   _/ // /  / / ___ / /_/ / /___
  /___/_/  /_/_/  |_\____/_____/

  MAP IMAGE

  places an image on the map according to its child coordinates



*/


import GeoMapElement from './map-element.js'
import { getNewID } from  './helpers.js'


class MapImage  extends GeoMapElement {

	initialize(){
		this.map = this.geo_map.map
		this.geo_map.map.on('style.load', () =>{
			this.addImage()
		})
	}

	addImage(){

		console.log('map image initialized', this.geo_map, this.map)

		const img_id = getNewID()
    const layer_id = getNewID()

    const img_src = this.getAttribute('src')


    const north_west_edge_el = this.querySelector('north-west-corner')
    const north_west_edge = [
    	parseFloat(north_west_edge_el.getAttribute('longitude')), 
    	parseFloat(north_west_edge_el.getAttribute('latitude'))
    ]

    const north_east_edge_el = this.querySelector('north-east-corner')
    const north_east_edge = [
    	parseFloat(north_east_edge_el.getAttribute('longitude')), 
    	parseFloat(north_east_edge_el.getAttribute('latitude'))
    ]

    const south_east_edge_el = this.querySelector('south-east-corner')
    const south_east_edge = [
    	parseFloat(south_east_edge_el.getAttribute('longitude')), 
    	parseFloat(south_east_edge_el.getAttribute('latitude'))
    ]

    const south_west_edge_el = this.querySelector('south-west-corner')
    const south_west_edge = [
    	parseFloat(south_west_edge_el.getAttribute('longitude')), 
    	parseFloat(south_west_edge_el.getAttribute('latitude'))
    ]
    console.log(img_id, img_src, this.map)
    this.map.addSource(img_id, {
      'type': 'image',
      'url': img_src,
      'coordinates': [
      north_west_edge,
      north_east_edge,
      south_east_edge,
      south_west_edge
      ]
      });
    this.map.addLayer({
      id: layer_id,
      'type': 'raster',
      'source': img_id,
      'paint': {
      'raster-fade-duration': 0
      }
    })
	}
	errorCheck(){
		this.src = this.getAttribute('src')
		if(this.src === null){
			console.error('map-image requires src')
		}
	}

}

customElements.define('map-image', MapImage )




/*
  
  Child elements

*/

/*

  @todo: figure out why Javascript won't let me
  create multiple HTMLElements from the same
  class, rewrite code to have a parent class
  at least. 


*/

class MapPosition extends HTMLElement {
  connectedCallback(){
  	this.errorCheck()
  }

   errorCheck(){
    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null){
      const latitude_error = `
        Error: GeoMapElements require a latitude value. 
        Please consult the readme for more information`
      console.error(latitude_error)
      return new Error(latitude_error)
    }

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null){
      const longitude_error = `
      Error: GeoMapElements require a longitude value. 
        Please consult the readme for more information`
        console.error(longitude_error)
      return new Error(longitude_error)
    }

  }
}




class MapPosition2 extends HTMLElement {
  connectedCallback(){
  	this.errorCheck()
  }

   errorCheck(){
    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null){
      const latitude_error = `
        Error: GeoMapElements require a latitude value. 
        Please consult the readme for more information`
      console.error(latitude_error)
      return new Error(latitude_error)
    }

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null){
      const longitude_error = `
      Error: GeoMapElements require a longitude value. 
        Please consult the readme for more information`
        console.error(longitude_error)
      return new Error(longitude_error)
    }

  }
}




class MapPosition3 extends HTMLElement {
  connectedCallback(){
  	this.errorCheck()
  }

   errorCheck(){
    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null){
      const latitude_error = `
        Error: GeoMapElements require a latitude value. 
        Please consult the readme for more information`
      console.error(latitude_error)
      return new Error(latitude_error)
    }

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null){
      const longitude_error = `
      Error: GeoMapElements require a longitude value. 
        Please consult the readme for more information`
        console.error(longitude_error)
      return new Error(longitude_error)
    }

  }
}




class MapPosition4 extends HTMLElement {
  connectedCallback(){
  	this.errorCheck()
  }

   errorCheck(){
    this.latitude = this.getAttribute('latitude')
    if(this.latitude === null){
      const latitude_error = `
        Error: GeoMapElements require a latitude value. 
        Please consult the readme for more information`
      console.error(latitude_error)
      return new Error(latitude_error)
    }

    this.longitude = this.getAttribute('longitude')
    if(this.longitude === null){
      const longitude_error = `
      Error: GeoMapElements require a longitude value. 
        Please consult the readme for more information`
        console.error(longitude_error)
      return new Error(longitude_error)
    }

  }
}
customElements.define('north-west-corner', MapPosition)
customElements.define('north-east-corner', MapPosition2)
customElements.define('south-east-corner', MapPosition3)
customElements.define('south-west-corner', MapPosition4)


