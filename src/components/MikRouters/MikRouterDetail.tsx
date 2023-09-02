import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, Divider, Paper, Stack, Typography} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {getMikRouter} from "../../store/actions/mikRouters";
import {setMikRouter} from "../../store/reducers/MikRouters";
import Grid from "@mui/material/Unstable_Grid2";


export default function MikRouterDetail() {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {mikRouter} = useAppSelector(state => state.mikRouterReducer)
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
        }
    }, [id])

    if (!mikRouter) return null

    return (
        <Stack spacing={2}>
            <Box>
                <Button onClick={handleBack} startIcon={<ArrowBackIosNewIcon/>}
                        size={'small'}>назад</Button>
            </Box>
            <Box sx={{height: 600, overflow: 'auto'}}>
                <Stack spacing={1}>
                    {mikRouter.logs.map(log => <Paper sx={{p: 1}}>
                        <Grid container>
                            <Grid xs={6} md={2}>
                                <Typography>{log.time}</Typography>
                            </Grid>
                            <Grid xs={6} md={3}>
                                <Typography>{log.topics}</Typography>
                            </Grid>
                            <Grid xs={12} md={0}><Divider sx={{m: 1}}/></Grid>
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
