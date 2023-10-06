import axios, {AxiosError} from "axios";
import {IAuth} from "../../models/IAuth";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api, {apiError, getHostname} from "../../api";

let interceptor = 0;

export const login = createAsyncThunk(
    'login',
    async (post: IAuth, thunkAPI) => {
        try {
            const {data} = await axios.post<{
                username: string,
                token: string
            }>(getHostname() + '/backend/auth/login/', post)
            localStorage.setItem('user', data.username)
            localStorage.setItem('token', data.token)
            interceptor = api.interceptors.request.use((config: any) => {
                config.headers["Authorization"] = `Token ${data.token}`;
                return config
            })
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
        api.interceptors.request.eject(interceptor)
        return {}
    }
)

export const checkToken = createAsyncThunk(
    'checkToken',
    async (_, thunkAPI) => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
            try {
                await axios.post<{
                    username: string,
                    token: string
                }>(getHostname() + '/backend/auth/check_token/', {}, {headers: {Authorization: `Token ${token}`}})
                interceptor = api.interceptors.request.use((config: any) => {
                    config.headers["Authorization"] = `Token ${token}`;
                    return config
                })
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