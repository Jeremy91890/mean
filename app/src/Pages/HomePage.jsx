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

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: props.userRole,
            crimeToDisplay: null,
        }
        this.processResponseGeHundredtLatestCrimes = this.processResponseGeHundredtLatestCrimes.bind(this);

        this.onHandleCellSelectionCrime = this.onHandleCellSelectionCrime.bind(this);
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

    onHandleCellSelectionCrime(key) {
        console.log(key);
        console.log(this.state.crimeToDisplay[key]._id)
        //Ici appel route get one crime by id
        //renvoi dans un processResponce
        //pour afficher modal crime avec info
    }

    render() {
        return (
            <div>
                {
                    this.state.crimeToDisplay != null
                    ?
                    <CrimesMap crimeToDisplay={this.state.crimeToDisplay}
                        userRole={this.state.userRole}
                    />
                    :
                    <p>Chargement</p>
                }
            </div>
        )
    }
}


export default HomePage;