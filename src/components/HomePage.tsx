import React, {useMemo} from 'react'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    Box, Button, CircularProgress, Link, Paper, Stack, Typography,
} from "@mui/material";
import {useAppSelector} from "../hooks";
import LogoutIcon from "@mui/icons-material/Logout";

export default function HomePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const {isLoading, isAuth} = useAppSelector(state => state.authReducer)


    const header = useMemo(() => (
        <Paper className={'header_paper'} component={'header'}>
            <Stack direction={'row'}>
                <Button onClick={() => navigate('/logout')} size={'large'}
                        endIcon={<LogoutIcon/>}><span>Logout</span></Button>
            </Stack>
            <CircularProgress className={isLoading ? 'header_loading anim' : 'header_loading'}/>
        </Paper>
    ), [isLoading, location, isAuth])

    const footer = useMemo(() => (
        <Paper className={'footer_paper'} component={'footer'}>
            <Stack spacing={1} direction={'row'}>
                <Typography>created by </Typography>
                <Link href={'https://buildbotteam.ru'} underline={'hover'}>Build bot team</Link>
                <Typography>© 2023</Typography>
            </Stack>
        </Paper>
    ), [])

    return (
        <Box className={'home_paper'}>
            {header}
            <Outlet/>
            {footer}
        </Box>
    )
}
