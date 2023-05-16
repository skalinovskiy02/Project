import {IUser} from "../models/IUser";
import AuthApi from "../api/AuthApi";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import {Dispatch} from "react";
import {AuthAction} from "../models/store/AuthStore";
import {Exception} from "sass";

class AuthService {

    async login(email: string, password: string, dispatch: Dispatch<AuthAction>):Promise<string>{
        try {
            const response = await AuthApi.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            const action: AuthAction = {
                type: 'SET-auth',
                state: {...response.data, isAuth: true}
            }
            dispatch(action);
            return "success"
        } catch (e: any) {
            return e.response.data.message
        }

    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthApi.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return 'success';
        } catch (e: any) {
            return e.response.data.message;
        }
    }

    async logout(dispatch: Dispatch<AuthAction>) {
        try {
            const response = await AuthApi.logout();
            localStorage.removeItem('token');
            const action: AuthAction = {
                type: 'SET-auth',
                state: {
                    isAuth: false,
                    user: null,
                    accessToken: null
                }
            }
            dispatch(action);
            console.log(response)
        } catch (e: any) {
            console.log(e.response?.data?.message);

        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {

            console.log(e);
        } finally {
        }
    }
}

export default new AuthService();