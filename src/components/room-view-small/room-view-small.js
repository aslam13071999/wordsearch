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
            <div className="w-[300px] h-[350px] bg-white text-blue-900 m-[10px] rounded-md border-t-amber-200 border-t-4 hover:shadow-lg hover:shadow-orange-600">
                {
                    this.players.map((player) => {
                        return(
                            <MemberProfile username={"pavani"} email={player.email} key={player.username} />
                        )
                    })
                }

                <center><Link to={"/room/" + this.room_id} ><b>Enter the Room </b> </Link></center>
            </div>
        )
    }
}