import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
export default class AuthApi {

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        let response = await $api.post<AuthResponse>(
                '/login',
                {email, password});
        return response;
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        let response = await $api.post<AuthResponse>(
            '/registration',
            {email, password});
        return response;
    }

    static async logout(): Promise<void>{
        let resp:any = await $api.post('/logout');
        return resp;
    }
}