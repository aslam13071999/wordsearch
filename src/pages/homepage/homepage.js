import React from 'react';
import {Link} from "react-router-dom";
import withRouter from "../../routerUtil";
import Header from "../../components/site/header/header";

class HomePage extends React.Component {
    render() {
        return (
            <div className="bg-light-bg-color dark:bg-dark-bg-color text-light-fg-color dark:text-dark-fg-color">
                <Header/>
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <div className="text-[30px] link-hover mb-5"><Link to={"/room"}> Rooms </Link> </div>
                    <div className="text-[30px]	link-hover"><Link to={"/categories"}> Categories </Link> </div>
                </div>
            </div>
        );

    }
}

export default withRouter(HomePage)