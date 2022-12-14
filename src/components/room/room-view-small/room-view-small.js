import React, {Component} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import Styles from "../../../constants/styles";
import {ApiConfig} from "../../../config/api_config";
import {RoomApi} from "../../../services/room-api";


export default class RoomViewSmall extends Component {

    constructor(props) {
        super(props);

        this.room_api = new RoomApi()
        this.state = {
            copied: false,
            is_deleted: false
        }
    }

    deleteRoom = () => {
        this.room_api.deleteRoom(this.props.room_info.id)
        this.setState({
            ...this.state,
            is_deleted: true
        })
    }

    oncopy = (e) => {
        console.log("copy",);
        e.preventDefault();
        console.log("copy", e.clipboardData.getData("Text"));
        window.clipboardData.setData("Text", ApiConfig.FE_API_URL + "/room/" + this.props.room_info.id + "/");
        this.setState({
            ...this.state,
            copied: true
        })
    }

    render = () => {
        if(this.state.is_deleted) return this.render_deleted()
        return this.render_not_deleted()
    }

    render_deleted = () => {
        return
    }

    render_not_deleted = () => {
        const closeButtonIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"/>
            </svg>
        )
        const copyIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                 fill="currentColor">
                <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"/>
            </svg>
        )
        const anotherCopyIcon = (
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
        )
        return (
            <div className={Styles.CLASSES_FOR_CARD + "w-[300px] relative h-[300px] m-[10px]"}>
                <div className="pt-3 px-4">
                    <div className="text-right opacity-[0.5] hover:opacity-[1] inline-block cursor-pointer"
                         onClick={this.deleteRoom}>
                        {closeButtonIcon}
                    </div>
                    <div className=''>
                        <div className='flex justify-between my-2 items-center'>
                            <div>No of Players</div>
                            <div
                                className='bg-light-primary text-light-fg-color rounded-full w-8 h-8 flex items-center justify-center'>
                                <p>{this.props.room_info.players.length}</p>
                            </div>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <div>Created By</div>
                            <div>{this.props.room_info.created_by.display_name}</div>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <div>Created At</div>
                            <div>{moment(this.props.room_info.created_at).format('DD-MM-YYYY HH:mm A')}</div>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <div>RoomID</div>
                            <div>{this.props.room_info.id}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                            <a href={"/room/"} className="mr-2">link to join </a>
                            <button onClick={this.oncopy} className="hover:text-light-blue">
                                {this.state.copied ? copyIcon : anotherCopyIcon}
                            </button>
                        </div>

                    </div>
                </div>
                <Link to={"/room/" + this.props.room_info.id}>
                    <div className={Styles.CLASSES_FOR_EXPANDED_BUTTON + " absolute bottom-0 p-4"}>
                        <b>Enter the Room </b>
                    </div>
                </Link>
            </div>
        )
    }
}