import React from "react";
import MemberProfile from "../member-profile/member-profile";
import {RoomApi} from "../../services/room-api";


export class MemberList extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.room_id;
        this.room_api = new RoomApi()
        this.state = {
            members: []
        }
    }

    getMembers = async () => {
        const response = await this.room_api.getJoinedPlayers(this.room_id)
        this.setState({
            members: response.data
        })
    }

    componentDidMount = async () => {
        await this.getMembers()
    }

    render() {
        let members = []
        for (let i = 0; i < this.state.members.length; ++i) {
            members.push(
                <MemberProfile
                    key={this.state.members[i].username}
                    email={this.state.members[i].email}
                    username={this.state.members[i].username}
                >
                </MemberProfile>
            )
        }
        return (
            <div>
                {members}
            </div>
        )
    }

}