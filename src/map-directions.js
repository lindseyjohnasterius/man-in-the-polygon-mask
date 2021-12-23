import GeoMapElement from './map-element.js'
import { getNewID } from './helpers.js'


class MapDirections extends GeoMapElement {
	errorCheck(){
		this.start = this.querySelector('direction-start')
		this.end = this.querySelector('direction-end')
		if(this.start === null || this.end === null){
			console.warn('MAP DIRECTION ELEMENT REQUIRES BOTH A START AND AN END ELEMENT')
		}
	}
	initialize(){

		this.id = getNewID()

		fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/
			${this.start.longitude},
			${this.start.latitude};
			${this.end.longitude},
			${this.end.latitude}
			?geometries=geojson
			&steps=true
			&overview=full
			&access_token=${this.geo_map.access_token}
			`)
		.then(res => res.json())
		.then(res => {
				this.createPath(res)
		})
	}

	createPath(coordinates){

		const steps = coordinates.routes[0].legs[0].steps.map(step => {
			return step.geometry.coordinates
		})

		const path = coordinates.waypoints.map(waypoint => {
			return waypoint.location
		})



		const new_path = document.createElement('map-path')
		new_path.setAttribute('coordinates', JSON.stringify(steps.flat()))
		new_path.setAttribute('id', this.id)
		this.geo_map.appendChild(new_path)
	}

	onRemove(){
		document.querySelector(`#${this.id}`).remove()
	}

}

customElements.define('map-direction', MapDirections)

class DirectionStart extends GeoMapElement {
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

customElements.define('direction-start', DirectionStart)


class DirectionEnd extends GeoMapElement {
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

customElements.define('direction-end', DirectionEnd)
