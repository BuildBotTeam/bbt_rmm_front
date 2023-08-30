import React, {useEffect, useMemo} from 'react'
import {getMikRouters} from "../../store/actions/mikRouters";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, IconButton, List, ListItem, ListItemButton, Paper, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {MainDialog} from "../OtherComponents";
import MikRouterForm from "./MikRouterForm";
import {useNavigate} from "react-router-dom";
import {MikRouterType} from "../../models/IMRouter";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


type MikRouterItemProps = {
    mikRouter: MikRouterType
}

export function MikRouterItem({mikRouter}: MikRouterItemProps) {

    return (
        <Paper sx={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
            <ListItem
                sx={{p: 0, pr: '110px'}}
                secondaryAction={
                    <Stack spacing={1} direction={'row'}>
                        <IconButton edge="end"><EditIcon/></IconButton>
                        <IconButton edge="end"><DeleteIcon/></IconButton>
                    </Stack>
                }
            >
                <ListItemButton>
                    <Typography sx={{flex: 1}}>{mikRouter.host}</Typography>
                </ListItemButton>
            </ListItem>
        </Paper>
    )
}


export default function MikRouterList() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {mikRouters} = useAppSelector(state => state.mikRouterReducer)

    useEffect(() => {
        // dispatch(getMikRouters())
    }, [])

    const body = useMemo(() => {
        if (mikRouters.length === 0) {
            return (
                <Paper
                    sx={{width: 900, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Stack spacing={1}>
                        <Typography sx={{color: 'gray'}}>Пока что не добавлен не один роутер</Typography>
                        <Box textAlign={'center'}>
                            <Button onClick={() => navigate('router/create')} startIcon={<AddIcon/>}>Добавить</Button>
                        </Box>
                    </Stack>
                </Paper>
            )
        }
        return (
            <Paper sx={{width: 900}}>
                <Stack spacing={1} sx={{p: 1}}>
                    <Button onClick={() => navigate('router/create')} startIcon={<AddIcon/>}>Добавить</Button>
                    {mikRouters.map(v => <MikRouterItem key={`mik_route_${v.host}`} mikRouter={v}/>)}
                </Stack>
            </Paper>
        )

    }, [mikRouters])


    return (
        <React.Fragment>
            {body}
            <MainDialog open_key={'router'}><MikRouterForm/></MainDialog>
        </React.Fragment>
    )

}
