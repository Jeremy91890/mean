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
                         <p>{this.state.selectedCrimeFull._id}</p>
                        :
                        <p>Probleme de chargement</p>
                    }
                </Dialog>
            </div>
        )
    }
}

export default CrimeModal;