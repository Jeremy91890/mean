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
import {Container, Row, Col} from 'react-grid-system';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';

const API_IP = api_ip_conf.endpoint;
const styles = {
    styleMainRow: {
        height: '100%',
        marginLeft: 15,
        marginRight: 15,
    },
    styleTable: {
        overflow: 'auto',
        maxHeight: '100%',
        marginTop: 15,
    },
}

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: props.userRole,
            allValidatedUsers: null,
        }
        
        this.processResponseLoadAllValidatedUsers = this.processResponseLoadAllValidatedUsers.bind(this);
    }

    componentWillMount() {
        this.loadAllValidatedUsers();
    }

    loadAllValidatedUsers() {
        var API = API_IP + "/users/getAllUsers/";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        getData(API, headers, this.processResponseLoadAllValidatedUsers)
    }

    processResponseLoadAllValidatedUsers(resp) {
        console.log(resp)
         if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                this.setState({
                    allValidatedUsers: resp.users
                });
            }
            else {
                console.log(resp.message)
            }
        }     
    }

    render() {
        return (
            <div>
                <Row style={styles.styleMainRow}>
                    <Col lg={6}>
                    {
                        this.state.allValidatedUsers != null
                        ?
                        <div>
                            <Table>
                                <TableHeader
                                    displaySelectAll={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn>Email</TableHeaderColumn>
                                        <TableHeaderColumn>Password</TableHeaderColumn>
                                        <TableHeaderColumn>Role</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={false}
                                >
                                    {this.state.allValidatedUsers.map( (row, i) => (
                                        <TableRow key={i} value={row.email}>
                                            <TableRowColumn>{row.email}</TableRowColumn>
                                            <TableRowColumn>{row.password}</TableRowColumn>
                                            <TableRowColumn>{row.role}</TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        :
                        <p>Probleme de chargement</p>
                    }
                    </Col>
                    <Col lg={6}>
                    Ici user à valider add route get all validated false
                        <Table>
                            <TableHeader
                                displaySelectAll={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn>Email</TableHeaderColumn>
                                    <TableHeaderColumn>Role</TableHeaderColumn>
                                    <TableHeaderColumn>Validated</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                            >
                               
                                    <TableRow>
                                        <TableRowColumn>email</TableRowColumn>
                                        <TableRowColumn>role</TableRowColumn>
                                        <TableRowColumn>checkbox</TableRowColumn>
                                    </TableRow>
                                
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )       
    }
}

export default AdminPage;