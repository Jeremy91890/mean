import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search'
import LocationSearching from 'material-ui/svg-icons/device/location-searching'
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

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
        height: '96%',
        marginLeft: 15,
        marginRight: 15,
    },
    styleTableMap: {
        overflow: 'auto',
        maxHeight: '94%',
        marginTop: 15,
        padding: 0,
    },
    //en css
    styleCrimesMap: {
        width: '100%',
        height: '100%',
        marginTop: 15,
        padding: 0,
    },
}

class CrimesMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: props.userRole,
            crimeToDisplay: null,

            selectedCrimeId: "",
            selectedCrimeFull: null,
            showingInfoWindow: false,
            openCrimeModal: false,

            currentZoom: 12,
            currentLocation: {
                lat:  42.3250286936206,
                lng: -71.0734144739058
            },

            showLoading: false,
        }
        console.log("props crime : ")
        console.log(this.state.userRole)
        this.onMarkerClick = this.onMarkerClick.bind(this);
        //this.onMapClicked = this.onMapClicked.bind(this);

        this.processResponseGeHundredtLatestCrimes = this.processResponseGeHundredtLatestCrimes.bind(this);
        this.processResponseGetCrimeById = this.processResponseGetCrimeById.bind(this);
        
        this.onHandleCellSelectionCrime = this.onHandleCellSelectionCrime.bind(this);

        this.btnSearchCrimeClick = this.btnSearchCrimeClick.bind(this);
        this.processResponseSearchCrimeByText = this.processResponseSearchCrimeByText.bind(this);

        this.btnClickDeleteCrime = this.btnClickDeleteCrime.bind(this);
        this.processResponceDeleteCrime = this.processResponceDeleteCrime.bind(this);
    }

    componentWillMount(){
       this.geHundredtLatestCrimes();
    }

    geHundredtLatestCrimes(){
        var API = API_IP + "/crimes/geHundredtLatestCrimes";
        var token = localStorage.getItem('authToken');
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token};
        getData(API, headers, this.processResponseGeHundredtLatestCrimes)
    }
    
    processResponseGeHundredtLatestCrimes(resp) {
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                this.setState({crimeToDisplay: resp.crimes});
            }
            else {
                console.log(resp.message)
            }
        }
    }

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

    extractDate(date) {
        var eDate = date.split('T')[0];
        return eDate;
    }

    onMarkerClick(props, marker, e) {
        this.getCrimeById(props.value);
    }

    getCrimeById(id){
        var API = API_IP + "/crimes/getCrime/" + id;
        var token = localStorage.getItem('authToken');
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token};
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

    onHandleCellSelectionCrime(key, cellNum) {
        console.log(key);
        console.log(cellNum)
        var selectedCrime = this.state.crimeToDisplay[key]
        if (cellNum == 4) {
            this.setState({
                openCrimeModal: false,
                currentZoom: 20,
                currentLocation: {
                    lat: this.extractLat(selectedCrime.location),
                    lng: this.extractLng(selectedCrime.location)
                }
            })
        }
        else {
            this.getCrimeById(selectedCrime._id)
        }
        //Ici appel route get one crime by id
        //renvoi dans un processResponce
        //pour afficher modal crime avec info
    }

    btnSearchCrimeClick() {
        var value = document.getElementById("searchCrimeField").value;
        if (value != "") {
            this.setState({showLoading: true})
            var API = API_IP + "/crimes/searchCrimeByText/";
            var token = localStorage.getItem('authToken');
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-token': token};
            var data = JSON.stringify({search: value});
            postData(API, headers, data, this.processResponseSearchCrimeByText);
        }
        else {
            this.geHundredtLatestCrimes();
        }
        
    }

    processResponseSearchCrimeByText(resp) {
        this.setState({showLoading: false})
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            console.log(resp);
            if (resp.success == true) {
                this.setState({crimeToDisplay: resp.crimes, openCrimeModal: false})
            }
            else {
                this.setState({openCrimeModal: false})
                console.log(resp.message);
            }
        }
    }

    btnClickDeleteCrime() {
        if (confirm("Supprimer ce crime ?")) {
            var API = API_IP + "/crimes/deleteCrime/" + this.state.selectedCrimeFull._id;
            var token = localStorage.getItem('authToken');
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-token': token};
            getData(API, headers, this.processResponceDeleteCrime);
        }
    }

    processResponceDeleteCrime(resp) {
        this.setState({openCrimeModal: false});
        this.btnSearchCrimeClick();
    }

    render() {
        var crimeToDisplay = this.state.crimeToDisplay;
        return ( 
            <div className={'containerMainRow'}>
                <div style={{width: '100%', textAlign: 'center'}}>
                    {this.state.showLoading ?  <LinearProgress mode="indeterminate" /> : <div style={{height: 4, width: '100%'}}></div>}
                    <TextField
                        id="searchCrimeField"
                        hintText="Search"
                    />
                    <IconButton onTouchTap={this.btnSearchCrimeClick}>
                        <ActionSearch />
                    </IconButton>
                </div>
                {
                    crimeToDisplay != null
                    ?
                    <Row style={styles.styleMainRow}>
                        <Col lg={6} style={styles.styleTableMap}>
                            <Table
                                onCellClick={this.onHandleCellSelectionCrime}
                            >
                                <TableHeader
                                    displaySelectAll={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn>Nature code</TableHeaderColumn>
                                        <TableHeaderColumn>Description</TableHeaderColumn>
                                        <TableHeaderColumn>Weapon Type</TableHeaderColumn>
                                        <TableHeaderColumn>Date</TableHeaderColumn>
                                        <TableHeaderColumn>Find</TableHeaderColumn>
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
                                            <TableRowColumn>{this.extractDate(row.fromdate)}</TableRowColumn>
                                            <TableRowColumn><IconButton><LocationSearching/></IconButton></TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Col>
                        <Col lg={6} style={styles.styleCrimesMap}>
                            <Map google={window.google}
                                className={'map'}
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
                                <CrimeModal selectedCrimeFull={this.state.selectedCrimeFull}
                                        openCrimeModal={this.state.openCrimeModal}
                                        btnClickDeleteCrime={this.btnClickDeleteCrime}
                                />
                            </Map>
                        </Col>
                    </Row>
                    :
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <h2>Aucun crime</h2>
                    </div>
                }
            </div>
        )
    }
}

export default CrimesMap;
//position={{lat: this.extractLat(row.location), lng: this.extractLng(row.location)}}