import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Router from './Router.jsx';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <Router/>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
