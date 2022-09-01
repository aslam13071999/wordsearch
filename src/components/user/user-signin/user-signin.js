import {Component} from "react";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDEMhLfRopmztGZ-BYpTq1qoqN8ycYhxhM",
    authDomain: "wordsearch-mp.firebaseapp.com",
    projectId: "wordsearch-mp",
    storageBucket: "wordsearch-mp.appspot.com",
    messagingSenderId: "47371325425",
    appId: "1:47371325425:web:7c84726abe0be32c063e50",
    measurementId: "G-WC64DY01DR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export class UserSignInComponent extends Component {

    signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                console.log(token)
                const user = result.user;
                console.log(user)
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
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