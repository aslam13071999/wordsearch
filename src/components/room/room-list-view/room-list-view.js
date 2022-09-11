import {Component} from "react";
import {RoomApi} from "../../../services/room-api";
import RoomViewSmall from "../room-view-small/room-view-small";
import withRouter from "../../../routerUtil";


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
                <div className="text-center mt-3 mb-8">
                    <button onClick={this.createRoom}  className="
                    mt-10 py-2 px-4 border-2 border-solid
                    border-light-primary hover:border-light-fg-color bg-transparent
                    text-light-fg-color dark:text-dark-fg-color hover:dark:bg-dark-primary hover:dark:text-dark-bg-color
                    ">
                        Create Room </button>
                </div>

                <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-y-4 md:px-10 lg:px-20 justify-center content-center">
                    {
                        this.state.rooms !== null && this.state.rooms.map((room_data,roomNum) => {
                            return(
                                <RoomViewSmall room_info={room_data} key={"room" + room_data.id} roomNum={roomNum+1}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(RoomListView)