import {createSlice} from "@reduxjs/toolkit";
import {getMRouters} from "../actions/mRouters";
import {MRouterType} from "../../models/IMRouter";


interface IAuthState {
    mRouters: MRouterType[]
}

const initialState: IAuthState = {
    mRouters: []
}

export const mRouterSlice = createSlice({
    name: 'mRouter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMRouters.fulfilled, (state, {payload}) => {
            state.mRouters = payload
        })
    }
})

export default mRouterSlice.reducer