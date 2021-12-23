import GeoMapElement from './map-element.js'
import { getNewID } from './helpers.js'


class MapPath extends GeoMapElement {
	errorCheck(){
		this.coord = this.getAttribute('coordinates')
		if(this.coord === null){
			console.warn('COORDINATES REQUIRED')
		} else {
			this.coord = JSON.parse(this.coord)
		}
	}
	async initialize(){

		const map = this.map =  this.geo_map.map

		this.id = getNewID()
			map.addSource(this.id, {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'properties': {},
				'geometry': {
					'type': 'LineString',
					'coordinates': this.coord
					}
				}
			});
			map.addLayer({
				'id': this.id,
				'type': 'line',
				'source': this.id,
				'layout': {
				'line-join': 'round',
				'line-cap': 'round'
			},
			'paint': {
				'line-color': '#888',
				'line-width': 8
			}
			});

	}

	onRemove(){
		this.map.removeLayer(this.id)
	}


}

customElements.define('map-path', MapPath)
