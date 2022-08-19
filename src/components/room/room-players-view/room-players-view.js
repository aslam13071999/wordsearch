import React, {Component} from "react";
import {PlayerList} from "../../players/player-list/player-list";
import {RoomApi} from "../../../services/room-api";


export class RoomPlayersView extends Component{
    constructor(props) {
        super(props);
        this.room_api = new RoomApi()
        this.state = {
            players: []
        }
    }

    fetchPlayers = async () => {
        const response = this.room_api.getJoinedPlayers(this.room_id)
        this.setState({
            players: response.data
        })
    }

    componentDidMount = async () => {
        await this.fetchPlayers()
    }

    joinUser = async () => {
        await this.room_api.join(this.room_id)
    }


    render = () => {
        return(
            <div>
                <PlayerList players={this.state.players}> </PlayerList>
            </div>
        )
    }
}