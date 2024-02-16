
// the map is the main graphical representation

class Map {

    constructor() {
        this.map ;
        this.mapInit();
    }

    mapInit() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style:{
                'version': 8,
                'sources': {
                'raster-tiles':
                    {
                    'type': 'raster',
                    'tiles': [
                    'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    ],
                    'tileSize': 256
                    }
                },
                'layers': [
                    {
                    'id': 'simple-tiles',
                    'type': 'raster',
                    'source': 'raster-tiles',
                    'minzoom': 0,
                    'maxzoom': 20
                    }
                ]
            },
                center: [-20,-20],
                zoom: 2.5,
                scrollZoom: true
        });   
        this.map.addControl(new mapboxgl.NavigationControl());

        console.log("map has been displayed") ;
    }

    // mapAppend() places the markers on the map
    mapAppend( m ) { 
        const marker = m;
        marker.addTo(this.map);   

        const markerIcon = document.querySelector('.boatIcon');
            
        // Show the popup always to the right of the marker
        const popup = document.getElementById('popup');

        const updatePopupPosition = () => {
            const markerRect = markerIcon.getBoundingClientRect();
            const popupWidth = popup.offsetWidth;
            const offset = 10; 
            const popupLeft = markerRect.right + offset;
            const popupTop = markerRect.top + (markerRect.height - popup.offsetHeight) / 2;

            popup.style.left = `${popupLeft}px`;
            popup.style.top = `${popupTop}px`;
        };

        // Update the position of the popup when the map is resized
        this.map.on('resize', updatePopupPosition);

        // Show the popup when the cursor is over the marker
        markerIcon.addEventListener('mouseenter', () => {
            popup.style.opacity = 100;
            updatePopupPosition();
        });

        // Hide the popup when the cursor is over the marker
        markerIcon.addEventListener('mouseleave', () => {
            popup.style.opacity = 0;
        });
    }
}

// the class Map is then exported so that controller.js can import it
export default Map ;








