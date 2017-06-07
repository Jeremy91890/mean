import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {blue500, blue600, red800, white} from 'material-ui/styles/colors';

import HomePage from './Pages/HomePage.jsx'
import AdminPage from './Pages/AdminPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import AddCrime from './Pages/AddCrime.jsx'
import NoMatchPage from './Pages/NoMatchPage.jsx'

//http utils for request post, get ...
import {postData, getData} from './Utils/requestUtils.js';

//Api endpoint config
import api_ip_conf from './config.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const API_IP = api_ip_conf.endpoint;

const style = {
    appBar: {
        backgroundColor: "#2D2D2D"
    }
}


class Rooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogged : false,
            userRole: 3 //userRole: 0=Chef, 1=Detect, 2=Normal, 3=notLogged
        };

        this.logout = this.logout.bind(this);
    }
    
    componentWillMount(){
        var params = this.getSubRoute();
        console.log(params);
        if (params[0]== "doc"){
            this.setState({pageToShow : "doc => " + params[1] })
        }
    }

    // utility function in case we want to pass some parameters to page
    getSubRoute(){
        var app = ""
        var doc = ""
        var url = window.location.href.split("#")
        if (url.length > 1) {
            var parts = url[1].split("/")
            app = parts[1]
            doc = parts[2]
        }
        return [app,doc]
    }

    logout(){
        var API = API_IP + "/auth/deleteToken";
        var token = localStorage.getItem('authToken');
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token};
        var data = JSON.stringify({"token":token});
        postData(API, headers, data , this.processResponseLogout)
        localStorage.setItem('authToken',null);
        localStorage.setItem('email',null);
        this.setState({userLogged: false});
    }

    processResponseLogout(resp) {
        resp = resp.responseJSON;
        console.log(resp);
    }

    // Checking current users credentials
    checkNormalPageAccess() {
        //check user's token ...
        //faking it 
        return this.state.userLogged
    }

    // Checking if user is admin
    checkAdminPageAccess() {
        if (this.state.userLogged == true) {
            if (this.state.userRole == 0) {
                return true;
            }
        }
        return false;
    }

    onChangeLoginPage(props) {
        this.setState({userLogged: props.userLogged, userRole: props.userRole})
    }

    render() {
        const _LoginPage = (props) => {
            return (
                <LoginPage
                    onChange={this.onChangeLoginPage.bind(this)}
                    {...props}
                />
            );
        }
        const _AdminPage = (props) => {
            return (
                <AdminPage
                    userRole={this.state.userRole}
                    {...props}
                />
            );
        }
        const _HomePage = (props) => {
            return (
                <HomePage
                    userRole={this.state.userRole}
                    {...props}
                />
            );
        }
        //check credentials for private page access
        var __HomePage = this.checkNormalPageAccess() ? _HomePage : _LoginPage;
        var __AdminPage = this.checkAdminPageAccess() ? _AdminPage : __HomePage;
        var _AddCrime = this.checkAdminPageAccess() ? AddCrime : __HomePage;

        return (
            <Router>
                <div>
                    {
                        this.state.userLogged
                            ?
                            <AppBar
                                style={style.appBar}
                                iconElementLeft={<img height={48} src="/public/img/logo_police.png"></img>}
                                title="Mean"
                                iconElementRight={
                                    <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                                        <NavLink to="/"><MenuItem primaryText="Home"/></NavLink>
                                        {this.state.userRole == 0 ? <NavLink to="/admin"><MenuItem primaryText="Admin"/></NavLink> : null}
                                        <NavLink to="/"><MenuItem primaryText="Logout" onTouchTap={this.logout}/></NavLink>
                                        <NavLink to="/addcrime"><MenuItem primaryText="Create" /></NavLink>
                                    </IconMenu>
                                }
                            />
                            :
                            null
                    }
                    <div>
                        <Switch>
                            <Route exact path="/" component={__HomePage}/>
                            <Route path="/admin" component={__AdminPage}/>
                            <Route path="/addcrime" component={_AddCrime}/>
                            <Route component={_HomePage}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )

    }
}

export default Rooter;