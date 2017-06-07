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
        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
        this.handleChangeShooting = this.handleChangeShooting.bind(this);
        this.handleChangeDomestic = this.handleChangeDomestic.bind(this);
        this.handleChangeUcrpart = this.handleChangeUcrpart.bind(this);

}

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
                    <Col lg={6} style={styles.styleTableMap}>
                        <TextField
                            id="weapontype"
                            placeholder="weapontype"
                            onChange={this.handleChangeTextField}
                            type="text"
                        /><br/>
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
                    </Col>
                </Row>
        </div>
        )
    }
}


export default AddCrime;