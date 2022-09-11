import Header from "../../components/site/header/header";

import Styles from "../../constants/styles";
import {Component} from "react";
import withRouter from "../../routerUtil";
import {RoomListView} from "../../components/room/room-list-view/room-list-view";
import {RoomApi} from "../../services/room-api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

class RoomListPage extends Component {

    constructor(props) {
        super(props);
        this.room_api = new RoomApi();
        this.state = {
            rooms: [],
            room_id_input: ""
        }
    }

    componentDidMount = async () => {
        await this.fetchRooms()
    }

    fetchRooms = async () => {
        const response = await this.room_api.listRooms()
        this.setState({
            ...this.state,
            rooms: response.data
        })
    }

    createRoom = async () => {
        const response = await this.room_api.createRoom()
        this.props.router.navigate("/room/" + response.data.id)
    }


    joinRoom = async () => {
        await this.room_api.join(this.state.room_id_input)
        this.props.router.navigate("/room/" + this.state.room_id_input)
    }

    changeRoomIdInput = (e) => {
        this.setState({
            ...this.state,
            room_id_input: e.target.value
        })
    }

    render = () => {
        console.log("rendering")
        return (
            <div>
                <Header/>
                <div
                    className="m-8 md:mx-5 lg:my-8 lg:mx-5 flex justify-evenly">
                    <button onClick={this.createRoom} className={Styles.CLASSES_FOR_OUTLINE_BUTTON + " px-8 py-2"}>
                        Create Room
                    </button>
                    <div className={""}>
                        <div className={"flex"}>
                            <input className={"border-2 flex-auto w-48 p-2"} value={this.state.room_id_input} onChange={this.changeRoomIdInput}/>
                            <div className={Styles.CLASSES_FOR_OUTLINE_BUTTON + " mx-1 px-8 py-2 text-center bg-light-primary cursor-pointer"} onClick={this.joinRoom}>
                                <FontAwesomeIcon icon={faArrowRight}/> Join Room
                            </div>
                        </div>
                    </div>
                </div>
                <RoomListView rooms={this.state.rooms}/>
            </div>
        );
    }
}

export default withRouter(RoomListPage)