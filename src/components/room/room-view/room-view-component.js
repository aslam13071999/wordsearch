import React from "react";
import './room-view.css'

import {GameBoard} from "../../gameboard/game-board/game-board";
import {RoomApi} from "../../../services/room-api";


export class RoomViewComponent extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.room_id
        this.room_api = new RoomApi();
    }

    checkValidRoom = async () => {
        // #TODO: check this validation as well
        const response = this.room_api.getInfo(this.room_id)
        return response.data != null
    }


    componentDidMount = async () => {
        const status = await this.checkValidRoom()
        if (status === false) {
            // #TODO: redirect to rooms list page
        }
    }

    render() {
        return (
            <div className="room">
                <div className="game-board">
                    <GameBoard room_id={this.room_id}/>
                </div>
            </div>
        )
    }
}

