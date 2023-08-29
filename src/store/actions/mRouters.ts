import {createAsyncThunk} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api, { apiError } from "../../api";
import {MRouterType} from "../../models/IMRouter";

export const getMRouters = createAsyncThunk(
    'getMRouters',
    async (_, thunkAPI) => {
        try {
            const {data} = await api.get<MRouterType[]>('/mikrotik_routers/')
            return data
        } catch (e) {
            return thunkAPI.rejectWithValue(apiError(e as Error | AxiosError))
        }
    }
)