import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CrimesMap from '../Components/CrimesMap.jsx';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {Container, Row, Col} from 'react-grid-system';
import areIntlLocalesSupported from 'intl-locales-supported';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {blue500, blue600, red800, white, green800} from 'material-ui/styles/colors';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const API_IP = api_ip_conf.endpoint;

const styles = {
    styleMainRow: {
        height: '100%',
        marginLeft: '10%',
        marginRight: '10%',
    },
        styleCol: {
        maxHeight: '100%',
        paddingTop: 15,
    },
};

let DateTimeFormat;

function init_date() {
    if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
        DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
        const IntlPolyfill = require('intl');
        DateTimeFormat = IntlPolyfill.DateTimeFormat;
        require('intl/locale-data/jsonp/fr');
    }
}
init_date();

class AddCrime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnackBar: false,
            messageSnackBar: "",
            colorSnackBar: red800,

            compnos: "",
            naturecode: "",
            incident_type_description: "",
            main_crimecode: "",
            reptdistrict: "",
            reportingarea: "",
            fromdate: null,
            weapontype: "",
            shooting: "",
            domestic: "",
            shift: "",
            year: "",
            month: "",
            day_week: "",
            ucrpart: "",
            lat: "",
            lng: "",
            streetname: "",
            xstreetname: "",
            location: ""
        }
        this.handleRequestCloseSnackBar = this.handleRequestCloseSnackBar.bind(this);
        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
        this.handleChangeShooting = this.handleChangeShooting.bind(this);
        this.handleChangeDomestic = this.handleChangeDomestic.bind(this);
        this.handleChangeUcrpart = this.handleChangeUcrpart.bind(this);

        this.onBtnAddCrimeClick = this.onBtnAddCrimeClick.bind(this);
        this.processResponceAddCrime = this.processResponceAddCrime.bind(this);

}

    //Ferme la snackBar
    handleRequestCloseSnackBar() {
        this.setState({
            showSnackBar: false,
        });
    };

    //Maj des states
    handleChangeTextField(event) {
        this.setState({[event.target.id]: event.target.value})
     };

    handleChangeFromDate(event, date) {
        this.setState({fromdate: date});
    }

    handleChangeShooting(event, index, value) {
        this.setState({shooting: value});
    } 
        
    handleChangeDomestic(event, index, value) {
        this.setState({domestic: value});
    }

    handleChangeUcrpart(event, index, value) {
        this.setState({ucrpart: value});
    }

    onBtnAddCrimeClick() {
        var location = "(" + this.state.lat.toString() + ", " + this.state.lng.toString() + ")";
        var API = API_IP + "/crimes/addCrime";
        var token = localStorage.getItem('authToken');
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token};
        var data = JSON.stringify({
            compnos: this.state.compnos,
            naturecode: this.state.naturecode,
            incident_type_description: this.state.incident_type_description,
            main_crimecode: this.state.main_crimecode,
            reptdistrict: this.state.reptdistrict,
            reportingarea: this.state.reportingarea,
            fromdate: this.state.fromdate,
            weapontype: this.state.weapontype,
            shooting: this.state.shooting,
            domestic: this.state.domestic,
            shift: this.state.shift,
            year: this.state.year,
            month: this.state.month,
            day_week: this.state.day_week,
            ucrpart: this.state.ucrpart,
            x: this.state.lng,
            y: this.state.lat,
            streetname: this.state.streetname,
            xstreetname: this.state.xstreetname,
            location: location
        });
        postData(API, headers, data , this.processResponceAddCrime)
    }

    processResponceAddCrime(resp) {
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                this.setState({showSnackBar: true, messageSnackBar: "Crime ajouter", colorSnackBar: green800,
                    compnos: "",
                    naturecode: "",
                    incident_type_description: "",
                    main_crimecode: "",
                    reptdistrict: "",
                    reportingarea: "",
                    weapontype: "",
                    shooting: "",
                    domestic: "",
                    shift: "",
                    year: "",
                    month: "",
                    day_week: "",
                    ucrpart: "",
                    lat: "",
                    lng: "",
                    streetname: "",
                    xstreetname: "",
                    location: ""
                });
            }
            else {
                this.setState({showSnackBar: true, messageSnackBar: resp.message, colorSnackBar: red800});
            }
        }
    }

    render() {
        return (
        <div>
            <Row style={styles.styleMainRow}>
                    <Col lg={3} style={styles.styleCol}>
                    <h1>Identification</h1>
                        <TextField 
                            id="compnos"
                            hintText="compnos"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.compnos}
                        />
                        <TextField
                            id="naturecode"
                            hintText="naturecode"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.naturecode}
                        />
                        <TextField
                            id="incident_type_description"
                            hintText="incident_type_description"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.incident_type_description}
                        />
                        <TextField
                            id="main_crimecode"
                            hintText="main_crimecode"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.main_crimecode}
                        />
                         <SelectField 
                            floatingLabelText="ucrpart"
                            value={this.state.ucrpart}
                            onChange={this.handleChangeUcrpart}
                            >
                            <MenuItem value="Part One" primaryText="Part one" />
                            <MenuItem value="Part Two" primaryText="Part two" />
                            <MenuItem value="Part three" primaryText="Part three" />
                            <MenuItem value="Other" primaryText="Other" />
                            </SelectField>
                    </Col>
                    <Col lg={3} style={styles.styleCol}>
                        <h1>Description</h1>
                        <TextField
                            id="weapontype"
                            hintText="weapontype"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.weapontype}
                        />
                        <SelectField
                            floatingLabelText="shooting"
                            value={this.state.shooting}
                            onChange={this.handleChangeShooting}
                            >
                            <MenuItem value={false} primaryText="No" />
                            <MenuItem value={true} primaryText="Yes" />
                            </SelectField>
                        <SelectField
                            floatingLabelText="domestic"
                            value={this.state.domestic}
                            onChange={this.handleChangeDomestic}
                            >
                            <MenuItem value={false} primaryText="No" />
                            <MenuItem value={true} primaryText="Yes" />
                        </SelectField>
                        <br/> <br/>
                        <TextField
                            id="reportingarea"
                            hintText="reportingarea"
                            onChange={this.handleChangeTextField}
                            type="number"
                            value={this.state.reportingarea}
                        />
                    </Col>
                    <Col lg={3} style={styles.styleCol}>
                    <h1>Date</h1>
                    <TextField
                            id="shift"
                            hintText="shift"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.shift}
                        />
                        <DatePicker
                            id="fromdate"
                            floatingLabelText="Fromdate"
                            container="dialog"
                            cancelLabel="Annuler"
                            autoOk={true}
                            DateTimeFormat={DateTimeFormat}
                            locale="fr"
                            onChange={this.handleChangeFromDate}
                            value={this.state.fromdate}
                        />
                        <TextField
                            id="year"
                            hintText="year"
                            onChange={this.handleChangeTextField}
                            type="number"
                            value={this.state.year}
                        />
                        <TextField
                            id="month"
                            hintText="month"
                            onChange={this.handleChangeTextField}
                            type="number"
                            value={this.state.month}
                        />
                        <TextField
                            id="day_week"
                            hintText="day_week"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.day_week}
                        />
                    </Col>
                    <Col lg={3} style={styles.styleCol}>
                        <h1>Place</h1>
                        <TextField
                            id="streetname"
                            hintText="streetname"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.streetname}
                        />
                        <TextField
                            id="xstreetname"
                            hintText="xstreetname"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.xstreetname}
                        />
                        <br/>
                        <br/>
                        <TextField
                            id="lat"
                            hintText="latitude"
                            onChange={this.handleChangeTextField}
                            type="number"
                            value={this.state.lat}
                        />
                        <TextField
                            id="lng"
                            hintText="longitude"
                            onChange={this.handleChangeTextField}
                            type="number"
                            value={this.state.lng}
                        />
                        <TextField
                            id="reptdistrict"
                            hintText="reptdistrict"
                            onChange={this.handleChangeTextField}
                            type="text"
                            value={this.state.reptdistrict}
                        />
                    </Col>
                </Row>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <RaisedButton onTouchTap={this.onBtnAddCrimeClick} label="Ajouter"/>
                </div>
                <Snackbar
                        open={this.state.showSnackBar}
                        message={this.state.messageSnackBar}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestCloseSnackBar}
                        bodyStyle={{textAlign: "center", backgroundColor: this.state.colorSnackBar}}
                />
        </div>
        )
    }
}


export default AddCrime;