import React from 'react';
import {Link} from "react-router-dom";
import withRouter from "../../routerUtil";
import Header from "../../components/site/header/header";

class HomePage extends React.Component {
    render() {
        return (
            <div className="bg-light-bg-color dark:bg-dark-bg-color text-light-fg-color dark:text-dark-fg-color">
                <Header/>
                <div className="flex h-screen justify-center items-center">
                    <div className={"grid grid-cols-1"}>
                        <div className="text-2xl link-hover mb-5 w-full text-center"><Link to={"/room"}> Rooms </Link>
                        </div>

                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(HomePage)