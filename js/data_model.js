
import { Vessel } from "./Vessel.js";;

// for this demo, only the CSV file named Spire_000 is used
// of course, the demo only works on a local server
const csvFileUrl = 'data/Spire_000.csv';

export default class DataModel {
  constructor() {
    this.mmsi_list = []; // list of all the vessel's mmsi
    this.imo_list = []; // list of all the vessel's imo
    this.vessels = []; // list of all the loaded vessels
    this.loadData();  // all the data is loaded upon opening the page
  }

  loadData() {
    // uses fetch to retrieve the content of the CSV file
    fetch(csvFileUrl)
    .then(response => response.text())
    .then(csvData => {
      // uses Papa.parse to parse the CSV data
      Papa.parse(csvData, {
        complete: (results) => {
          // the CSV data is available in results.data
          // and stored in this.data through handleCSVData() 
          this.handleCSVData(results.data);
        },
        header: true,
      });
    })
    .catch(error => console.error('Error in data retrieving', error));
  }
  
  handleCSVData( csvData ) {
    this.createVessels(csvData) ;
    console.log("Data has been loaded");
  }

  createVessels( data ){
    let i = 0 ;
    while (data[i].mmsi != null) {
      if ( !( data[i].mmsi in this.mmsi_list ) ){
        this.mmsi_list.push( data[i].mmsi );
        this.imo_list.push( data[i].imo );
        this.vessels.push( new Vessel(
                                      data[i].mmsi ,
                                      data[i].imo ,
                                      data[i].name ,
                                      data[i].latitude ,
                                      data[i].longitude ,
                                      data[i].speed ,
                                      data[i].heading ,
                                      data[i].ship_type
                                      ));
      }
      i++
    }   
  }

  getbyMmsi( mmsiValue ){
    let v = new Vessel();
    this.vessels.forEach((element) => {
      if (element.mmsi == mmsiValue){
        v =  element ;
      } 
    });
    return v ;
  }
  
  getbyImo( imoValue ){
    let v = new Vessel();
    this.vessels.forEach((element) => {
      if (element.imo == imoValue){
        v =  element ;
      } 
    });
    return v ;
  }
}
