import React from 'react';
import MikRouterForm from "./MikRouterForm";
import {MainDialog} from "../OtherComponents";
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";


export default function MikRouterPage() {
    return (
        <React.Fragment>
            <Box sx={{
                maxWidth: '95%',
                width: 900,
                mt: 8,
            }}>
                <Outlet/>
            </Box>
            <MainDialog open_key={'router'}><MikRouterForm/></MainDialog>
        </React.Fragment>
    )
}
