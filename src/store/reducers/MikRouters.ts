import {createSlice} from "@reduxjs/toolkit";
import {
    createMikRouters,
    deleteMikRouters,
    getMikRouter,
    getMikRouters, sendCommandMikRouters,
    updateMikRouters
} from "../actions/mikRouters";
import {MikRouterType, ScriptResult} from "../../models/IMRouter";
import {deleteElementFromList, updateElementInList} from "../../utils";


interface IAuthState {
    mikRouters: MikRouterType[]
    mikRouter: MikRouterType | null
    selectMikRouters: MikRouterType[]
    scriptResult: ScriptResult | null
}

const initialState: IAuthState = {
    mikRouters: [],
    mikRouter: null,
    selectMikRouters: [],
    scriptResult: null
}

export const mRouterSlice = createSlice({
    name: 'mRouter',
    initialState,
    reducers: {
        setMikRouter: (state, {payload}) => {
            state.mikRouter = payload
        },
        receiveMikRouter: (state, {payload}) => {
            state.mikRouters = updateElementInList(state.mikRouters, payload)
        },
        clearSelectMikRouters: (state) => {
            state.selectMikRouters = []
            state.scriptResult = null
        },
        setCommandResult: (state, {payload}) => {
            if (payload) {
                if (state.scriptResult) state.scriptResult.result += payload.result
                else state.scriptResult = payload
            } else state.scriptResult = null
        },
        setSelectMikRouters: (state, {payload}) => {
            if (state.selectMikRouters.some(v => v.id === payload.id)) {
                state.selectMikRouters = deleteElementFromList(state.selectMikRouters, payload.id)

            } else {
                state.selectMikRouters = [...state.selectMikRouters, payload]

            }
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
        // builder.addCase(sendCommandMikRouters.fulfilled, (state, {payload}) => {
        //     state.scriptResult = payload
        // })
    }
})

export const {setMikRouter, receiveMikRouter, setSelectMikRouters, clearSelectMikRouters, setCommandResult} = mRouterSlice.actions
export default mRouterSlice.reducer