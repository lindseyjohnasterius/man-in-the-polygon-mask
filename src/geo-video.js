/*
  


*/



export class GeoMapVideo extends HTMLElement {
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

customElements.define('geo-video', GeoMapVideo)


/*

old code: 

  addVideo(video_el){

    const video_id = this.getNewID()
    const layer_id = this.getNewID()

    const video_src = video_el.getAttribute('src')

    const north_west_edge_el = video_el.querySelector('north-west-corner')
    const north_west_edge = [parseFloat(north_west_edge_el.getAttribute('longitude')), parseFloat(north_west_edge_el.getAttribute('latitude'))]

    const north_east_edge_el = video_el.querySelector('north-east-corner')
    const north_east_edge = [parseFloat(north_east_edge_el.getAttribute('longitude')), parseFloat(north_east_edge_el.getAttribute('latitude'))]

    const south_east_edge_el = video_el.querySelector('south-east-corner')
    const south_east_edge = [parseFloat(south_east_edge_el.getAttribute('longitude')), parseFloat(south_east_edge_el.getAttribute('latitude'))]

    const south_west_edge_el = video_el.querySelector('south-west-corner')
    const south_west_edge = [parseFloat(south_west_edge_el.getAttribute('longitude')), parseFloat(south_west_edge_el.getAttribute('latitude'))]

    this.map.addSource(video_id, {
      'type': 'video',
      'urls': [video_src],
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
      'source': video_id,

    }, "Reflectivity")

    this.map.setPaintProperty(
      layer_id, 'raster-opacity',1
    )

    const videoSource = this.map.getSource(video_id);
    videoSource.play();

  }


*/