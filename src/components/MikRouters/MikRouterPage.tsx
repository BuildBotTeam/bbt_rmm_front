import React, {useEffect, useRef} from 'react';
import MikRouterForm from "./MikRouterForm";
import {MainDialog, MainDrawer} from "../OtherComponents";
import {Outlet} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import useWebSocket from "react-use-websocket";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {receiveMikRouter, setCommandResult} from "../../store/reducers/MikRouters";
import {enqueueSnackbar} from "notistack";
import MikRouterCommandForm from "./MikRouterCommandForm";
import {setLoading} from "../../store/reducers/AuthReducer";


export default function MikRouterPage() {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(state => state.authReducer)
    const {scriptResult} = useAppSelector(state => state.mikRouterReducer)
    const server = localStorage.getItem('server')
    const url = server!.replace('http', 'ws') + '/backend/ws'
    const didUnmount = useRef(false);
    const {sendMessage, lastJsonMessage, readyState} = useWebSocket(url, {
        queryParams: {"token": token!},
        onOpen: (event) => {
            sendMessage('connect')
        },
        shouldReconnect: (closeEvent) => {
            return !didUnmount.current;
        },
        reconnectAttempts: 10,
        reconnectInterval: 3000,
    });

    useEffect(() => {
        return () => {
            didUnmount.current = true;
        }
    }, [])

    useEffect(() => {
        if (lastJsonMessage?.type === 'update_router') {
            if (lastJsonMessage.data.is_online) enqueueSnackbar(`${lastJsonMessage.data.host} is connect!`, {variant: 'success'})
            else enqueueSnackbar(`${lastJsonMessage.data.host} connect lost!`, {variant: 'error'})
            dispatch(receiveMikRouter(lastJsonMessage.data))
        }
        if (lastJsonMessage?.type === 'command_result') {
            dispatch(setCommandResult(lastJsonMessage.data))
            dispatch(setLoading(false))
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
            <MikRouterCommandForm/>
            <MainDialog open_key={'router'}><MikRouterForm/></MainDialog>
            {scriptResult && <MainDrawer width_md={'100%'} open_key={'result_detail'}><Typography sx={{
                border: '1px solid grey',
                p: 1,
                borderRadius: 3,
                overflowY: 'auto',
                wordWrap: 'anywhere',
                whiteSpace: 'break-spaces',
            }}>{scriptResult.result}</Typography></MainDrawer>}
        </React.Fragment>
    )
}
