import React from "react";


export default class MemberProfile extends React.Component{

    render(){
        return (
            <div>
                {this.props.full_name}
                <br/>
                {this.props.email}
                <br/>
            </div>
        )
    }

}