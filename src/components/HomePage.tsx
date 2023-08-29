import React, {useMemo} from 'react'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    Box, Button, CircularProgress, ListItemButton, ListItemIcon, ListItemText, Paper, Stack,
} from "@mui/material";
import {useAppSelector} from "../hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import QueueIcon from '@mui/icons-material/Queue';
import LoginIcon from '@mui/icons-material/Login';

export default function HomePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const {isLoading, navList, isAuth} = useAppSelector(state => state.authReducer)


    const header = useMemo(() => (
        <Paper className={'header_paper'}>
            <Stack direction={'row'}>
                <Button onClick={() => navigate('/logout')} size={'large'}
                        endIcon={<LogoutIcon/>}><span>Logout</span></Button>
            </Stack>
            <CircularProgress className={isLoading ? 'header_loading anim' : 'header_loading'}/>
        </Paper>
    ), [isLoading, location, isAuth])

    const navPanel = useMemo(() => (
        <Paper className={'nav_paper'} component={'nav'}>
            {navList.map(({start_path, icon, name}) => (
                <ListItemButton
                    key={'nav' + start_path}
                    selected={location.pathname.split('/').includes(start_path)}
                    onClick={() => navigate(start_path)}
                >
                    <ListItemIcon sx={{'svg': {color: 'primary.main'}}}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={name}/>
                </ListItemButton>
            ))}
        </Paper>
    ), [location, isAuth]);

    return (
        <Box>
            {header}
            {navPanel}
        </Box>
    )
}
