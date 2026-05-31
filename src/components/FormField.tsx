import MenuItem from '@mui/material/MenuItem'
import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

type FormFieldOption = {
    label: string
    value: string | number
}

type FormFieldProps = MuiTextFieldProps & {
    options?: FormFieldOption[]
}

export function FormField({ options, children, select, ...props }: FormFieldProps) {
    return (
        <MuiTextField select={select} fullWidth {...props}>
            {select
                ? options?.map((option) => (
                    <MenuItem key={String(option.value)} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))
                : children}
        </MuiTextField>
    )
}
