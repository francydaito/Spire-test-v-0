
import DataModel from "./data_model.js";
import {Vessel} from "./Vessel.js";
import Map from "./map.js";

document.addEventListener('DOMContentLoaded', function() {

    const dataModel = new DataModel();
    const map = new Map();

    function handleEnter(event) {

        if (event.key === "Enter") {
            // Get the value from the input field
            const inputValue = document.getElementById('filter_input').value;

            // Check which radio button is selected
            const mmsiChecked = document.getElementById('mmsi_op').checked;
            const imoChecked = document.getElementById('imo_op').checked;

            if (inputValue != ''){
                if (mmsiChecked) {
                    console.log(inputValue + ' mmsi') ;
                    dataModel.mmsi_list.forEach(element => {
                        if (inputValue == element) {
                            const filtered_vessel = dataModel.getbyMmsi(inputValue);
                            filtered_vessel.printConsole()
                            map.mapAppend(markerMaker( filtered_vessel.lat , filtered_vessel.lon ));
                            setInfo(filtered_vessel);
                        }
                    });
                }
                if (imoChecked) {
                    console.log(inputValue + ' imo') ;                   
                    dataModel.imo_list.forEach(element => {
                        if (inputValue == element) {
                            const filtered_vessel = dataModel.getbyImo(inputValue);
                            filtered_vessel.printConsole();
                            map.mapAppend(markerMaker( filtered_vessel.lat , filtered_vessel.lon ));
                            setInfo(filtered_vessel);
                        }
                    });
                }
            }     
        }
    }

    document.getElementById('filter').addEventListener('keydown', handleEnter);
 
    // if the search is successful, a marker is generated
    function markerMaker(lat , lon){
        const oldMarker = document.querySelector('.boatIcon');
        if (oldMarker) {
            oldMarker.remove();
        }

        const el = document.createElement('div');
        el.className = 'boatIcon';
        const marker = new mapboxgl.Marker(el)
            .setLngLat([lat , lon])
            .setRotation(0);

        return marker ;
    }

    function setInfo( filtered_vessel ) {
        document.getElementById('popup_mmsi').innerHTML    = ' mmsi :  '    + filtered_vessel.mmsi;
        document.getElementById('popup_imo').innerHTML     = ' imo : '      + filtered_vessel.imo ;
        document.getElementById('popup_name').innerHTML    = ' name : '     + filtered_vessel.name.substring(0, 20) ;
        document.getElementById('popup_lat').innerHTML     = ' latitude : ' + filtered_vessel.lat.substring(0, 15) ;
        document.getElementById('popup_lon').innerHTML     = ' longitude : '+ filtered_vessel.lon.substring(0, 15) ;
        document.getElementById('popup_speed').innerHTML   = ' speed : '    + filtered_vessel.speed ;
        document.getElementById('popup_heading').innerHTML = ' heading : '  + filtered_vessel.heading ;
        document.getElementById('popup_type').innerHTML    = ' type : '     + filtered_vessel.type ;
    }
});

