import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class RoomViewSmall extends Component {

    render = () => {
        return (
            <div className="w-[300px] relative h-[350px] bg-white text-blue-900 m-[10px] rounded-md
             border-t-light-br-color border-t-4 shadow-lg hover:shadow-dark-primary">
                <div className="pt-3 px-4">
                    <div className="flex items-center justify-center rounded-full m-auto w-[55px] h-[55px] text-light-blue border-2 border-light-blue">
                        <div className="">{this.props.roomNum}</div>
                    </div>

                    <div className=''>
                        <div className='flex justify-between my-4 items-center'>
                            <div>Team Players</div>
                            <div className='bg-light-secondary text-light-primary rounded-full w-8 h-8 flex items-center justify-center '><p>4</p></div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Created At</div>
                            <div>3-08-2322</div>
                        </div>

                        {/*<div> <b style={{float: "left"}}> {this.props.username} </b> <i style={{float: "right"}}>({this.props.email})</i> </div>*/}
                    </div>
                </div>

                <div
                    className="absolute bottom-0 text-center w-[100%] bg-light-secondary text-light-primary
                    rounded-b px-4 py-4">
                    <Link to={"/room/" + this.props.room_id}><b>Enter the Room </b> </Link>
                </div>
            </div>
        )
    }
}