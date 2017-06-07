import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';

const API_IP = api_ip_conf.endpoint;

const styles = {
    tableHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    tableRow: {
        textAlign: 'center',
    },
    modalStyle: {
      borderRadius: 5,
      position: 'absolute',
        top: -200,
    }
};

class CrimeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openCrimeModal: false,
            selectedCrimeFull: null,
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
             openCrimeModal: props.openCrimeModal,
             selectedCrimeFull: props.selectedCrimeFull
        })
    }

    handleCloseModal() {
        console.log("a")
        this.setState({openCrimeModal: false});
    }

    //Maj du state naturecode
    handleChangeNaturecode(event) {
        this.setState({
            naturecode: event.target.value,
        });
    };

    render() {
        return (
            <div>
                 <Dialog style={styles.modalStyle}
                    title="Dialog With Actions"
                    modal={false}
                    open={this.state.openCrimeModal}
                    onRequestClose={this.handleCloseModal}
                    >
                    {
                        this.state.selectedCrimeFull != null
                        ?
                        <div>
                          <Card>
                            <CardHeader
                            title="Identification"
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <Table>
                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={styles.tableHeader}>
                                        <TableRow>
                                            <TableRowColumn style={styles.tableRow}>
                                                Compnos
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                Naturecode
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                Crime code
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                Rept district
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                Reporting area
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableHeader> 
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.compnos}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.naturecode}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.main_crimecode}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.reptdistrict}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.reportingarea}
                                            </TableRowColumn>
                                        </TableRow> 
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                         <Card>
                            <CardHeader
                            title="Places"
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                             <Table>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={styles.tableHeader}>
                                    <TableRow>
                                        <TableRowColumn style={styles.tableRow}>
                                            Year
                                        </TableRowColumn>
                                        <TableRowColumn style={styles.tableRow}>
                                            Month
                                        </TableRowColumn>
                                        <TableRowColumn style={styles.tableRow}>
                                            Day
                                        </TableRowColumn>
                                        <TableRowColumn style={styles.tableRow}>
                                            Street name
                                        </TableRowColumn>
                                        <TableRowColumn style={styles.tableRow}>
                                            Location
                                        </TableRowColumn>
                                    </TableRow>
                                </TableHeader> 
                                <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.year}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.month}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                               {this.state.selectedCrimeFull.day_week}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.streetname}
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.location}
                                            </TableRowColumn>
                                        </TableRow> 
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                        <Card>
                            <CardHeader
                            title="Crime description"
                            actAsExpander={true}
                            showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                <Table>

                                    <TableHeader adjustForCheckbox={false} displaySelectAll={false} style={styles.tableHeader}>
                                        <TableRow>
                                            <TableRowColumn style={styles.tableRow}>
                                                Weapon type
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                Shooting
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                Domestic
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                Shift
                                            </TableRowColumn>
                                            <TableRowColumn style={styles.tableRow}>
                                                UCR part
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableHeader> 
                                    <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn style={styles.tableRow}>
                                                    {this.state.selectedCrimeFull.weapontype}
                                                </TableRowColumn>
                                                <TableRowColumn style={styles.tableRow}>
                                                {this.state.selectedCrimeFull.shooting != false
                                                    ?
                                                    <p>YES</p>
                                                    :
                                                <p> NO</p>}
                                                </TableRowColumn>
                                                <TableRowColumn style={styles.tableRow}>
                                                    {this.state.selectedCrimeFull.domestic != false
                                                    ?
                                                    <p>YES</p>
                                                    :
                                                <p> NO</p>}
                                                </TableRowColumn>
                                                <TableRowColumn style={styles.tableRow}>
                                                    {this.state.selectedCrimeFull.shift}
                                                </TableRowColumn>
                                                <TableRowColumn style={styles.tableRow}>
                                                    {this.state.selectedCrimeFull.ucrpart}
                                                </TableRowColumn>
                                            </TableRow> 
                                        </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                        </div>
                        :
                        <p>Probleme de chargement</p>
                    }
                </Dialog>
            </div>
        )
    }
}

export default CrimeModal;

/*
compnos
:
"None"
day_week
:
"Monday"
domestic
:
true
fromdate
:
"2015-08-10T00:00:00.000Z"
incident_type_description
:
"Recovered Stolen Property"
location
:
"(42.3525598061323, -71.0604320748137)"
main_crimecode
:
"13xx"
month
:
8
naturecode
:
"ARREST"
reportingarea
:
116
reptdistrict
:
"A1"
shift
:
"None"
shooting
:
true
streetname
:
"ESSEX ST"
ucrpart
:
"Part Two"
weapontype
:
"None"
x
:
774984
xstreetname
:
"NULL"
y
:
2950000
year
:
2015
_id
:
"592589348db3dfcacaf83950"
*/