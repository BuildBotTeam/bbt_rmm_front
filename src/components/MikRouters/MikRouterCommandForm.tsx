import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button, DialogContent, DialogTitle, Divider, Paper, Stack, Typography, useMediaQuery} from "@mui/material";
import {FormSelect, FormTextField} from "../FormComponents";
import {useForm} from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {clearSelectMikRouters} from "../../store/reducers/MikRouters";
import {getMikRouter, sendCommandMikRouters} from "../../store/actions/mikRouters";

const actionsForm = [
    {id: 'ping', name: 'ping'},
    {id: 'raw_command', name: 'raw command'},
    {id: 'send_script', name: 'send script'},
    {id: 'get_scripts', name: 'get scripts'},
    {id: 'remove_script', name: 'remove script'},
]


export default function MikRouterCommandForm() {
    const dispatch = useAppDispatch()
    const {selectMikRouters, scriptResult} = useAppSelector(state => state.mikRouterReducer)
    const matches = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const {control, handleSubmit, watch, reset} = useForm()
    const [activeAction, setActiveAction] = useState('ping');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const subscription = watch((value) => setActiveAction(value.command));
        return () => subscription.unsubscribe();
    }, [watch]);

    function handleClose() {
        dispatch(clearSelectMikRouters())
        reset({command: 'ping'})
        setOpen(false)
    }

    const body = useMemo(() => {
        switch (activeAction) {
            case 'ping':
                return <React.Fragment>
                    <FormTextField key={'host'} fieldName={'host'} label={'host'} control={control} required/>
                    <FormTextField key={'count'} fieldName={'count'} label={'count'} control={control} number/>
                </React.Fragment>
            case 'send_script':
                return <React.Fragment>
                    <FormTextField key={'script_name'} fieldName={'script_name'} label={'script_name'} control={control}
                                   required/>
                    <FormTextField key={'source'} spellCheck="false" fieldName={'source'} label={'source'}
                                   control={control} required minRows={3}
                                   maxRows={10} multiline/>
                </React.Fragment>
            case 'get_scripts':
                return <div/>
            case 'remove_script':
                return <FormTextField key={'script_name'} fieldName={'script_name'} label={'script_name'}
                                      control={control} required/>
             case 'raw_command':
                 return <FormTextField key={'raw_command'} fieldName={'raw_command'} label={'raw_command'}
                                      control={control} required/>
        }
    }, [activeAction]);

    function onSubmit(values: any) {
        values.ids = selectMikRouters.map(m => m.id)
        dispatch(sendCommandMikRouters(values))
    }

    return (
        <Stack spacing={2} sx={{
            position: 'fixed',
            top: '10%',
            right: {xs: '5%', md: 20},
            width: {xs: '90%', md: 400},
            transform: selectMikRouters.length > 0 && (!matches || open) ? 'translateX(0)' : 'translateX(110%)',
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
            <Paper sx={{zIndex: 1}}>
                <DialogTitle sx={{pb: 1}}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant={'h6'}>Отправка команды</Typography>
                        <Button onClick={handleClose} variant={'text'} sx={{fontWeight: 700}}
                                startIcon={<ArrowBackIosNewIcon sx={{fontSize: 20}}/>}>Назад</Button>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={1} sx={{pt: 1}}>
                            <FormSelect searchList={actionsForm} fieldName={'command'} label={'Command'}
                                        control={control}
                                        required/>
                            {body}
                            <Button type={'submit'}>Submit</Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Paper>
            {scriptResult && <Paper className={'script-result-animate'}>
                <Stack spacing={1}>
                    <Typography
                        color={scriptResult.is_success ? 'success.main' : 'error.main'}>{scriptResult.is_success ? 'Success' : 'Error'}</Typography>
                    <Divider variant={'middle'}/>
                    <Typography>Detail:</Typography>
                    <Typography
                        sx={{
                            border: '1px solid grey',
                            p: 1,
                            borderRadius: 3,
                            overflowY: 'auto',
                            maxHeight: 300
                        }}>{scriptResult.result}</Typography>
                </Stack>
            </Paper>}
        </Stack>
    )
}
