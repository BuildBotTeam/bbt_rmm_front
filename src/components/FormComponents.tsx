import {Control, Controller} from "react-hook-form";
import {Autocomplete, MenuItem, TextField} from "@mui/material";
// import dayjs from "dayjs";
import React from "react";
// import 'dayjs/locale/ru'

type FormTextFieldProps = {
    fieldName: any
    label: string
    number?: boolean
    required?: boolean
    control: Control<any>
    defaultValue?: string | number
    onClick?(): void
    [rest: string]: any
}

export function FormTextField(props: FormTextFieldProps) {
    const {fieldName, label, number, control, required, defaultValue, onClick, ...rest} = props

    const handleChange = (e: any, val: string) => {
        if (!number) return e.target.value
        const regex = /^[0-9\b]+$/
        if (e.target.value === "" || regex.test(e.target.value)) {
            if (Number(e.target.value) === 0) return 1
            return Number(e.target.value)
        }
        return val
    }

    return (
        <Controller
            name={fieldName}
            control={control}
            rules={{required: required}}
            defaultValue={defaultValue ? defaultValue : number ? 1 : ''}
            render={({field: {onChange, value}, fieldState: {invalid}}) => (
                <TextField {...rest} fullWidth value={value} onClick={onClick}
                           helperText={invalid && 'Необходимо заполнить'} error={invalid}
                           label={label} onChange={e => onClick || onChange(handleChange(e, value))}
                           sx={{flexGrow: 1}} size={'small'}/>
            )}
        />
    )
}

type FormAutocompleteSelectProps = {
    fieldName: any
    label: string
    control: Control
    searchList: any[]
    required?: boolean
    multiple?: boolean
    defaultValue?: any[]
    [rest: string]: any
}

export function FormAutocompleteSelect(props: FormAutocompleteSelectProps) {
    const {fieldName, label, control, searchList, required, multiple, defaultValue, ...rest} = props

    return (
        <Controller
            name={fieldName}
            control={control}
            rules={{required: required}}
            defaultValue={multiple ? defaultValue ?? [] : required ? searchList[0]?.id : defaultValue || ''}
            render={({field: {onChange, value}, fieldState: {invalid}}) => {
                return (
                    <Autocomplete
                        {...rest}
                        multiple={multiple}
                        sx={{flexGrow: 1}}
                        options={searchList}
                        disableClearable={rest.disableClearable}
                        getOptionLabel={(option) => option?.name || searchList.find(val => val.id === option)?.name || ''}
                        value={value}
                        isOptionEqualToValue={(option, val) => option?.id === val || option?.id === val?.id}
                        onChange={(_, val) => {
                            if (multiple && Array.isArray(val)) {
                                onChange(val?.filter((v: any) => !value?.includes(v.id))?.map((v: any) => v.id ?? v))
                            } else onChange(val?.id || val)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label={label} sx={{minWidth: 100}}
                                       helperText={invalid && 'Необходимо заполнить'}
                                       error={invalid} fullWidth size={'small'}/>
                        )}
                    />)
            }}
        />
    )
}

type FormSelectProps = {
    fieldName: any
    label: string
    control: Control<any>
    searchList: any[]
    required?: boolean
    multiple?: boolean
    defVal?: any[] | any
    [rest: string]: any
}

export function FormSelect(props: FormSelectProps) {
    const {fieldName, label, control, searchList, required, multiple, defVal, ...rest} = props
    const defaultValue = defVal ? defVal : required ? searchList[0]?.id : ''

    return <Controller
        name={fieldName}
        control={control}
        rules={{required: required}}
        defaultValue={multiple ? [] : defaultValue}
        render={({field: {onChange, value}, fieldState: {invalid}}) => (
            <TextField {...rest} select label={label} sx={{minWidth: 100}}
                       helperText={invalid && 'Необходимо заполнить'}
                       onChange={onChange} value={value} error={invalid} fullWidth size={'small'}>
                {!required && <MenuItem value={''}>Все</MenuItem>}
                {searchList.map(val => <MenuItem key={val.id} value={val.id}>{val.name}</MenuItem>)}
            </TextField>)}
    />
}


