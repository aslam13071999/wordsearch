import React from "react";
import './room-view.css'

import {GameBoard} from "../../gameboard/game-board/game-board";
import {RoomApi} from "../../../services/room-api";
import withRouter from "../../../routerUtil";
import GameBoardCreateView from "../../gameboard/game-board-create-view/game-board-create-view";
import {AuthenticationService} from "../../../services/authentication";


class RoomView extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.room_id
        this.room_api = new RoomApi()
        this.auth_api = new AuthenticationService()

        this.room_refresh_id = null
        this.state = {
            have_active_board: false,
            active_board_info: null,
            room_info: null
        }
    }

    checkValidRoom = async () => {
        try {
            const response = await this.room_api.getInfo(this.room_id)
            if (response.data == null) return false;
            this.setState({
                ...this.state,
                room_info: response.data
            })
        } catch (e) {
            return false
        }
    }


    componentDidMount = async () => {
        const status = await this.checkValidRoom()
        if (status === false) {
            this.props.router.navigate("/room/")
            return
        }
        await this.fetchActiveBoard()
    }

    fetchActiveBoard = async () => {
        const board_info_response = await this.room_api.getLatestBoard(this.room_id)
        console.log("RoomView.getActiveBoardDetails", board_info_response)
        if (board_info_response.data.hasOwnProperty('id')) {
            if(this.room_refresh_id != null){
                console.log("clearing interval for fetching active board")
                clearInterval(this.room_refresh_id)
                this.room_refresh_id = null
            }
            this.setState({
                have_active_board: true,
                active_board_info: board_info_response.data
            })
        }
    }


    onCreate = async () => {
        await this.fetchActiveBoard()
    }

    onClose = async () => {
        this.setState({
            have_active_board: false,
            active_board_info: null
        })
    }

    render() {
        if (this.state.room_info != null) {
            if(this.state.have_active_board){
                return(
                    <GameBoard room_id={this.room_id} board_info={this.state.active_board_info} on_close={this.onClose}/>
                )
            }
            else {
                if(this.state.room_info.created_by.email === this.auth_api.getUser().email){
                    return (
                        <GameBoardCreateView room_id={this.room_id} on_create={this.onCreate}/>
                    )
                }
                else{
                    this.room_refresh_id = setInterval(this.fetchActiveBoard, 2000)
                    return (
                        <div className={"p-8"}>
                            Please Wait, We are waiting for the Room Creator to start the game
                        </div>
                    )
                }
            }
        } else {
            return (<div> Please Wait </div>)
        }
    }
}

export default withRouter(RoomView);
