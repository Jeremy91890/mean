import React, {Component} from 'react';
import { withGoogleMap, GoogleMap, Marker, Map, InfoWindow } from 'google-maps-react';

import CrimeModal from './CrimeModal.jsx';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';

const API_IP = api_ip_conf.endpoint;

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
            crimeToDisplay: props.crimeToDisplay,

            selectedCrimeId: "",
            selectedCrimeFull: null,
            showingInfoWindow: false,
            openCrimeModal: false,
        }
        console.log("props crime : ")
        console.log(this.state.crimeToDisplay)
        this.onMarkerClick = this.onMarkerClick.bind(this);
        //this.onMapClicked = this.onMapClicked.bind(this);

        this.processResponseGetCrimeById = this.processResponseGetCrimeById.bind(this);
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
        this.getCrimeById(props.value);
    }


    getCrimeById(id){
        var API = API_IP + "/crimes/getCrime/" + id;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        getData(API, headers, this.processResponseGetCrimeById)
    }

    processResponseGetCrimeById(resp) {
        resp = resp.responseJSON;
  
        console.log(resp)
          this.setState({
            selectedCrimeFull: resp.crimes,
            openCrimeModal: true
        });
    }
/*
    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                open: false,
                activeMarker: null
            })
        }
    }
*/
    render() {
        return (
            <div>
               <Map google={window.google} style={styles.CrimesMap}
                onClick={this.onMapClicked}
                initialCenter= {{lat: 42.3250286936206,lng: -71.0734144739058}}
                zoom={12}>
                    {this.state.crimeToDisplay.map( (row) => (
                        <Marker
                            key={row._id}
                            value={row._id}
                            title={row.naturecode}
                            name={row.incident_type_description}
                            position={{lat: this.extractLat(row.location), lng: this.extractLng(row.location)}}
                            onClick={this.onMarkerClick}>
                        </Marker>
                    ))}
                    <CrimeModal selectedCrimeFull={this.state.selectedCrimeFull} openCrimeModal={this.state.openCrimeModal}/>
                </Map>
            </div>
        )
    }
}

export default CrimesMap;
//position={{lat: this.extractLat(row.location), lng: this.extractLng(row.location)}}