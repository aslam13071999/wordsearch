import Header from "../../components/site/header/header";

import {UserSignInComponent} from "../../components/user/user-signin/user-signin";

export default function UserSignInPage() {
    return (
        <div>
            <Header/>
            <div className={"flex h-screen justify-center mt-20"}>
                <UserSignInComponent/>
            </div>
        </div>
    );
}