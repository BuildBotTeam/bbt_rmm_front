import React, {useEffect} from 'react';
import MikRouterForm from "./MikRouterForm";
import {MainDialog} from "../OtherComponents";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import useWebSocket from "react-use-websocket";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {receiveMikRouter} from "../../store/reducers/MikRouters";
import {enqueueSnackbar} from "notistack";
import MikRouterCommandForm from "./MikRouterCommandForm";


export default function MikRouterPage() {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(state => state.authReducer)
    const server = localStorage.getItem('server')
    const url = server!.replace('http', 'ws') + '/backend/ws'
    const {sendMessage, lastJsonMessage, readyState} = useWebSocket(url, {
        queryParams: {"token": token!},
        onOpen: (event) => {
            sendMessage('connect')
        }
    });

    useEffect(() => {
        if (lastJsonMessage?.type === 'update_router') {
            if (lastJsonMessage.data.is_online) enqueueSnackbar(`${lastJsonMessage.data.host} is connect!`, {variant: 'success'})
            else enqueueSnackbar(`${lastJsonMessage.data.host} connect lost!`, {variant: 'error'})
            dispatch(receiveMikRouter(lastJsonMessage.data))
        }
    }, [lastJsonMessage]);

    return (
        <React.Fragment>
            <Box sx={{
                maxWidth: '95%',
                width: 900,
                mt: 8,
                mb: 1,
            }}>
                <Outlet/>
            </Box>
            <MikRouterCommandForm />
            <MainDialog open_key={'router'}><MikRouterForm/></MainDialog>
        </React.Fragment>
    )
}
