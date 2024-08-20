import { type FormItemProps } from 'antd'
import type { AnyFormValues, ConnectedFields } from 'effector-forms'

export const formBlur =
  <T extends AnyFormValues>(fields: ConnectedFields<T>, field: keyof T) =>
  () => {
    fields[field].onBlur()
  }

export const formInputChange =
  <T extends AnyFormValues>(fields: ConnectedFields<T>, field: keyof T) =>
  (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    fields[field].onChange(ev.target.value as never)
  }

export const formValidationStatus = <T extends AnyFormValues>(
  fields: ConnectedFields<T>,
  field: keyof T,
): FormItemProps['validateStatus'] => {
  return !fields[field].isValid && fields[field].firstError?.errorText
    ? 'error'
    : undefined
}

export const formErrorText = <T extends AnyFormValues>(
  fields: ConnectedFields<T>,
  field: keyof T,
) => {
  return !fields[field].isValid && fields[field].firstError?.errorText
}
