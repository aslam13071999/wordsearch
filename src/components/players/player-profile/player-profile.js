import React from "react";


export default class PlayerProfile extends React.Component {

    render() {
        return (
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
        )
    }

}