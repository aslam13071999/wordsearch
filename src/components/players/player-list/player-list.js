import React from "react";
import PlayerProfile from "../player-profile/player-profile";


export class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.players = this.props.players
    }


    render() {
        return (
            <div>
                {
                    this.players.map((player) => {
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