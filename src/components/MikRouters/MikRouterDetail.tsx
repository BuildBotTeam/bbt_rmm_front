import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, Stack} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {getMikRouter} from "../../store/actions/mikRouters";
import {setMikRouter} from "../../store/reducers/MikRouters";


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
        </Stack>
    )
}
