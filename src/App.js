import React from 'react';
import './App.css';
import './index.css';
import withRouter from "./routerUtil";
import {Link} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <>
                <div className="flex flex-col justify-center items-center App">
                <div className="text-[30px] link-hover mb-5"><Link to={"/room"}> Rooms </Link> </div>
                <div className="text-[30px]	link-hover"><Link to={"/categories"}> Categories </Link> </div>
                </div>
            </>
        );

    }
}

export default withRouter(App)