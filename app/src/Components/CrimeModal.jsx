import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';

const API_IP = api_ip_conf.endpoint;

const styles = {

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

    render() {
        return (
            <div>
                 <Dialog
                    title="Dialog With Actions"
                    modal={false}
                    open={this.state.openCrimeModal}
                    onRequestClose={this.handleCloseModal}
                    >
                    {
                        this.state.selectedCrimeFull != null
                        ?
                        <div>
                        Affichage crime ici
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