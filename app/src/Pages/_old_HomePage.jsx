import React, {Component} from 'react';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
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
            allCrimes: null,
        }
        this.processResponseGetAllCrimes = this.processResponseGetAllCrimes.bind(this);

        this.onHandleCellSelectionCrime = this.onHandleCellSelectionCrime.bind(this);
    }

    componentWillMount(){
        this.getAllCrimes();
    }

    getAllCrimes(){
        var API = API_IP + "/crimes/geHundredtLatestCrimes";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        getData(API, headers, this.processResponseGetAllCrimes)
    }

    processResponseGetAllCrimes(resp) {
        resp = resp.responseJSON;
        this.setState({allCrimes: resp.crimes});
        console.log(resp)
    }

    onHandleCellSelectionCrime(key) {
        console.log(key);
        console.log(this.state.allCrimes[key]._id)
        //Ici appel route get one crime by id
        //renvoi dans un processResponce
        //pour afficher modal crime avec info
    }

    render() {
        return (
            <div>
                {
                    this.state.allCrimes != null
                        ?
                        <Table
                            onRowSelection={this.onHandleCellSelectionCrime}
                        >
                            <TableHeader
                                displaySelectAll={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn>Naturecode</TableHeaderColumn>
                                    <TableHeaderColumn>Description</TableHeaderColumn>
                                    <TableHeaderColumn>Weapon Type</TableHeaderColumn>
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                            >
                                {this.state.allCrimes.map( (row, i) => (
                                    <TableRow key={i} value={row._id}>
                                        <TableRowColumn>{row.naturecode}</TableRowColumn>
                                        <TableRowColumn>{row.incident_type_description}</TableRowColumn>
                                        <TableRowColumn>{row.weapontype}</TableRowColumn>
                                        <TableRowColumn>{row.fromdate}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        :
                        null

                }
            </div>
        )
    }
}

export default HomePage;