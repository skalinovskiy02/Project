import React, {useRef, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from "./components/LoginForm/LoginForm";
import StartPage from "./pages/MainPage/StartPage";
import AuthService from './services/AuthService'
import {useTypesSelector} from "./hooks/useTypesSelector";
import './styles/App.scss';
import './styles/Yandex.scss';
import Header from "./components/Header";
import RentPage from "./pages/RentPage";
import FlatPage from "./pages/FlatPage";
import {useYMaps} from "@pbe/react-yandex-maps";
import ProfilePage from "./pages/ProfilePage";


const App = () => {
    const yMapRef = useRef();
    const yMaps = useYMaps(['templateLayoutFactory', 'Placemark']);
    const showLoginForm = (path: string) => {
        return <LoginForm path={path}></LoginForm>
    }

    return (
        <div className={"app"}>
            <Router>
                    <Routes>
                        <Route path={"/"} element={<StartPage yMapRef={yMapRef} yMaps={yMaps}/>}/>
                        <Route path={"/login"} element={<LoginForm></LoginForm>}/>
                        <Route path={"/rent-page"} element={<RentPage/>}/>
                        <Route path={"/flat/:id"} element={<FlatPage/>}/>
                        <Route path={"/profile"} element={<ProfilePage/>}/>
                    </Routes>
            </Router>
        </div>
    )
}


export default App;