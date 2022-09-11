import {Component} from "react";
import RoomViewSmall from "../room-view-small/room-view-small";

export class RoomListView extends Component {

    render = () => {
        return (
            <div>
                <div className="flex content-center justify-evenly flex-wrap">
                    {
                        this.props.rooms !== null && this.props.rooms.map((room_data, roomNum) => {
                            return (
                                <RoomViewSmall
                                    room_info={room_data}
                                    key={"room" + room_data.id}
                                    roomNum={roomNum + 1} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
