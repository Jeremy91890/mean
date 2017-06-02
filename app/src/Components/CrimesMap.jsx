import React, {Component} from 'react';
import { withGoogleMap, GoogleMap, Marker, Map, InfoWindow } from 'google-maps-react';


const styles = {
    CrimesMap: {
        width: '90vw',
        height: '90vh',
    }
}

class CrimesMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestCrimes: props.latestCrimes,

            selectedPlace: "",
            showingInfoWindow: false
        }
        console.log("props crime : ")
        console.log(this.state.latestCrimes)
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }
    /*fetchPlaces(mapProps, map) {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        // ...
    }*/
    
    extractLat(location) {
        //"(42.3250286936206, -71.0734144739058)"
        var location = location.replace('(','');
        var location = location.replace(')','');
        var lat = location.split(",")[0];
        return lat;
    }

    extractLng(location) {
        var location = location.replace('(','');
        var location = location.replace(')','');
        var lng = location.split(",")[1];
        return lng;
    }

    onMarkerClick(props, marker, e) {
        console.log(props)
        console.log("click mark")
        this.setState({
            selectedPlace: {naturecode: props.title, incident_type_description: props.name},
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }


    render() {
        
        return (
            <div>
               <Map google={window.google} style={styles.CrimesMap}
                onClick={this.onMapClicked}
                initialCenter= {{lat: 42.3250286936206,lng: -71.0734144739058}}
                zoom={12}>
                    {this.state.latestCrimes.map( (row) => (
                        <Marker
                            key={row._id}
                            title={row.naturecode}
                            name={row.incident_type_description}
                            position={{lat: this.extractLat(row.location), lng: this.extractLng(row.location)}}
                            onClick={this.onMarkerClick}>
                        </Marker>
                    ))}
                    <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                        <div>
                        <h1>{this.state.selectedPlace.naturecode}</h1>
                        <h3>{this.state.selectedPlace.incident_type_description}</h3>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}

export default CrimesMap;
//position={{lat: this.extractLat(row.location), lng: this.extractLng(row.location)}}