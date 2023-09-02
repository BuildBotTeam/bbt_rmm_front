import React, {useEffect} from 'react';
import MikRouterForm from "./MikRouterForm";
import {MainDialog} from "../OtherComponents";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import useWebSocket from "react-use-websocket";
import api from "../../api";


export default function MikRouterPage() {
    // const url = api.defaults.baseURL!.replace('http', 'ws') + '/ws'
    const url = 'ws://localhost/backend/ws'
    const { sendMessage, lastMessage, readyState } = useWebSocket(url);

    useEffect(() => {
        console.log(lastMessage)
    }, [lastMessage]);

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
            <MainDialog open_key={'router'}><MikRouterForm/></MainDialog>
        </React.Fragment>
    )
}
