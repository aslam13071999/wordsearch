import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
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
export const auth = getAuth(app);
getAnalytics(app);
const provider = new GoogleAuthProvider();


export class AuthenticationService {

    constructor() {
        if (AuthenticationService._instance) {
            return AuthenticationService._instance
        }
        AuthenticationService._instance = this
        this.loadUserInfoFromLocalStorage()
    }

    loadUserInfoFromLocalStorage = () => {
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    saveUserInfoToLocalStorage = (data) => {
        localStorage.setItem('user', JSON.stringify({
            display_name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL
        }))
    }

    authenticate = async () => {
        const result = await signInWithPopup(auth, provider)
        this.saveUserInfoToLocalStorage(result)
        this.loadUserInfoFromLocalStorage()
    }

    signOut = async () => {
        localStorage.removeItem('user')
        this.user = null
        await auth.signOut()
    }

    getUser = () => {
        return this.user
    }

    getAccessToken = async () => {
        const token = await auth.currentUser.getIdToken()
        return token
    }

    getAuthHeaders = async () => {
        const access_token = await this.getAccessToken()
        return {
            "Authorization": "Token " + access_token,
        }
    }
}