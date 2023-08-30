import React from 'react';
import MikRouterForm from "./MikRouterForm";
import {MainDialog} from "../OtherComponents";
import {Outlet} from "react-router-dom";


export default function MikRouterPage() {
    return (
        <React.Fragment>
            <Outlet/>
            <MainDialog open_key={'router'}><MikRouterForm/></MainDialog>
        </React.Fragment>
    )
}
