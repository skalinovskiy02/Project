import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import AuthService from "../services/AuthService";
import {useTypesSelector} from "../hooks/useTypesSelector";
import LoginForm from "./LoginForm/LoginForm";



const MyList = () => {
    const dispatcher = useDispatch();
    const isAuth = useTypesSelector(state => state.auth.isAuth)

    return (
        <ul className="navbar">
            <li><Link className="Link" to='/'>Главная</Link></li>
            <li><Link className="Link" to='/profile'>Профиль</Link></li>
            <li><Link className="Link" to='/rent-page'>Сдать жильё</Link></li>
            <hr className=""/>
            <li>
                {isAuth
                    ? <Link
                        className="Link" to={'/'}
                        onClick={() => {
                            AuthService.logout(dispatcher)
                        }}>Выйти</Link>
                    :
                    <Link
                        className="Link" to={'/login'}
                    >Войти</Link>
                }
            </li>
        </ul>
    );
};

export default MyList;