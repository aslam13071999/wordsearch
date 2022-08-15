import {Component} from "react";
import MemberProfile from "../member-profile/member-profile";
import {Link} from "react-router-dom";


export default class RoomViewSmall extends Component {

    constructor(props) {
        super(props);
        this.players = this.props.players
        this.room_id = this.props.room_id
    }

    render = () => {
        return(
            <div style={{width: "300px", border: "1px solid gray", margin: "10px", marginBottom: "40px"}}>
                {
                    this.players.map((player) => {
                        return(
                            <MemberProfile username={player.username} email={player.email} key={player.username} />
                        )
                    })
                }

                <center><Link to={"/room/" + this.room_id} ><b>Enter the Room </b> </Link></center>
            </div>
        )
    }
}