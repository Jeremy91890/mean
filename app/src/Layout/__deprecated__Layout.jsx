import React, {Component} from 'react';

/*import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'*/

import Page1 from '../Pages/Page1.jsx'
//import Home from '../Pages/Home.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>Home page <br/>
                <a href="/#/about">About </a>
            </div>
        )
    }
}

class About extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>About page</div>
        )       
    }
}



class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageToShow : "HOME"
        }
        
    }
    componentWillMount(){
        var params = this.getSubRoute()
        console.log(params)
        if (params[0] == "about"){
            this.setState({pageToShow : "ABOUT"})
        }
        
    }

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
        
        var page = <Home/>
        if (this.state.pageToShow == "ABOUT") {
            page = <About/>
        }
        return (
            <div>
                {page}
            </div>
        )

    }
}

export default Layout;