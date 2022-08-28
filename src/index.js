import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDEMhLfRopmztGZ-BYpTq1qoqN8ycYhxhM",
    authDomain: "wordsearch-mp.firebaseapp.com",
    projectId: "wordsearch-mp",
    storageBucket: "wordsearch-mp.appspot.com",
    messagingSenderId: "47371325425",
    appId: "1:47371325425:web:7c84726abe0be32c063e50",
    measurementId: "G-WC64DY01DR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
       <App/>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
