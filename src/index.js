/*

    **** BEGIN ASCII ART ****

       ________________        __  ______    ____
      / ____/ ____/ __ \      /  |/  /   |  / __ \
     / / __/ __/ / / / /_____/ /|_/ / /| | / /_/ /
    / /_/ / /___/ /_/ /_____/ /  / / ___ |/ ____/
    \____/_____/\____/     /_/  /_/_/  |_/_/


    **** END ASCII ART ****

    Markup Based Map as a pure Web Component

*/



import 'https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'
import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js'
import 'https://unpkg.com/three@0.126.0/build/three.min.js'
import 'https://unpkg.com/deck.gl@^8.0.0/dist.min.js'
import  * as turf from 'https://cdn.jsdelivr.net/npm/@turf/turf'

import './helpers.js'

import './geo-map.js'
import './map-location.js'
import './map-graph.js'
import './map-arc.js'
import './map-slideshow.js'
import './map-image.js'
import './map-data.js'
import './map-path.js'
import './map-directions.js'