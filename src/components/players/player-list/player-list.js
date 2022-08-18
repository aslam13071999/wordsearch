import React from "react";
import PlayerProfile from "../player-profile/player-profile";
import {RoomApi} from "../../../services/room-api";


export class PlayerList extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.room_id;
        this.room_api = new RoomApi()
        this.state = {
            players: []
        }
    }

    getMembers = async () => {
        const response = await this.room_api.getJoinedPlayers(this.room_id)
        this.setState({
            players: response.data
        })
    }

    componentDidMount = async () => {
        await this.getMembers()
    }

    render() {
        let players = []
        for (let i = 0; i < this.state.players.length; ++i) {
            players.push(
                <PlayerProfile
                    key={this.state.players[i].username}
                    email={this.state.players[i].email}
                    username={this.state.players[i].username}
                >
                </PlayerProfile>
            )
        }
        return (
            <div>
                {players}
            </div>
        )
    }

}