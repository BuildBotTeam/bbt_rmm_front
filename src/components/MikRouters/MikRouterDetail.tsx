import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {getMikRouter, getMikRouterLogs} from "../../store/actions/mikRouters";
import {setMikRouter} from "../../store/reducers/MikRouters";
import Grid from "@mui/material/Unstable_Grid2";


export default function MikRouterDetail() {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {mikRouter, logs} = useAppSelector(state => state.mikRouterReducer)
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            dispatch(setMikRouter(null))
        }
    }, [])

    function handleBack() {
        navigate('/')
    }

    useEffect(() => {
        if (id) {
            dispatch(getMikRouter(id))
            dispatch(getMikRouterLogs(id))
        }
    }, [id])

    if (!mikRouter) return null

    return (
        <Stack spacing={2}>
            <Box>
                <Button onClick={handleBack} startIcon={<ArrowBackIosNewIcon/>}
                        size={'small'}>назад</Button>
            </Box>
            <Box sx={{maxHeight: 600, overflow: 'auto'}}>
                <Stack spacing={1}>
                    {logs.map(log => <Paper sx={{p: 1}}>
                        <Grid container>
                            <Grid xs={6} md={2}>
                                <Typography>{log.time}</Typography>
                            </Grid>
                            <Grid xs={6} md={3}>
                                <Typography>{log.topics}</Typography>
                            </Grid>
                            <Grid xs={12} md>
                                <Typography sx={{flex: 1}}>{log.message}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>)}
                </Stack>
            </Box>
        </Stack>
    )
}
