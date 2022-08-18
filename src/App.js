import React from 'react';
import './App.css';
import './index.css';
import withRouter from "./routerUtil";
import {Link} from "react-router-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryList from "./components/categories-list/categories-list";
import RoomListView from "./components/room-list-view/room-list-view";
import RoomView from "./components/room-view/room-view";
import Header from "./components/header/header";

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