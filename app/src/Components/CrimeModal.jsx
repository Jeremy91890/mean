import React, {Component} from 'react';

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
            thisCrimes: null,//null to props.abc
        }

    }

    render() {
        return (
            <div>
                Fake modal
            </div>
        )
    }
}

export default CrimeModal;