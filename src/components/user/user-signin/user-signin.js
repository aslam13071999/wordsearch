import {Component} from "react";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export class UserSignInComponent extends Component {

    signIn = () => {

    }

    render() {
        return (
            <div>
                <div className={"h-64 w-120 p-10 border-2 shadow-lg"}>
                    <div className={"grid grid-cols-3 mt-6"}>
                        <div className={"col-start-2 col-span-1  w-full text-center p-1 " +
                            " border-2 rounded-md cursor-pointer border-light-primary dark:border-dark-primary" +
                            " text-light-fg-color " +
                            " bg-light-primary dark:bg-dark-primary"} onClick={this.signIn}>
                            Sign In
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}