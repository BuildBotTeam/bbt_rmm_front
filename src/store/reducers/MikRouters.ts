import {createSlice} from "@reduxjs/toolkit";
import {
    createMikRouters,
    deleteMikRouters,
    getMikRouter,
    getMikRouters,
    updateMikRouters
} from "../actions/mikRouters";
import {MikRouterType} from "../../models/IMRouter";
import {deleteElementFromList, updateElementInList} from "../../utils";


interface IAuthState {
    mikRouters: MikRouterType[]
    mikRouter: MikRouterType | null
}

const initialState: IAuthState = {
    mikRouters: [],
    mikRouter: null,
}

export const mRouterSlice = createSlice({
    name: 'mRouter',
    initialState,
    reducers: {
        setMikRouter: (state, {payload}) => {
            state.mikRouter = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMikRouters.fulfilled, (state, {payload}) => {
            state.mikRouters = payload
        })
        builder.addCase(getMikRouter.fulfilled, (state, {payload}) => {
            state.mikRouter = payload
        })
        builder.addCase(createMikRouters.fulfilled, (state, {payload}) => {
            state.mikRouters = [payload, ...state.mikRouters]
        })
        builder.addCase(updateMikRouters.fulfilled, (state, {payload}) => {
            state.mikRouters = updateElementInList(state.mikRouters, payload)
        })
        builder.addCase(deleteMikRouters.fulfilled, (state, {payload}) => {
            state.mikRouters = deleteElementFromList(state.mikRouters, payload)
        })
    }
})

export const {setMikRouter} = mRouterSlice.actions
export default mRouterSlice.reducer