import React, {useEffect, useState} from 'react'
import {Controller, useForm} from "react-hook-form";
import {Button, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {FormAutocompleteSelect, FormTextField} from "../FormComponents";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createMikRouters, getMikRouter, updateMikRouters} from "../../store/actions/mikRouters";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useLocation, useParams} from "react-router-dom";

const topics = [
    {id: 'critical', name: 'critical'},
    {id: 'error', name: 'error'},
    {id: 'warning', name: 'warning'},
    {id: 'info', name: 'info'},
]


type MikRouterFormProps = {
    handleClose?(): void
}

export default function MikRouterForm({handleClose}: MikRouterFormProps) {
    const dispatch = useAppDispatch()
    const {mikRouter} = useAppSelector(state => state.mikRouterReducer)
    const {control, handleSubmit, reset} = useForm()
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation()
    const isEdit = location.pathname.split('/').includes('edit')
    const {id} = useParams()

    useEffect(() => {
        if (isEdit && id) dispatch(getMikRouter(id))
    }, [id]);

    useEffect(() => {
        if (isEdit && mikRouter) reset(mikRouter)
    }, [mikRouter]);

    function onSubmit(values: any) {
        if (isEdit) {
            dispatch(updateMikRouters(values))
        } else {
            dispatch(createMikRouters(values))
        }
        handleClose!()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1} sx={{mt: 1}}>
                <FormTextField fieldName={'name'} label={'Name'} control={control}/>
                <Stack direction={{md: 'row', xs: 'column'}} spacing={1}>
                    <FormTextField fieldName={'host'} label={'Host or ip'} control={control} required/>
                    <FormTextField fieldName={'ssh_port'} label={'SSH Port'} control={control} number required defaultValue={22}/>
                </Stack>
                <FormTextField fieldName={'username'} label={'Username'} control={control} required/>
                <Controller
                    name={'password'}
                    control={control}
                    defaultValue={''}
                    rules={{required: true}}
                    render={({field, fieldState: {invalid}}) => (
                        <TextField {...field} label="Password" type={showPassword ? 'text' : 'password'}
                                   fullWidth size={'small'}
                                   helperText={invalid && 'Необходимо заполнить'} error={invalid}
                                   InputProps={{
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
                {/*<FormAutocompleteSelect fieldName={'topics'} label={'topics'} control={control} searchList={topics}*/}
                {/*                        multiple freeSolo*/}
                {/*                        defaultValue={topics.slice(0, 3).map((v: any) => v.id)}/>*/}
                <Button type={'submit'}>Отправить</Button>
            </Stack>
        </form>
    )
}
