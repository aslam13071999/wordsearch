import React from "react";


export default class MemberProfile extends React.Component {

    render() {
        return (
            <div style={{padding: "10px"}}>
                <div> <b style={{float: "left"}}> {this.props.username} </b> <i style={{float: "right"}}>({this.props.email})</i> </div>
            </div>
        )
    }

}