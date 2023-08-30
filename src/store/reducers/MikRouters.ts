import {createSlice} from "@reduxjs/toolkit";
import {createMikRouters, getMikRouters} from "../actions/mikRouters";
import {MikRouterType} from "../../models/IMRouter";


interface IAuthState {
    mikRouters: MikRouterType[]
}

const initialState: IAuthState = {
    mikRouters: []
}

export const mRouterSlice = createSlice({
    name: 'mRouter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMikRouters.fulfilled, (state, {payload}) => {
            state.mikRouters = payload
        })
        builder.addCase(createMikRouters.fulfilled, (state, {payload}) => {
            state.mikRouters = [payload, ...state.mikRouters]
        })
    }
})

export default mRouterSlice.reducer