import {Component} from "react";
import {RoomApi} from "../../services/room-api";
import RoomViewSmall from "../room-view-small/room-view-small";
import withRouter from "../../routerUtil";


class RoomListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: null
        }
        this.room_api = new RoomApi()
    }

    fetchRooms = async () => {
        const response = await this.room_api.listRooms()
        this.setState({
            rooms: response.data
        })
    }


    createRoom = async () => {
        const response = await this.room_api.createRoom()
        this.props.router.navigate("/room/" + response.data.id)
    }

    componentDidMount = async () => {
        await this.fetchRooms()
    }

    render = () => {
        return (
            <div>
                <button onClick={this.createRoom} >
                    Create Room </button>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around"}}>
                    {
                        this.state.rooms !== null && this.state.rooms.map((room_data) => {
                            return(
                                <RoomViewSmall players={room_data.players} room_id={room_data.id} key={"room" + room_data.id}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(RoomListView)