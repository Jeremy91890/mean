import React, {Component} from 'react';

//Material UI comps
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import {blue500, blue600, red800, white, green800} from 'material-ui/styles/colors';

//http utils for request post, get ...
import {postData, getData} from '../Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from '../config.js';
const API_IP = api_ip_conf.endpoint;

const style = {
    stylePaperLogin: {
        position: "relative",
        width: 310,
        textAlign: 'center',
        display: 'inline-block',
        marginTop: "10%"
    },
    styleAppBarLogin: {
        backgroundColor: blue600,
    },
    styleFooterLogin: {
        backgroundColor: white,
        height: 58
    },
    styleLogoFooterLogin: {
        width: "100%",
        textAlign: "center",
        margin: 3
    },
    styleLinearProgress: {
        borderRadius: 0,
        position: "absolute",
        bottom: 0
    }
};

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogged: false,
            userRole: false,
            signIn: false,
            showSnackBar: false,
            messageSnackBar: "",
            colorSnackBar: red800,

            email: "ggi@etna.com",
            password: "pass",
            displayLoadingProcessLogin: false,

            newEmail: "",
            newPassword: "",
            newRole: 2,
            displayLoadingProcessCreateAccount: false,
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onKeyPressEmail = this.onKeyPressEmail.bind(this);
        this.onKeyPressPassword = this.onKeyPressPassword.bind(this);
        this.handleRequestCloseSnackBar = this.handleRequestCloseSnackBar.bind(this);
        this.loginBtnClick = this.loginBtnClick.bind(this);
        this.SignInBtnClick = this.SignInBtnClick.bind(this);
        this.handleChangeNewEmail = this.handleChangeNewEmail.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeNewRole = this.handleChangeNewRole.bind(this);
        this.createAccountBtnClick = this.createAccountBtnClick.bind(this);
        this.backToLoginClick = this.backToLoginClick.bind(this);

        this.processResponseLogin = this.processResponseLogin.bind(this);
        this.processResponseCreateAccount = this.processResponseCreateAccount.bind(this);
    }

    login() {
        this.setState({displayLoadingProcessLogin : true});
        var API = API_IP + "/auth/checkCredentials";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        var data = JSON.stringify({"email":this.state.email, "password":this.state.password});
        postData(API, headers, data , this.processResponseLogin)
    }

    processResponseLogin(resp) {
        this.setState({displayLoadingProcessLogin: false});
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                //changer le role celon de resp de l'api
                localStorage.setItem('authToken', resp.token);
                this.setState({userLogged: true, userRole: resp.role});
                var props = {userLogged: this.state.userLogged, userRole: this.state.userRole};
                this.props.onChange(props);
            }
            else {
                localStorage.setItem('authToken', null);
                localStorage.setItem('email', null);
                this.setState({showSnackBar: true, messageSnackBar: resp.message, colorSnackBar: red800});
            }
        }
    }

    createAccount() {
        this.setState({displayLoadingProcessCreateAccount : true});
        var API = API_IP + "/users/addUser";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        var data = JSON.stringify({"email":this.state.newEmail, "password":this.state.newPassword, "role":this.state.newRole});
        postData(API, headers, data , this.processResponseCreateAccount)
    }

    processResponseCreateAccount(resp) {
        this.setState({displayLoadingProcessCreateAccount: false});
        if (resp.responseJSON != undefined) {
            resp = resp.responseJSON;
            if (resp.success == true) {
                this.setState({showSnackBar: true, messageSnackBar: resp.message, colorSnackBar: green800, signIn: false});
            }
            else {
                this.setState({showSnackBar: true, messageSnackBar: resp.message, colorSnackBar: red800});
            }
        }
    }

    //Maj du state email
    handleChangeEmail(event) {
        this.setState({
            email: event.target.value,
        });
    };

    //Maj du state password
    handleChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    };

    loginBtnClick() {
        this.login();
    }

    onKeyPressEmail(event) {
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            this.login();
        }
    }

    onKeyPressPassword(event) {
        if (event.charCode === 13) { // enter key pressed
            event.preventDefault();
            this.login();
        }
    }

    //Ferme la snackBar
    handleRequestCloseSnackBar() {
        this.setState({
            showSnackBar: false,
        });
    };

    SignInBtnClick() {
        this.setState({
            signIn: true
        });
    }

     //Maj du state email
    handleChangeNewEmail(event) {
        this.setState({
            newEmail: event.target.value,
        });
    };

    //Maj du state password
    handleChangeNewPassword(event) {
        this.setState({
            newPassword: event.target.value,
        });
    };

    handleChangeNewRole (event, index, value) {
        this.setState({newRole: index});
    }

    createAccountBtnClick() {
        this.createAccount();
    }

    backToLoginClick() {
        this.setState({
            signIn: false
        })
    }

    render() {
        return (
            <div>
                <div style={{textAlign: "center"}}>
                    <Paper style={style.stylePaperLogin}
                        zDepth={1}>
                        <AppBar
                            title={<b style={{fontSize: 18}}>Auth</b>}
                            iconStyleLeft={{display: "none"}}
                            style={style.styleAppBarLogin}
                        />
                        <div style={{marginTop: "15%"}}>
                            {
                                this.state.signIn
                                ?
                                <div>
                                    <TextField
                                        id="email"
                                        hintText="Email"
                                        value={this.state.newEmail}
                                        onChange={this.handleChangeNewEmail}
                                        type="text"
                                    />
                                    <br/>
                                    <TextField
                                        id="password"
                                        hintText="Mot de passe"
                                        value={this.state.newPassword}
                                        onChange={this.handleChangeNewPassword}
                                        type="password"
                                    />
                                    <br/>
                                    <DropDownMenu
                                        value={this.state.newRole}
                                        onChange={this.handleChangeNewRole}
                                        >
                                        <MenuItem value={0} primaryText="Chef" />
                                        <MenuItem value={1} primaryText="Détective" />
                                        <MenuItem value={2} primaryText="Agent" />
                                    </DropDownMenu>
                                    <br/><br/>
                                    <RaisedButton label={<b>Confirmer</b>}
                                                style={{marginBottom: 5}}
                                                onTouchTap={this.createAccountBtnClick}
                                                labelColor={white}
                                                backgroundColor={blue500}
                                                disabled={this.state.displayLoadingProcessCreateAccount}
                                    />
                                    <div style={{marginBottom: 40}}>
                                        <FlatButton label="Retour"
                                            onTouchTap={this.backToLoginClick}
                                        />
                                    </div>
                                </div>
                                :
                                <div>
                                    <TextField
                                        id="email"
                                        hintText="Email"
                                        value={this.state.email}
                                        onChange={this.handleChangeEmail}
                                        type="text"
                                        onKeyPress={this.onKeyPressEmail}
                                    />
                                    <br/><br/><br/>
                                    <TextField
                                        id="password"
                                        hintText="Mot de passe"
                                        value={this.state.password}
                                        onChange={this.handleChangePassword}
                                        type="password"
                                        onKeyPress={this.onKeyPressPassword}
                                    />
                                    <br/><br/><br/><br/>
                                    <RaisedButton label={<b>Connexion</b>}
                                                style={{marginBottom: 5}}
                                                onTouchTap={this.loginBtnClick}
                                                labelColor={white}
                                                backgroundColor={blue500}
                                                disabled={this.state.displayLoadingProcessLogin}
                                    />
                                    <div style={{marginBottom: 40}}>
                                        <FlatButton label="Nouveau"
                                            onTouchTap={this.SignInBtnClick}
                                        />
                                    </div>
                                </div>
                            }
                            
                            {
                                this.state.displayLoadingProcessLogin
                                    ?
                                    <LinearProgress mode="indeterminate"
                                                    color={blue500}
                                                    style={style.styleLinearProgress}/>
                                    :
                                    null
                            }

                        </div>
                    </Paper>
                    <Snackbar
                        open={this.state.showSnackBar}
                        message={this.state.messageSnackBar}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestCloseSnackBar}
                        bodyStyle={{textAlign: "center", backgroundColor: this.state.colorSnackBar}}
                    />
                </div>
            </div>
        );
    }
}

export default LoginPage;