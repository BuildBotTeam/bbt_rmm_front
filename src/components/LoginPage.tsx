import React, {useEffect, useState} from 'react';
import {Box, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks";
import {login} from "../store/actions/auth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {LoadingButton} from "@mui/lab";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {control, handleSubmit} = useForm()
    const {token, isLoading} = useAppSelector(state => state.authReducer)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (token) navigate('/home', {replace: true})
    }, [token])

    function onSubmit(value: any) {
        dispatch(login(value))
        setShowPassword(false)
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
                        <Typography variant={'h3'} sx={{textAlign: 'center', fontWeight: 'bold'}}>
                            Mikrotik management
                        </Typography>
                        <Controller
                            name={'email'}
                            control={control}
                            defaultValue={''}
                            rules={{required: true}}
                            render={({field, fieldState: {invalid}}) => (
                                <TextField {...field} label="Email" type={'email'}
                                           helperText={invalid && 'Необходимо заполнить'}
                                           error={invalid} fullWidth/>
                            )}
                        />
                        <Controller
                            name={'username'}
                            control={control}
                            defaultValue={''}
                            rules={{required: true}}
                            render={({field, fieldState: {invalid}}) => (
                                <TextField {...field} label="Login" helperText={invalid && 'Необходимо заполнить'}
                                           error={invalid} fullWidth/>
                            )}
                        />
                        <Controller
                            name={'password'}
                            control={control}
                            defaultValue={''}
                            rules={{required: true}}
                            render={({field, fieldState: {invalid}}) => (
                                <TextField {...field} label="Password" type={showPassword ? 'text' : 'password'}
                                           fullWidth
                                           helperText={invalid && 'Необходимо заполнить'} error={invalid}
                                           InputProps={{ // <-- This is where the toggle button is added.
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <IconButton
                                                           aria-label="toggle password visibility"
                                                           onClick={() => setShowPassword(val => !val)}
                                                       >
                                                           {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                                       </IconButton>
                                                   </InputAdornment>
                                               )
                                           }}/>
                            )}
                        />
                        <Box>
                            <Stack sx={{float: 'right'}} direction={'row'} spacing={2}>
                                <LoadingButton loading={isLoading} sx={{float: 'right'}} size={'large'} type={'submit'}
                                               variant={'contained'}>
                                    Войти
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    )
}
