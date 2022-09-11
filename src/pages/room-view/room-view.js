import Header from "../../components/site/header/header";
import RoomView from "../../components/room/room-view/room-view";

import { useParams } from "react-router-dom";

export default function RoomViewPage() {
    let params = useParams();
    return (
        <div>
            <Header />
            <RoomView room_id={params.id} />
        </div>
    );
}