import {Component} from "react";


export class UserSignInComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "asif",
            password: "rgukt123"
        }
    }

    updateUserName = (e) => this.setState({...this.state, username: e.target.value})
    updatePassword = (e) => this.setState({...this.state, password: e.target.value})

    render() {
        return (
                <div className={"h-64 w-120 p-10 border-2 shadow-lg"}>
                    <div className={"grid grid-cols-6 gap-6 p-1"}>
                        <div className={"col-span-2"}>
                            <div className={"font-semibold text-md uppercase align-middle p-2"}> Username</div>
                        </div>
                        <div className={"col-span-4"}>
                            <input className={"w-full p-2 border-2 "} type={"text"} value={this.state.username}
                                   onChange={this.updateUserName}/>
                        </div>
                        <div className={"col-span-2"}>
                            <div className={"font-semibold text-md uppercase"}> Password</div>
                        </div>
                        <div className={"col-span-4"}>
                            <input className={"w-full p-2 border-2"} type={"password"} value={this.state.password}
                                   onChange={this.updatePassword}/>
                        </div>
                    </div>
                    <div className={"grid grid-cols-3 mt-6"}>
                        <div className={"col-start-2 col-span-1  w-full text-center p-1 " +
                            " border-2 rounded-md cursor-pointer border-light-primary dark:border-dark-primary" +
                            " text-light-fg-color " +
                            " bg-light-primary dark:bg-dark-primary"}>
                            Sign Up
                        </div>
                    </div>
                </div>
        )
    }

}