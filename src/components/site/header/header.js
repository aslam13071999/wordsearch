import {Link} from "react-router-dom";
import React from "react";
import { useState,useContext } from 'react'
import { Switch } from '@headlessui/react';
import {ThemeContext} from '../../layoyt/Layout';

const Header = (props)=>{
    const theme = useContext(ThemeContext);
    const [enabled, setEnabled] = useState(false);
    const setThemestate = (val)=>{
        setEnabled(val);
        props.changeTheme(val?'dark':'light')
        const html = document.querySelector("html");
        console.log("updating the theme")
        if (val === true) {
            html.classList.add("dark")
        } else {
            html.classList.remove("dark")
        }
    }
    return(
        <div className={`sticky bg-${theme}-primary boxShadow top-0 z-[1000]  flex h-[72px] items-center justify-between px-10 md:px-12 text-${theme}-secondary`}>
            <div>
                <Link to={"/"}>
                    <span className='span font-bold text-xl'>MULTIplayer</span>
                </Link>
            </div>
            <div className="flex items-center w-[200px] justify-between">
                <span>Dark</span>
                <Switch
                    checked={enabled}
                    onChange={(val)=>setThemestate(val)}
                    className={`${
                        enabled ? 'bg-light-secondary' : 'bg-light-blue'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-light-lt-gray`}
                    />
                </Switch>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                </div>


            </div>

        </div>
    )
}

export default Header;