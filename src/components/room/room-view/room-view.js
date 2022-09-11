import React from "react";
import './room-view.css'

import {GameBoard} from "../../gameboard/game-board/game-board";
import {RoomApi} from "../../../services/room-api";
import withRouter from "../../../routerUtil";
import GameBoardCreateView from "../../gameboard/game-board-create-view/game-board-create-view";


class RoomView extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.room_id
        this.room_api = new RoomApi();
        this.state = {
            have_board: false,
            board_id: null
        }
    }

    checkValidRoom = async () => {
        const response = this.room_api.getInfo(this.room_id)
        return response.data !== null
    }


    componentDidMount = async () => {
        const status = await this.checkValidRoom()
        if (status === false) {
            this.props.router.navigate("/room/")
        }
        await this.fetchActiveBoard()
    }

    fetchActiveBoard = async () => {
        const board_info_response = await this.room_api.getLatestBoard(this.room_id)
        console.log("RoomView.getActiveBoardDetails", board_info_response)
        if (board_info_response.data.hasOwnProperty('id')) {
            await this.setActiveBoard(board_info_response)
        }
    }

    setActiveBoard = async (board_info) => {
        this.setState({
            have_board: true,
            board_info: board_info.data
        })
    }

    render() {
        return (
            <div className="room">
                <div className="game-board">
                    {
                        this.state.have_board === true && <GameBoard room_id={this.room_id} board_info={this.state.board_info}/>
                    }
                    {
                        this.state.have_board === false && <GameBoardCreateView room_id={this.room_id} />
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(RoomView);
