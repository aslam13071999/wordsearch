import {Route, Routes} from "react-router-dom";
import React from "react";
import HomePage from "./pages/homepage/homepage";
import CategoryList from "./components/category/categories-list/categories-list";
import RoomViewPage from "./pages/room-view/room-view";
import RoomListPage from "./pages/room-list-view/room-list-view";
import UserSignInPage from "./pages/user-signin/user-signin";
import UserSignUpPage from "./pages/user-signup/user-signup";

export const ThemeContext = React.createContext("");
const App = () => {
    return (

        <ThemeContext.Provider value={""}>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/user/sign-in" element={<UserSignInPage/>}/>
                <Route path="/user/sign-up" element={<UserSignUpPage/>}/>
                <Route path="/room" element={<RoomListPage/>}/>
                <Route path="/room/:id" element={<RoomViewPage/>}/>
                <Route path="/categories" element={<CategoryList/>}/>
            </Routes>
        </ThemeContext.Provider>

    )
}

export default App;