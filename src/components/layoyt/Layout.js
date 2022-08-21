import {Route, Routes} from "react-router-dom";
import Header from "../site/header/header";
import App from "../../App";
import RoomListView from "../room/room-list-view/room-list-view";
import RoomView from "../room/room-view/room-view";
import CategoryList from "../category/categories-list/categories-list";
import React, {useState} from "react";

export const ThemeContext = React.createContext("");
const Layout = () => {
    return (

        <ThemeContext.Provider value={""}>
            <div className="bg-light-primary dark:bg-light-secondary text-light-secondary dark:text-light-primary h-[100vh]">
                <Header/>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/room" element={<RoomListView/>}/>
                    <Route path="/room/:id" element={<RoomView/>}/>
                    <Route path="/categories" element={<CategoryList/>}/>
                </Routes>
            </div>
        </ThemeContext.Provider>

    )


}

export default Layout;