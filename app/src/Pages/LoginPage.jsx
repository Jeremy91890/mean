import React, {Component} from 'react';

//Material UI comps
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import {blue500, blue600, red800, white} from 'material-ui/styles/colors';

//Api endpoint config
import api_ip_conf from '../config.js';
const API_IP = api_ip_conf.endpoint;

//http utils for request post, get ...
import requestUtils from '../Utils/requestUtils.js';

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
    }
};

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogged: false,
            userIsAdmin: false,

            email: "",
            password: "",
            showFailLogin: false,
            displayLoadingProcessLogin: false,
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onKeyPressEmail = this.onKeyPressEmail.bind(this);
        this.onKeyPressPassword = this.onKeyPressPassword.bind(this);
        this.handleRequestCloseFailLogin = this.handleRequestCloseFailLogin.bind(this);
        this.loginBtnClick = this.loginBtnClick.bind(this);
        this.processResponseLogin = this.processResponseLogin.bind(this);
    }

    login() {
        this.setState({displayLoadingProcessLogin : true});
        var API = API_IP + "/users/checkcredentials";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'};
        var data = JSON.stringify({"email":this.state.email, "password":this.state.password});
        requestUtils.postData(API, headers, data , this.processResponseLogin)
    }

    processResponseLogin(resp) {
        resp = resp['responseJSON'];
        if (resp['message'] != "success") {
            localStorage.setItem('authToken',null);
            localStorage.setItem('email',null);
            alert(resp['message']);
        }
        else {
            this.setState({displayLoadingProcessLogin : false});
            var data = resp['data'];
            if (data['status'] == "authorized" ){
                localStorage.setItem('authToken',data["uid"]);
                localStorage.setItem('email',data["email"]);
                if (data['role'] == "admin") {
                    this.setState({userLogged: true, userIsAdmin: true});
                    var data = {userLogged : this.state.userLogged, userIsAdmin : this.state.userIsAdmin};
                    this.props.onChange(data);
                }
                else {
                    this.setState({userLogged: true, userIsAdmin: false});
                    var data = {userLogged : this.state.userLogged, userIsAdmin : this.state.userIsAdmin};
                    this.props.onChange(data);
                }
            }
            else {
                localStorage.setItem('authToken',null);
                localStorage.setItem('email',null);
                this.setState({showFailLogin: true});
            }
        }
    }

    //On check si il y a un token : Oui -> onCkeck la validite du token | Non -> user n'est pas userLogged
    componentWillMount() {
        if (localStorage.authToken == "null" || localStorage.authToken == undefined || localStorage.authToken == 0) {
            this.setState({userLogged: false});
        }
        else {
            this.setState({displayLoadingCheckToken: true});
            this.checkToken(localStorage.authToken);
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

    //Ferme la snackBar du fail login
    handleRequestCloseFailLogin() {
        this.setState({
            showFailLogin: false,
        });
    };

    render() {
        return (
            <div>
                {
                    this.state.displayLoadingCheckToken
                        ?
                        <div style={{textAlign: "center", marginTop: "30%"}}>
                            <CircularProgress size={80}
                                              thickness={5}
                                              color={blue500}/>
                        </div>
                        :
                        <div style={{textAlign: "center"}}>
                            <Paper style={style.stylePaperLogin}
                                   zDepth={1}>
                                <AppBar
                                    title={<b style={{fontSize: 18}}>Se connecter à Galaxie</b>}
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
                                    <div style={style.styleFooterLogin} >
                                        <div style={style.styleLogoFooterLogin}>
                                            <img src="./static/img/Image2.png" height="26px"/>
                                            <br/>
                                            <img height="22px" src="./static/img/Logo_lagardere_active.png"/>
                                        </div>
                                    </div>
                                    {
                                        this.state.displayLoadingProcessLogin
                                            ?
                                            <LinearProgress mode="indeterminate"
                                                            color={blue500}
                                                            style={{borderRadius: 0, position: "absolute", bottom: 0}}/>
                                            :
                                            null
                                    }

                                </div>
                            </Paper>
                            <Snackbar
                                open={this.state.showFailLogin}
                                message="Email or password is incorrect"
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestCloseFailLogin}
                                bodyStyle={style.styleSnackMessage}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default LoginPage;