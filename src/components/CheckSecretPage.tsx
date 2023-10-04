import React from 'react'
import {useAppDispatch, useAppSelector} from "../hooks";
import {useForm} from "react-hook-form";
import {check_secret} from "../store/actions/auth";
import {Box, Paper, Stack} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {FormTextField} from "./FormComponents";


export default function CheckSecretPage() {
    const dispatch = useAppDispatch()
    const {control, handleSubmit} = useForm()
    const {username, isLoading} = useAppSelector(state => state.authReducer)


    function onSubmit(value: any) {
        value.username = username
        dispatch(check_secret(value))
    }

    return (
        <Box sx={{padding: 1, position: 'relative'}}>
            <Paper
                elevation={8}
                sx={{
                    margin: {xs: '50px auto', sm: '150px auto 0 auto'},
                    position: 'relative',
                    width: {xs: 'auto', sm: 500},
                    padding: 1,
                    minWidth: 350,
                }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} sx={{padding: 1}}>
                        <FormTextField fieldName={'secret'} label={'Secret key'} control={control} required autoFocus/>
                        <Box>
                            <Stack sx={{float: 'right'}} direction={'row'} spacing={2}>
                                <LoadingButton loading={isLoading} sx={{float: 'right'}} size={'large'} type={'submit'}
                                               variant={'contained'}>
                                    Отпарвить
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    )
}
