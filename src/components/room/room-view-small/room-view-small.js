import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class RoomViewSmall extends Component {

    oncopy=(e)=>{
        console.log("copy",);
        e.preventDefault()
        e.clipboardData.setData("Text", "https://tailwindcss.com/")
    }

    render = () => {
        return (
            <div className="w-[300px] relative h-[300px] bg-white m-[10px] rounded-md
              border-t-4 border-light-blue border shadow-lg hover:shadow-dark-primary">
                <div className="pt-3 px-4">
                    <div className="text-right opacity-[0.5] hover:opacity-[1] inline-block cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <div className=''>
                        <div className='flex justify-between my-2 items-center'>
                            <div>Team Players</div>
                            <div
                                className='bg-light-blue text-light-primary rounded-full w-8 h-8 flex items-center justify-center'>
                                <p>4</p></div>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <div>Created At</div>
                            <div>3-08-2322</div>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <div>RoomID</div>
                            <div>1-672-099</div>
                        </div>
                        <div className="flex mb-2"><a href="#" className="mr-2">link to join

                        </a> <button onClick={(e)=>this.oncopy(e)} className="hover:text-light-blue"><svg xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        strokeWidth={2}>
                                   <path strokeLinecap="round" strokeLinejoin="round"
                                         d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                            </svg></button></div>



                        {/*<div> <b style={{float: "left"}}> {this.props.username} </b> <i style={{float: "right"}}>({this.props.email})</i> </div>*/}
                    </div>
                </div>

                <div
                    className="absolute bottom-0 text-center w-[100%] bg-light-blue text-light-primary
                    rounded-b px-4 py-4">
                    <Link to={"/room/" + this.props.room_id}><b>Enter the Room </b> </Link>
                </div>
            </div>
        )
    }
}