import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'

import AboutPage from './Pages/AboutPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import AdminPage from './Pages/AdminPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import NoMatchPage from './Pages/NoMatchPage.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Rooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogged : false,
            userRole: 3 //userRole: 0=Chef, 1=Detect, 2=Normal, 3=notLogged
        };

        this.login = this.login.bind(this);
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

    // Faking login / logout
    login(){
        //console.log("Login !")
        this.setState({ userLogged : true })
    }

    // Faking login / logout
    logout(){
        //console.log("Logout !")
        this.setState({ userLogged : false })
    }

    // Checking current users credentials
    checkNormalPageAccess(){
        //check user's token ...
        //faking it 
        return this.state.userLogged
    }

    // Checking if user is admin
    checkAdminPageAccess() {
        if (this.state.userRole == 0) {
            return true;
        }
        return false;
    }

    render() {
        //check credentials for private page access
        var _HomePage = this.checkNormalPageAccess() ? HomePage : LoginPage;
        var _PrivatePage = this.checkAdminPageAccess() ? AdminPage : _HomePage;

        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={_HomePage}/>
                        <Route path="/about" component={AboutPage}/>
                        <Redirect from="/about1" to="/about"/>
                        <Route path="/private" component={_PrivatePage}/>
                        <Route component={HomePage}/>
                    </Switch>
                </div>
            </Router>
        )

    }
}

export default Rooter;