import React from 'react';
import './App.css';
import {Room} from './components/room/room';


export default class App extends React.Component {


    render() {
        return (
            <div className="App">
                <div>
                    <Room key={"room1"}></Room>
                </div>
            </div>
        );

    }
}