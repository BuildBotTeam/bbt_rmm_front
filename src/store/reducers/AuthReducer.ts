import {AnyAction, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {check_secret, checkToken, login, logout} from "../actions/auth";
import api, {IApiError} from "../../api";
import {INavItem, defaultNavList} from "../../App";


interface IAuthState {
    username: string | null
    token: string | null
    navList: INavItem[]
    isLoading: boolean
    error: IApiError | null
    interceptor: number
    isAuth: boolean
    authState: boolean
    check_secret: boolean
}

const initialState: IAuthState = {
    username: null,
    token: null,
    navList: [],
    isLoading: false,
    error: null,
    interceptor: 0,
    isAuth: false,
    authState: true,
    check_secret: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, {payload}) => {
            state.isLoading = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.username = payload.username
            state.isLoading = false
            state.error = null
            state.authState = false
            state.check_secret = true
        })
        builder.addCase(check_secret.pending, (state) => {
            state.authState = true
        })
        builder.addCase(check_secret.fulfilled, (state, {payload}) => {
            state.token = payload.token
            state.navList = defaultNavList
            state.interceptor = payload.interceptor
            state.isLoading = false
            state.error = null
            state.isAuth = true
            state.authState = false
            state.check_secret = false
        })
        builder.addCase(checkToken.pending, (state) => {
            state.authState = true
        })
        builder.addCase(checkToken.fulfilled, (state, {payload}) => {
            state.username = payload?.username || null
            state.token = payload?.token || null
            state.navList = defaultNavList
            state.interceptor = payload?.interceptor || 0
            state.isLoading = false
            state.error = null
            state.isAuth = true
            state.authState = false
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.token = null
            state.username = null
            state.isLoading = false
            state.error = null
            state.isAuth = false
            state.authState = false
        })

        builder.addMatcher(isFulfilled, (state) => {
            state.isLoading = false
            state.error = null
        })
        builder.addMatcher(isPending, (state) => {
            state.isLoading = true
        })
        builder.addMatcher(isRejected, (state, action: AnyAction) => {
            if (action.payload?.code === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                api.interceptors.request.eject(state.interceptor)
                state.username = null
                state.token = null
                state.isAuth = false
            }
            state.isLoading = false
            state.authState = false
            state.error = action.payload
        })
    }
})

export const {setLoading} = authSlice.actions
export default authSlice.reducer