import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'

import AboutPage from '../Pages/AboutPage.jsx'
import HomePage from '../Pages/HomePage.jsx'
import AdminPage from '../Pages/AdminPage.jsx'
import PleaseLoginPage from '../Pages/PleaseLoginPage.jsx'
import NoMatchPage from '../Pages/NoMatchPage.jsx'

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {blue500, blue600, red800, white, grey50, grey100} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
    appBar: {
        backgroundColor: blue600
    },
    appBarTitle: {
        paddingLeft: "20px"
    },
    navLink: {
        color: "white",
        textDecoration : "none"
    },
    appContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-end"
    },
    appMainContainer: {
        display: "flex",
        minHeight: "800px",
        minWidth: "1200px",
        backgroundColor: grey50,
        
    },
    appSideBar: {
        width: "80px",
        height: "100%",
        padding: "15px"
    },
    appPagesContainer: {
        margin: "0 auto",
        padding : "30px"
    }
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
             <div style={this.props.style}>
                <p><Link to="/">Home</Link></p>
                <p><Link to="/about">About</Link></p>
                <p><Link to="/private">Private</Link></p>
                <hr/>
                <button onClick={this.props.onLogin}>Log in</button>
                <button onClick={this.props.onLogout}>Log out</button>
                <p><Link to="/somethingnotmatching">not matching</Link></p>
                <p><Link to="/about1">about 1 (redirect)</Link></p>
            </div>
        )       
    } 
}

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div> Affini-Tech 2017 </div>)
    }
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privateSectionAllowed : false
        }
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
    
    componentWillMount(){
        var params = this.getSubRoute()
        console.log(params)
        if (params[0]== "doc"){
            this.setState({pageToShow : "doc => " + params[1] })
        }
        
    }

    // Faking login / logout
    login(){
        //console.log("Login !")
        this.setState({ privateSectionAllowed : true })
    }

    // Faking login / logout
    logout(){
        //console.log("Logout !")
        this.setState({ privateSectionAllowed : false })
    }

    // Checking current users credentials
    checkPrivatePageAccess(pageID){
        //check user's token ...
        //faking it 
        return this.state.privateSectionAllowed
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

    render() {
        //check credentials for private page access
        var _PrivatePage = this.checkPrivatePageAccess("PRIVPAGE1") ? AdminPage : PleaseLoginPage
        
        return (
            <Router>
                <div style={styles.appContainer}>
                    <AppBar
                        iconElementLeft={<img src="/img/logo.png" height="48px"></img>}
                        title={<span style={styles.appBarTitle}>Datatask.IO</span>}
                        style={styles.appBar}
                        iconElementRight={
                            <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                                <NavLink style={styles.navLink} to="/about"><MenuItem primaryText="About"/></NavLink>
                            </IconMenu>
                        }
                    />

                    <div style={styles.appMainContainer}>

                        <Sidebar onLogin={this.login} 
                                onLogout={this.logout} 
                                style={styles.appSideBar}/>

                        <div style={styles.appPagesContainer}>
                            <Switch>
                                <Route exact path="/" component={HomePage}/>
                                <Route path="/about" component={AboutPage}/>
                                <Redirect from="/about1" to="/about"/>
                                <Route path="/private" component={_PrivatePage}/>
                                <Route component={HomePage}/>
                            </Switch>
                        </div>
                    </div>

                    <Footer/>
                </div>
            </Router>
        )

    }
}

export default Layout;