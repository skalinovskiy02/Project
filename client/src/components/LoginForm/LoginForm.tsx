import React, {Dispatch, FC, useContext, useEffect, useRef, useState} from 'react';
import './style.css';
import AuthService from "../../services/AuthService";
import {useDispatch} from "react-redux";
import {AuthAction} from "../../models/store/AuthStore";
import {useNavigate} from "react-router-dom";

interface LoginFormProps {
    path?: string
}

const LoginForm: FC<LoginFormProps> = ({path}) => {
    const form: HTMLElement | null = document.getElementById('login-form-wrapper');
    const dispatch: Dispatch<AuthAction> = useDispatch();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [suc, setSuc] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        form?.classList.add('active');
        form?.addEventListener('click', (e) => {
            if (e.target !== form) return;
            form?.classList.remove('active')
            navigate('/')
        })
    }, [form])

    let tryAction = (action: Promise<string>) => {
        action.then(a => {
            if (a !== "success") {
                setSuc(a);
            } else {
                form?.classList.remove('active');
                if (path) {
                    navigate(path)
                }
            }
        });
    };

    return (
        <div id={"login-form-wrapper"} className={"login-form-wrapper"}>
            <form className={"form"}>
                <div className="inputs">
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder={'Email'}/>

                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder={'password'}/>
                </div>
                <div className="buttons">
                    <button type={'submit'} onClick={(e) => {
                        e.preventDefault();
                        tryAction(AuthService.login(email, password, dispatch));
                    }}>
                        Войти
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        tryAction(AuthService.registration(email, password))
                    }}>
                        Регистрация
                    </button>
                </div>
                <div>{suc}</div>
            </form>
        </div>

    );
};

export default LoginForm;