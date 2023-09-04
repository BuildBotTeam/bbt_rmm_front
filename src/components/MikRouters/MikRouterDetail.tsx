import React, {useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, Divider, Paper, Stack, Tab, Tabs, Typography} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {getMikRouter} from "../../store/actions/mikRouters";
import {setMikRouter} from "../../store/reducers/MikRouters";
import Grid from "@mui/material/Unstable_Grid2";
import {InfoTitle} from "../OtherComponents";
import {FixedSizeList} from 'react-window';


export default function MikRouterDetail() {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {mikRouter} = useAppSelector(state => state.mikRouterReducer)
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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

    const logs = useMemo(() => {
        if (!mikRouter) return <div/>
        switch (value) {
            case 0:
                return <FixedSizeList
                    height={450}
                    width={'100%'}
                    itemSize={46}
                    itemCount={mikRouter.logs.length}
                    overscanCount={5}
                    itemData={mikRouter.logs}
                >
                    {({index, style, data}) => <div style={style} key={index}>
                        <Paper sx={{p: 1}}>
                            <Grid container>
                                <Grid xs={6} md={2}>
                                    <Typography>{data[index].time}</Typography>
                                </Grid>
                                <Grid xs={6} md={3}>
                                    <Typography>{data[index].topics}</Typography>
                                </Grid>
                                <Grid xs={12} md={0}><Divider sx={{m: 1}}/></Grid>
                                <Grid xs={12} md>
                                    <Typography sx={{lineHeight: 1.75}}>{data[index].message}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>}
                </FixedSizeList>
            case 1:
                return <FixedSizeList
                    height={450}
                    width={'100%'}
                    itemSize={50}
                    itemCount={mikRouter.status_log.length}
                    overscanCount={15}
                    itemData={mikRouter.status_log}
                >
                    {({index, style, data}) => <div style={style} key={`status_log_${index}`}>
                        <Paper sx={{p: 1}}>
                            <Grid container>
                                <Grid xs={6} md={2}>
                                    <Typography>{data[index].time}</Typography>
                                </Grid>
                                <Grid xs={6} md={2}>
                                    <Typography>{data[index].online ? 'online' : 'offline'}</Typography>
                                </Grid>
                                <Grid xs={12} md={0}><Divider sx={{m: 1}}/></Grid>
                                <Grid xs={6} md={4}>
                                    <InfoTitle subtitle={'bytes_in'} title={data[index].bytes_in}/>
                                </Grid>
                                <Grid xs={6} md={4}>
                                    <InfoTitle subtitle={'bytes_out'} title={data[index].bytes_out}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>}
                </FixedSizeList>
        }
    }, [mikRouter, value]);

    if (!mikRouter) return null

    return (
        <Stack spacing={2}>
            <Box>
                <Button onClick={handleBack} startIcon={<ArrowBackIosNewIcon/>}
                        size={'small'}>назад</Button>
            </Box>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Router logs"/>
                <Tab label="Status logs"/>
            </Tabs>
            {logs}
        </Stack>
    )
}
