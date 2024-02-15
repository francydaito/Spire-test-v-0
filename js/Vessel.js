
export class Vessel {

    constructor ( mmsi , imo , name , lat , lon , speed , heading , type ) {

        this.mmsi = mmsi ;
        this.imo = imo ; 
        this.name = name ;
        this.lat = lat ;
        this.lon = lon ;
        this.speed = speed ; 
        this.heading = heading ;
        this.type = type ;

        console.log( 'created istance' );
    }

    printConsole(){
        console.log( 
            this.mmsi + '\n' +
            this.imo  + '\n' +
            this.name  + '\n' +
            this.lat  + '\n' +
            this.lon  + '\n' +
            this.speed  + '\n' +
            this.heading  + '\n' +
            this.type  + '\n'
        )
    }
}












