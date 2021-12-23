
/*

   $$$$$$\  $$$$$$$$\  $$$$$$\
  $$  __$$\ $$  _____|$$  __$$\
  $$ /  \__|$$ |      $$ /  $$ |
  $$ |$$$$\ $$$$$\    $$ |  $$ |
  $$ |\_$$ |$$  __|   $$ |  $$ |
  $$ |  $$ |$$ |      $$ |  $$ |
  \$$$$$$  |$$$$$$$$\  $$$$$$  |
   \______/ \________| \______/



  $$\      $$\  $$$$$$\  $$$$$$$\
  $$$\    $$$ |$$  __$$\ $$  __$$\
  $$$$\  $$$$ |$$ /  $$ |$$ |  $$ |
  $$\$$\$$ $$ |$$$$$$$$ |$$$$$$$  |
  $$ \$$$  $$ |$$  __$$ |$$  ____/
  $$ |\$  /$$ |$$ |  $$ |$$ |
  $$ | \_/ $$ |$$ |  $$ |$$ |
  \__|     \__|\__|  \__|\__|



  $$$$$$$$\ $$\
  $$  _____|$$ |
  $$ |      $$ |
  $$$$$\    $$ |
  $$  __|   $$ |
  $$ |      $$ |
  $$$$$$$$\ $$$$$$$$\
  \________|\________|





  GEO MAP ELEMENT

  this is a parent class that gives basic 
  error checking and initialization to 
  GEO MAP

*/




export default class GeoMapElement extends HTMLElement {
  connectedCallback(){

    this.errorCheck()
    this.geo_map = this.closest('geo-map')
    if(this.geo_map === null){
      this.innerHTML = '<h1>This component requires a geo map container</h1>'
    }
    this.map = this.geo_map.map

    this.geo_map.addEventListener('INITIALIZED', () => this.initialize())
    if(this.geo_map.initialized){this.initialize()}
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

    this.zoom = this.getAttribute('zoom')
    if(this.zoom === null){
      const zoom_error = `Error: GeoMapElements should have a zoom value. 
      Default zoom added.
        Please consult the readme for more information`
        console.warn(zoom_error)

      this.zoom = 10
    }

    this.bearing = this.getAttribute('bearing')
    if(this.bearing === null || this.bearing === ""){
      // console.warn('Could not find bearings, using the default')
      this.bearing = 80
    }

    this.pitch = this.getAttribute('pitch')
    if(this.pitch === null || this.pitch === ""){
      // console.warn('Could not find pitch, using the default')
      this.pitch = 60
    }
  }

  /*
      
      SUPERCLASS TO Get OVERRIDDEN

      This function runs every time a geo-map element
      is created
  
  */

  initialize(){

  }


  /*
    This call back is called before any element
    is removed from the DOM. Great for cleaning
    up 

  */
  onRemove(){

  }

  /*
    
    Steps through all child elements and removes 
    them, allowing for better memory management.

    Removing elements individually triggers
    each elements disconnectedCallback, wheras
    removing an element completely just runs the
    parent element's disconnectedCallback

  */

  disconnectedCallback() {
    this.onRemove()
    while(this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }

}


