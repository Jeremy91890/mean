import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CrimesMap from '../Components/CrimesMap.jsx';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {Container, Row, Col} from 'react-grid-system';
import areIntlLocalesSupported from 'intl-locales-supported';

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
        marginLeft: '25%',
        marginRight: '25%',
    },
        styleTableMap: {
        overflow: 'auto',
        maxHeight: '100%',
        marginTop: 15,
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
            streetname: "",
            xstreetname: "",
            location: ""
        }
        this.handleChangeTextField = this.handleChangeTextField.bind(this)
        this.handleChangeFromDate = this.handleChangeFromDate .bind(this);
    }

    //Maj des states
    handleChangeTextField(event) {
        this.setState({[event.target.id]: event.target.value})
        console.log(this.state.naturecode)
     };

    handleChangeFromDate(event, date) {
        this.setState({fromdate: date});
    }

    render() {
        return (
        <div>
            <Row style={styles.styleMainRow}>
                    <Col lg={6} style={styles.styleTableMap}>
                        <TextField
                            id="compnos"
                            placeholder="compnos"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="naturecode"
                            placeholder="naturecode"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="incident_type_description"
                            placeholder="incident_type_description"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="main_crimecode"
                            placeholder="main_crimecode"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="reptdistrict"
                            placeholder="reptdistrict"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="reportingarea"
                            placeholder="reportingarea"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
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
                            id="weapontype"
                            placeholder="weapontype"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="shooting"
                            placeholder="shooting"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/> 
                        <TextField
                            id="domestic"
                            placeholder="domestic"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                    </Col>
                    <Col lg={6} style={styles.styleTableMap}>
                        <TextField
                            id="domestic"
                            placeholder="domestic"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="shift"
                            placeholder="shift"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="year"
                            placeholder="year"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="month"
                            placeholder="month"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="day_week"
                            placeholder="day_week"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="ucrpart"
                            placeholder="ucrpart"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="streetname"
                            placeholder="streetname"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="xstreetname"
                            placeholder="xstreetname"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                        <TextField
                            id="location"
                            placeholder="location"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
                    </Col>
                </Row>
        </div>
        )
    }
}


export default AddCrime;