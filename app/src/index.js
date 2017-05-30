import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Layout from './Layout/LayoutRouter.jsx';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="mainContainer">
                    <Layout/>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
