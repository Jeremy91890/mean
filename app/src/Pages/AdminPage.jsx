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
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {blue500, blue600, red800, white, green800} from 'material-ui/styles/colors';
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
            allNonValidatedUsers: null,

            showSnackBar: false,
            messageSnackBar: "",
            colorSnackBar: red800,
        }
        
        this.processResponseLoadAllValidatedUsers = this.processResponseLoadAllValidatedUsers.bind(this);
        this.processResponseLoadAllNonValidatedUsers = this.processResponseLoadAllNonValidatedUsers.bind(this);

        this.processResponseValidateUser = this.processResponseValidateUser.bind(this);
    }

    componentWillMount() {
        this.loadAllValidatedUsers();
        this.loadAllNonValidatedUsers();
    }

    loadAllValidatedUsers() {
        var API = API_IP + "/users/getAllUsersValidated/";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        getData(API, headers, this.processResponseLoadAllValidatedUsers)
    }

    processResponseLoadAllValidatedUsers(resp) {
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

    loadAllNonValidatedUsers() {
        var API = API_IP + "/users/getAllUsersNonValidated/";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        getData(API, headers, this.processResponseLoadAllNonValidatedUsers)
    }

    processResponseLoadAllNonValidatedUsers(resp) {
        console.log(resp)
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                this.setState({
                    allNonValidatedUsers: resp.users
                });
            }
            else {
                console.log(resp.message)
            }
        }     
    }

    deleteUserBtnClick(user) {
        //message de validation (alert)
    }

    processResponseDeleteUser(resp) {
        
    }


    validateUser(user) {
        var API = API_IP + "/users/validateUser/";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        var data = JSON.stringify({email: user.email});
        postData(API, headers, data, this.processResponseValidateUser)
    }

    processResponseValidateUser(resp) {
        console.log(resp)
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                this.setState({
                    showSnackBar: true,
                    messageSnackBar: resp.message,
                    colorSnackBar: green800
                });
                this.loadAllValidatedUsers();
                this.loadAllNonValidatedUsers();
            }
            else {
                this.setState({
                    showSnackBar: true,
                    messageSnackBar: resp.message,
                    colorSnackBar: red800
                });
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
                        <p>Aucun user</p>
                    }
                    </Col>
                    <Col lg={6}>
                        {
                            this.state.allNonValidatedUsers != null
                            ?
                            <Table>
                                <TableHeader
                                    displaySelectAll={false}
                                >
                                    <TableRow>
                                        <TableHeaderColumn>Email</TableHeaderColumn>
                                        <TableHeaderColumn>Role</TableHeaderColumn>
                                        <TableHeaderColumn>Action</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                        displayRowCheckbox={false}
                                    >
                                        {this.state.allNonValidatedUsers.map( (row, i) => (
                                            <TableRow key={i} value={row.email}>
                                                <TableRowColumn>{row.email}</TableRowColumn>
                                                <TableRowColumn>{row.role}</TableRowColumn>
                                                <TableRowColumn><FlatButton label="Valider" onTouchTap={this.validateUser.bind(this, row)}/></TableRowColumn>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                            </Table>
                            :
                            <p>Aucun user</p>
                        }
                        
                    </Col>
                </Row>
                <Snackbar
                        open={this.state.showSnackBar}
                        message={this.state.messageSnackBar}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestCloseSnackBar}
                        bodyStyle={{textAlign: "center", backgroundColor: this.state.colorSnackBar}}
                    />
            </div>
        )       
    }
}

export default AdminPage;