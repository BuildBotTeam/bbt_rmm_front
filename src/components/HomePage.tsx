import React, {useEffect, useMemo} from 'react'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    Box, Button, CircularProgress, ListItemButton, ListItemIcon, ListItemText, Paper, Stack,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import QueueIcon from '@mui/icons-material/Queue';
import LoginIcon from '@mui/icons-material/Login';
import {getMikRouters} from "../store/actions/mikRouters";

export default function HomePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const {isLoading, isAuth} = useAppSelector(state => state.authReducer)



    const header = useMemo(() => (
        <Paper className={'header_paper'}>
            <Stack direction={'row'}>
                <Button onClick={() => navigate('/logout')} size={'large'}
                        endIcon={<LogoutIcon/>}><span>Logout</span></Button>
            </Stack>
            <CircularProgress className={isLoading ? 'header_loading anim' : 'header_loading'}/>
        </Paper>
    ), [isLoading, location, isAuth])

    return (
        <Box>
            {header}
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Outlet />
            </Box>
        </Box>
    )
}
