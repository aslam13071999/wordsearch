import React from "react";
import {MemberList} from "../member-list/member-list";
import {Notifications} from "../notifications/notifications";

import GameBoard from '../game-board/game-board'
import './room-view.css'
import {RoomApi} from "../../services/room-api";
import {AuthenticationService} from "../../services/authentication";

export class RoomView extends React.Component {

    constructor(props) {
        super(props);
        this.room_api = new RoomApi()
        this.state = {
            room_id:  null
        }
    }

    loginUser = async () => {
        console.log("RoomView.loginUser")
        await new AuthenticationService().authenticate('asif', 'rgukt123')
    }

    createRoom = async () => {
        await this.loginUser()
        console.log("RoomView.createRoom")
        const response = await this.room_api.createRoom()
        const room_id = response.data.id
        this.setState({room_id: room_id})
    }

    componentDidMount = async () => {
        await this.createRoom()
    }


    render() {
        return (
            <div>
                {
                    this.state.room_id == null &&
                    <div className="createRoomSection">
                        Room is under creation, please hold on
                    </div>
                }
                {
                    this.state.room_id != null &&
                    <div className="room">
                        <div className="game-board">
                            <GameBoard room_id={this.state.room_id} grid_size={10}></GameBoard>
                        </div>
                        <div className="member-list">
                            <MemberList room_id={this.state.room_id}></MemberList>
                        </div>
                        <div className="notifications">
                            <Notifications room_id={this.state.room_id}></Notifications>
                        </div>
                    </div>
                }
            </div>
        )
    }

}