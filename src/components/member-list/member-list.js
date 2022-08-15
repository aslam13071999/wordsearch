import React from "react";
import MemberProfile from "../member-profile/member-profile";


export class MemberList extends React.Component {

    constructor(props) {
        super(props)
        this.room_id = this.props.room_id;
        this.state = {
            members: []
        }
    }

    getMembers() {
        this.setState({
            members: [
                {
                    "profile_photo": "https://www.freecodecamp.org/news/content/images/size/w60/2022/06/1654890413623.jpg",
                    "full_name": "ASIF MOHAMMED",
                    "email": "alonecoder1337@gmail.com"
                }
            ]
        })
    }

    componentDidMount() {
        this.getMembers()
    }

    render() {
        let members = []
        for (let i = 0; i < this.state.members.length; ++i) {
            members.push(
                <MemberProfile
                    key={this.state.members[i].email}
                    email={this.state.members[i].email}
                    full_name={this.state.members[i].full_name}
                    profile_photo={this.state.members[i].profile_photo} 
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