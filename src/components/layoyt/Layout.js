
import { Route, Routes} from "react-router-dom";
import Header from "../site/header/header";
import App from "../../App";
import RoomListView from "../room/room-list-view/room-list-view";
import RoomView from "../room/room-view/room-view";
import CategoryList from "../category/categories-list/categories-list";
import {useState} from "react";
import React from "react";

export const ThemeContext = React.createContext("light");
const Layout =()=>{
    const [theme,setTheme]=useState('light')
const changeTheme =(color)=>{
    setTheme(color);
}
console.log("hello",theme);
    return (

        <ThemeContext.Provider value={theme}>
            <div className={`bg-${theme}-primary text-${theme}-secondary h-[100%]`}>
          <Header changeTheme={changeTheme}/>
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