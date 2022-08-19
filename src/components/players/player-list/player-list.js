import React from "react";
import PlayerProfile from "../player-profile/player-profile";
import {RoomApi} from "../../../services/room-api";


export class PlayerList extends React.Component {


    render() {
        return (
            <div>
                {
                    this.props.players.map((player) => {
                        return(
                            <PlayerProfile
                                key={player.username}
                                email={player.email}
                                username={player.username}
                            >
                            </PlayerProfile>
                        )
                    })
                }
            </div>
        )
    }

}