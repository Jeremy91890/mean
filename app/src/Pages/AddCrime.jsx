import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CrimesMap from '../Components/CrimesMap.jsx';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';

const API_IP = api_ip_conf.endpoint;

const styles = {
};

class AddCrime extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount(){
       
    }

   
    render() {
        return (
            <div>
                edede
            </div>
        )
    }
}


export default AddCrime;