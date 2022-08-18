import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import App from './App';
import CategoryList from "./components/category/categories-list/categories-list";
import RoomListView from "./components/room/room-list-view/room-list-view";
import RoomView from "./components/room/room-view/room-view";
import Header from "./components/site/header/header";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/room" element={<RoomListView/>}/>
            <Route path="/room/:id" element={<RoomView/>}/>
            <Route path="/categories" element={<CategoryList/>}/>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
