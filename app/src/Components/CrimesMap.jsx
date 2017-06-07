import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { withGoogleMap, GoogleMap, Marker, Map, InfoWindow } from 'google-maps-react';

import CrimeModal from './CrimeModal.jsx';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {Container, Row, Col} from 'react-grid-system';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';

const API_IP = api_ip_conf.endpoint;

const styles = {
    styleMainRow: {
        height: '100%',
        marginLeft: 15,
        marginRight: 15,
    },
    styleTableMap: {
        overflow: 'auto',
        maxHeight: '100%',
        marginTop: 15,
    },
    //en css
    styleCrimesMap: {
        width: '100%',
        height: '100%',
        marginTop: 15,
    },
}

class CrimesMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: props.userRole,
            crimeToDisplay: props.crimeToDisplay,

            selectedCrimeId: "",
            selectedCrimeFull: null,
            showingInfoWindow: false,
            openCrimeModal: false,

            currentZoom: 12,
            currentLocation: {
                lat:  42.3250286936206,
                lng: -71.0734144739058
            }
        }
        console.log("props crime : ")
        console.log(this.state.userRole)
        this.onMarkerClick = this.onMarkerClick.bind(this);
        //this.onMapClicked = this.onMapClicked.bind(this);

        this.processResponseGetCrimeById = this.processResponseGetCrimeById.bind(this);
        
        this.onHandleRowSelectionCrime = this.onHandleRowSelectionCrime.bind(this);
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
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                this.setState({
                    selectedCrimeFull: resp.crimes,
                    openCrimeModal: true
                });
            }
            else {
                console.log(resp.message)
            }
        }       
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
    onHandleRowSelectionCrime(key) {
        console.log(key);
        var selectedCrime = this.state.crimeToDisplay[key]
        this.setState({
            openCrimeModal: false,
            currentZoom: 20,
            currentLocation: {
                lat: this.extractLat(selectedCrime.location),
                lng: this.extractLng(selectedCrime.location)
            }
        })
        //Ici appel route get one crime by id
        //renvoi dans un processResponce
        //pour afficher modal crime avec info
    }

    render() {
        return ( 
            <div className={'containerMainRow'}> 
                <Row style={styles.styleMainRow}>
                    <Col lg={6} style={styles.styleTableMap}>
                        <Table
                            onRowSelection={this.onHandleRowSelectionCrime}
                        >
                            <TableHeader
                                displaySelectAll={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn>Nature code</TableHeaderColumn>
                                    <TableHeaderColumn>Description</TableHeaderColumn>
                                    <TableHeaderColumn>Weapon Type</TableHeaderColumn>
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                            >
                                {this.state.crimeToDisplay.map( (row, i) => (
                                    <TableRow key={i} value={row._id}>
                                        <TableRowColumn>{row.naturecode}</TableRowColumn>
                                        <TableRowColumn>{row.incident_type_description}</TableRowColumn>
                                        <TableRowColumn>{row.weapontype}</TableRowColumn>
                                        <TableRowColumn>{row.fromdate}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Col>
                    <Col lg={6} style={styles.styleCrimesMap}>
                        <Map google={window.google}
                            className={'map'}
                            onClick={this.onMapClicked}
                            initialCenter={{lat: 42.3250286936206,lng: -71.0734144739058}}
                            center={this.state.currentLocation}
                            zoom={this.state.currentZoom}
                        >
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
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CrimesMap;
//position={{lat: this.extractLat(row.location), lng: this.extractLng(row.location)}}