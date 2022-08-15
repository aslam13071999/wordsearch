import React from "react";


export default class MemberProfile extends React.Component{

    render(){
        return (
            <div>
                {this.props.username}
                <br/>
                {this.props.email}
                <br/>
            </div>
        )
    }

}