import React from 'react';
import './App.css';
import withRouter from "./routerUtil";
import {Link} from "react-router-dom";


class App extends React.Component {

    render() {
        return (
            <div className="App">
                <div><Link to={"/room"}> Rooms </Link> </div>
                <div><Link to={"/categories"}> Categories </Link> </div>
            </div>
        );

    }
}

export default withRouter(App)