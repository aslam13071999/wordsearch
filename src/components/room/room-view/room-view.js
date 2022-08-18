import React from "react";
import {PlayerList} from "../../players/player-list/player-list";


import './room-view.css'
import withRouter from "../../../routerUtil";
import {GameBoard} from "../../gameboard/game-board/game-board";


class RoomView extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.router.params.id

    }

    render() {
        return (
            <div className="room">
                <div className="game-board">
                    <GameBoard room_id={this.room_id} />
                </div>
                <div className="member-list">
                    <PlayerList room_id={this.room_id}></PlayerList>
                </div>

            </div>
        )
    }
}

export default withRouter(RoomView)