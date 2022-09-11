import {Link} from "react-router-dom";
import React from "react";
import {useState, useContext} from 'react'
import {ThemeContext} from "../../../App";
import {themeChangeEventSubscriber} from "../../../services/subscriber";
import {AuthenticationService} from "../../../services/authentication";

const Header = (props) => {
    useContext(ThemeContext);
    const themeChangeService = new themeChangeEventSubscriber()
    const [enabled, setEnabled] = useState(false);
    const setThemestate = (val) => {
        setEnabled(val);
        const html = document.querySelector("html");
        console.log("updating the theme")
        if (val === true) {
            html.classList.add("dark")
            html.classList.add("bg-dark-bg-color")
            html.classList.add("text-dark-fg-color")
            html.classList.remove("bg-light-bg-color")
            html.classList.remove("text-light-fg-color")
        } else {
            html.classList.remove("dark")
            html.classList.remove("bg-dark-bg-color")
            html.classList.remove("text-dark-fg-color")
            html.classList.add("bg-light-bg-color")
            html.classList.add("text-light-fg-color")
        }
        const st = getComputedStyle(html)
        const bgColor = st.backgroundColor
        const textColor = st.color
        console.log("theme changed", bgColor, textColor)
        themeChangeService.notify(bgColor, textColor)
    }
    return (
        <div
            className={`sticky bg-gradient-to-l from-sky-400 via-sky-400 to-sky-400
             boxShadow opacity
             flex items-center justify-between 
             h-16 px-10 md:px-12 w-screen`}>
            <div>
                <Link to={"/"}>
                    <span className='span font-bold text-2xl text-light-bg-color dark:text-dark-bg-color
                    font-title tracking-wide'> MULTI player </span>
                </Link>
            </div>
            <div className="flex flex-row-reverse gap-6 font-bold justify-between">
                <button onClick={new AuthenticationService().authenticate} > Sign In </button>

                <button onClick={() => setThemestate(!enabled)}>
                    {
                        enabled ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"  fill="currentColor">
                                <path fillRule="evenodd"  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                            </svg>
                        )

                    }
                </button>
                {/*<div>*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">*/}
                {/*        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>*/}
                {/*    </svg>*/}
                {/*</div>*/}


            </div>

        </div>
    )
}

export default Header;