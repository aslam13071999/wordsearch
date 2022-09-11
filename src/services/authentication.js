import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

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

export class AuthenticationService {

    constructor() {
        if (AuthenticationService._instance) {
            return AuthenticationService._instance
        }
        AuthenticationService._instance = this
        this.access_token = localStorage.getItem('token')
        this.user = localStorage.getItem('user')
    }

    authenticate = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        this.user = result.user
        this.access_token = this.user.accessToken

        localStorage.setItem('user', this.user)
        localStorage.setItem('token', this.access_token)

        auth.onAuthStateChanged(async (user) => {
            this.access_token = await user.getIdToken();
            localStorage.setItem('token', this.access_token)
        })

        return this.user
    }


    getAccessToken = async () => {
        if (this.access_token == null) await this.authenticate()
        return this.access_token
    }

    getUser = async () => {
        if (this.user == null) await this.authenticate()
        return this.user
    }

    getAuthHeaders = async () => {
        const access_token = await this.getAccessToken()
        return {
            "Authorization": "Token " + access_token,
        }
    }
}