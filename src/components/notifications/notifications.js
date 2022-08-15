import React from "react";


export  class Notifications extends React.Component{
    constructor(props){
        super(props)
        this.room_id = this.props.room_id;
    }

    render(){
        return (
            <div>
                notifications
            </div>
        )
    }

}