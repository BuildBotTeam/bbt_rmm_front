import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import api, {apiError} from "../../api";
import {MikRouterType} from "../../models/IMRouter";

export const getMikRouters = createAsyncThunk(
    'getMRouters',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<MikRouterType[]>('/mikrotik_routers/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)

export const createMikRouters = createAsyncThunk(
    'createMikRouters',
    async (post: any, thunkAPI) => {
        try {
            const {data} = await api.post<MikRouterType>('/mikrotik_routers/', post)
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)