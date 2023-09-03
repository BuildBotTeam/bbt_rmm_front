import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, DialogContent, DialogTitle, Paper, Stack, Typography, useMediaQuery} from "@mui/material";
import {FormSelect, FormTextField} from "../FormComponents";
import {useForm} from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {clearSelectMikRouters} from "../../store/reducers/MikRouters";
import {sendScriptMikRouters} from "../../store/actions/mikRouters";

const actionsForm = [
    {id: 'ping', name: 'ping'},
    {id: 'send_script', name: 'send script'},
]


export default function MikRouterCommandForm() {
    const dispatch = useAppDispatch()
    const {selectMikRouters} = useAppSelector(state => state.mikRouterReducer)
    const matches = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const {control, handleSubmit, watch} = useForm()
    const [activeAction, setActiveAction] = useState('ping');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const subscription = watch((value) => setActiveAction(value.command));
        return () => subscription.unsubscribe();
    }, [watch]);

    function handleClose() {
        dispatch(clearSelectMikRouters())
        setOpen(false)
    }

    const body = useMemo(() => {
        switch (activeAction) {
            case 'ping':
                return <React.Fragment>
                    <FormTextField fieldName={'host'} label={'host'} control={control} required/>
                </React.Fragment>
            case 'send_script':
                return <React.Fragment>

                </React.Fragment>
        }
    }, [activeAction]);

    function onSubmit(values: any) {
        if (values.command === 'send_script') {
            values.ids = selectMikRouters.map(m => m.id)
            dispatch(sendScriptMikRouters(values))
        }
    }

    return (
        <Paper sx={{
            position: 'fixed',
            top: '10%',
            width: {xs: '90%', md: 400},
            right: {xs: '5%', md: 20},
            transform: selectMikRouters.length > 0 && (!matches || open) ? 'translateX(0)' : 'translateX(110%)',
            // opacity: selectMikRouters.length === 0 ? 0 : 1,
            transition: '500ms',
        }}>
            <Button hidden={selectMikRouters.length === 0}
                    variant={'outlined'}
                    sx={{
                        display: {
                            xs: selectMikRouters.length === 0 ? 'none' : open ? 'none' : 'inline-flex',
                            md: 'none'
                        },
                        position: 'absolute',
                        left: -50,
                        minWidth: 'auto',
                        transition: '500ms',
                        writingMode: 'tb-rl'
                    }} onClick={() => setOpen(true)}
                    startIcon={<ArrowBackIosNewIcon sx={{fontSize: 20}}/>}>
                Command
            </Button>
            <DialogTitle sx={{pb: 1}}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant={'h6'}>Отправка команды</Typography>
                    <Button onClick={handleClose} variant={'text'} sx={{fontWeight: 700}}
                            startIcon={<ArrowBackIosNewIcon sx={{fontSize: 20}}/>}>Назад</Button>
                </Box>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={1} sx={{pt: 1}}>
                        <FormSelect searchList={actionsForm} fieldName={'command'} label={'Command'} control={control}
                                    required/>
                        {body}
                    </Stack>
                    <Button type={'submit'}>Submit</Button>
                </form>
            </DialogContent>
        </Paper>
    )
}
