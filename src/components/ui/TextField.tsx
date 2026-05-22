import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

export type TextFieldProps = MuiTextFieldProps

export function TextField({ fullWidth = true, ...props }: TextFieldProps) {
  return <MuiTextField fullWidth={fullWidth} {...props} />
}
