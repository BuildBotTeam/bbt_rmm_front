import React, {useEffect} from 'react'
import {deleteMikRouters, getMikRouters} from "../../store/actions/mikRouters";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, IconButton, ListItem, ListItemButton, Paper, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import {MikRouterType} from "../../models/IMRouter";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


type MikRouterItemProps = {
    mikRouter: MikRouterType
}

export function MikRouterItem({mikRouter}: MikRouterItemProps) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const id = mikRouter.id

    return (
        <Paper sx={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
            <ListItem
                sx={{p: 0, pr: '110px'}}
                secondaryAction={
                    <Stack spacing={1} direction={'row'}>
                        <IconButton edge="end"
                                    onClick={() => navigate(`/${id}/router/edit`)}><EditIcon/></IconButton>
                        <IconButton edge="end"
                                    onClick={() => dispatch(deleteMikRouters(id))}><DeleteIcon/></IconButton>
                    </Stack>
                }
            >
                <ListItemButton onClick={() => navigate(`/${id}/detail`)}>
                    <Typography sx={{flex: 1}}>{mikRouter.host} {mikRouter.user_id}</Typography>
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
        dispatch(getMikRouters())
    }, [])

    if (mikRouters.length === 0) {
        return (
            <Paper sx={{
                height: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
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
        <Paper>
            <Stack spacing={1} sx={{p: 1, width: '100%'}}>
                <Button onClick={() => navigate('router/create')} startIcon={<AddIcon/>}>Добавить</Button>
                {mikRouters.map(v => <MikRouterItem key={`mik_route_${v.host}`} mikRouter={v}/>)}
            </Stack>
        </Paper>
    )
}
