import React, {useState} from 'react';
import {Header} from "./components/layout/Header";
import './components/layout/Header.css';
import {Map} from "./components/Map/Map";
import {SearchContext} from "./contexts/search.contexts";
import {AuthContext} from "./contexts/auth.contexts";
import {Route, Routes} from "react-router-dom";
import {AddForm} from "./components/AddForm/AddForm";
import {AdminPanel} from "./components/AdminPanel/AdminPanel";
import {LoginPopup} from "./components/Login/LoginPopup";

export const App = () => {
    const [search, setSearch] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <SearchContext.Provider value={{search, setSearch}}>
            <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
                <Header/>
                <Routes>
                    <Route path='/' element={<Map/>}/>
                    <Route path='/add' element={<AddForm/>}/>
                    <Route path='/login' element={<LoginPopup/>}/>
                    <Route path='/admin' element={<AdminPanel/>}/>
                </Routes>

            </AuthContext.Provider>
        </SearchContext.Provider>
    );
}


