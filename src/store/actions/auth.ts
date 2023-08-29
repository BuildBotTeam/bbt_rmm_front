import axios, {AxiosError} from "axios";
import {IAuth, IAuthResponse} from "../../models/IAuth";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api, {apiError} from "../../api";

let interceptor = 0;

export const login = createAsyncThunk(
    'login',
    async (post: IAuth, thunkAPI) => {
        try {
            const server = post.server
            delete post.server
            const {data} = await axios.post<IAuthResponse>(server + '/backend/auth/login/', post)
            localStorage.setItem('user', data.username)
            localStorage.setItem('token', data.token)
            localStorage.setItem('server', server!)
            interceptor = api.interceptors.request.use((config: any) => {
                config.headers["Authorization"] = `Token ${data.token}`;
                return config
            })
            api.defaults.baseURL = server + '/backend/api'
            return {username: data.username, token: data.token, interceptor: interceptor}
        } catch (e) {
            return thunkAPI.rejectWithValue({code: 0, message: 'Неверный логин или пароль'})
        }
    }
)

export const logout = createAsyncThunk(
    'logout',
    async (_, thunkAPI) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // const server = localStorage.getItem('server')
        // try {
        //     await api.post(server + "/backend/auth/logout/", {})
        //     api.interceptors.request.eject(interceptor)
        //     return {}
        // } catch (e) {
        api.interceptors.request.eject(interceptor)
        return {}
        // return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        // }
    }
)

export const checkToken = createAsyncThunk(
    'checkToken',
    async (_, thunkAPI) => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const server = localStorage.getItem('server')
        if (token) {
            try {
                await axios.post<IAuthResponse>(server + '/backend/auth/check_token/', {},{headers: {Authorization: `Token ${token}`}})
                interceptor = api.interceptors.request.use((config: any) => {
                    config.headers["Authorization"] = `Token ${token}`;
                    return config
                })
                api.defaults.baseURL = server + '/backend/api'
                return {username: username, token: token, interceptor: interceptor}
            } catch (e) {
                thunkAPI.dispatch(logout());
                return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
            }
        } else if (token === undefined) {
            return thunkAPI.rejectWithValue({})
        }
        return thunkAPI.rejectWithValue({})
    }
)