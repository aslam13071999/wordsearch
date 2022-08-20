import {Component} from "react";
import PlayerProfile from "../../players/player-profile/player-profile";
import {Link} from "react-router-dom";


export default class RoomViewSmall extends Component {

    constructor(props) {
        super(props);
        this.players = this.props.players
        this.room_id = this.props.room_id
    }

    render = () => {
        return(
            <div className="w-[300px] h-[350px] bg-white text-blue-900 m-[10px] rounded-md border border-light-lt-gray border-t-light-br-color border-t-4 shadow-lg hover:shadow-dark-primary">
                {
                    this.players.map((player) => {
                        return(
                            <PlayerProfile username={"pavani"} email={player.email} key={player.username} />
                        )
                    })
                }

                <center><Link to={"/room/" + this.room_id} ><b>Enter the Room </b> </Link></center>
            </div>
        )
    }
}