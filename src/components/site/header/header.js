import {Link} from "react-router-dom";
import React, {Component} from "react";
import {auth, AuthenticationService} from "../../../services/authentication";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            light: true,
            user: null
        }
        this.setLightTheme()
    }

    setLightTheme = () => {
        const html = document.querySelector("html");
        html.classList.remove("dark")
        html.classList.remove("bg-dark-bg-color")
        html.classList.remove("text-dark-fg-color")
        html.classList.add("bg-light-bg-color")
        html.classList.add("text-light-fg-color")
        if (this.state.light === false) {
            this.setState({
                ...this.state,
                light: true
            })
        }
    }

    setDarkTheme = () => {
        const html = document.querySelector("html");
        html.classList.add("dark")
        html.classList.add("bg-dark-bg-color")
        html.classList.add("text-dark-fg-color")
        html.classList.remove("bg-light-bg-color")
        html.classList.remove("text-light-fg-color")
        if (this.state.light === true) {
            this.setState({
                ...this.state,
                light: false
            })
        }
    }

    changeTheme = () => {
        if (this.state.light) this.setDarkTheme()
        else this.setLightTheme()
    }

    componentDidMount = () => {
        this.unsubscribe = auth.onAuthStateChanged((user) => {
            if (user == null) {
                this.setState({
                    ...this.state,
                    user: null
                })
            } else {
                this.setState({
                    ...this.state,
                    user: {
                        email: user.email,
                        display_name: user.displayName,
                        photo_url: user.photoURL
                    }
                })
            }
        })
    }
    componentWillUnmount = () => {
        this.unsubscribe();
    }

    render = () => {
        const lightIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"/>
            </svg>
        )

        const darkIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
        )
        return (

            <div className={`sticky bg-gradient-to-l from-sky-400 via-sky-400 to-sky-400 boxShadow opacity flex items-center justify-between  h-16 px-10 md:px-12 w-screen`}>
                <div>
                    <Link to={"/"}>
                    <span className='span font-bold text-2xl text-light-bg-color dark:text-dark-bg-color
                    font-title tracking-wide'> MULTI player </span>
                    </Link>
                </div>
                <div className="flex flex-row-reverse gap-6 font-bold justify-between">
                    {
                        this.state.user == null && <button onClick={new AuthenticationService().authenticate}> Sign In</button>
                    }
                    {
                        this.state.user !== null && <button onClick={new AuthenticationService().signOut}> Sign Out</button>
                    }
                    <button onClick={this.changeTheme}>
                        {
                            this.state.light ? lightIcon : darkIcon
                        }
                    </button>


                </div>

            </div>
        )
    }

}

export default Header;