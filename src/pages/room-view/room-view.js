import Header from "../../components/site/header/header";
import {RoomViewComponent} from "../../components/room/room-view/room-view-component";

import { useParams } from "react-router-dom";

export default function RoomViewPage() {
    let params = useParams();
    return (
        <div>
            <Header />
            <RoomViewComponent room_id={params.id} />
        </div>
    );
}