import React, {Component} from 'react';

//Material UI comps
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import {blue500, blue600, red800, white} from 'material-ui/styles/colors';

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
    styleSnackMessage: {
        backgroundColor: red800,
        textAlign: "center"
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

            email: "ggi@etna.com",
            password: "pass",
            showSnackBar: false,
            messageSnackBar: "",
            displayLoadingProcessLogin: false,
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onKeyPressEmail = this.onKeyPressEmail.bind(this);
        this.onKeyPressPassword = this.onKeyPressPassword.bind(this);
        this.handleRequestCloseSnackBar = this.handleRequestCloseSnackBar.bind(this);
        this.loginBtnClick = this.loginBtnClick.bind(this);
        this.processResponseLogin = this.processResponseLogin.bind(this);
    }

    login() {
        this.setState({displayLoadingProcessLogin : true});
        var API = API_IP + "/auth/checkCredentials";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        var data = JSON.stringify({"email":this.state.email, "password":this.state.password});
        console.log(API)
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
                this.setState({showSnackBar: true, messageSnackBar: resp.message});
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
                                          style={{marginBottom: 50}}
                                          onTouchTap={this.loginBtnClick}
                                          labelColor={white}
                                          backgroundColor={blue500}
                                          disabled={this.state.displayLoadingProcessLogin}
                            />
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
                        bodyStyle={style.styleSnackMessage}
                    />
                </div>
            </div>
        );
    }
}

export default LoginPage;