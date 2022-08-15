import React from "react";
import {MemberList} from "../member-list/member-list";
import {Notifications} from "../notifications/notifications";

import {GameBoardView} from "../game-board-view/game-board-view";

import './room-view.css'
import withRouter from "../../routerUtil";
import {GameBoardApi} from "../../services/game-board-api";
import CreateGameBoard from "../create-game-board/create-game-board";


class RoomView extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.router.params.id
        this.gameboard_api = new GameBoardApi()
        this.state = {
            latest_board: null
        }
    }

    getActiveBoard = async () => {
        const response = await this.gameboard_api.getLatestBoard(this.room_id)
        this.setState({
            latest_board: response.data
        })
        console.log(response)
    }

    componentDidMount = async () => {
        await this.getActiveBoard()
    }


    render() {
        return (
            <div className="room">
                <div className="game-board">
                    {
                        this.state.latest_board == null &&
                        <CreateGameBoard room_id={this.room_id} />
                    }
                    {
                        this.state.latest_board != null &&
                        <GameBoardView room_id={this.room_id}
                                       board_data={this.state.latest_board.board_data}
                                       board_dictionary={this.state.latest_board.board_dictionary}
                                       board_id={this.state.latest_board.id}
                        />
                    }
                </div>
                <div className="member-list">
                    <MemberList room_id={this.room_id}></MemberList>
                </div>
                <div className="notifications">
                    <Notifications room_id={this.room_id}></Notifications>
                </div>
            </div>
        )
    }

}

export default withRouter(RoomView)