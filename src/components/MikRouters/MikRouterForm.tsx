import React from 'react'
import {useForm} from "react-hook-form";
import {Button, Stack} from "@mui/material";
import {FormTextField} from "../FormComponents";
import {useAppDispatch} from "../../hooks";
import {createMikRouters} from "../../store/actions/mikRouters";

type MikRouterFormProps = {
    handleClose?(): void
}

export default function MikRouterForm({handleClose}: MikRouterFormProps) {
    const dispatch = useAppDispatch()
    const {control, handleSubmit} = useForm()

    function onSubmit(values: any) {
        console.log(values)
        dispatch(createMikRouters(values))
        handleClose!()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1} sx={{mt: 1}}>
                <FormTextField fieldName={'host'} label={'Host or ip'} control={control} required/>
                <FormTextField fieldName={'username'} label={'Username'} control={control} required/>
                <FormTextField fieldName={'password'} label={'Password'} control={control} required/>
                <Button type={'submit'}>Отправить</Button>
            </Stack>
        </form>
    )
}
