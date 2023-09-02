import React, {useEffect} from 'react'
import {deleteMikRouters, getMikRouters} from "../../store/actions/mikRouters";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, IconButton, ListItem, ListItemButton, Paper, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import {MikRouterType} from "../../models/IMRouter";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Unstable_Grid2";


type MikRouterItemProps = {
    mikRouter: MikRouterType
}

export function MikRouterItem({mikRouter}: MikRouterItemProps) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const id = mikRouter.id

    return (
        <Paper sx={{
            backgroundColor: mikRouter.is_online ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
            transition: '500ms'
        }}>
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
                <ListItemButton sx={{pr: 0}}
                                onClick={() => navigate(`/${id}/detail`)}>
                    <Grid container disableEqualOverflow sx={{width: '100%'}}>
                        <Grid xs={12} md={4}>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <Box sx={{
                                    width: 15, height: 15, borderRadius: '50%',
                                    backgroundColor: mikRouter.is_online ? 'green' : 'red',
                                    transition: '1000ms'
                                }}/>
                                <Typography>{mikRouter.host}</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={12} md={4} hidden={!mikRouter.name}>
                            <Typography>{mikRouter.name}</Typography>
                        </Grid>
                        <Grid xs={12} md={4}>
                            <Typography>{mikRouter.version_os}</Typography>
                        </Grid>
                    </Grid>
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
