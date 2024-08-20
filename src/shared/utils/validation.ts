import { Rule } from 'effector-forms'

export const validationText = {
  required: 'Поле обязательно',
  email: 'Введенная электронная почта некорректна',
}

const RequiredValidator: Rule<string | number> = {
  name: 'required',
  validator: (val) => {
    return val !== null ? val?.toString().length > 0 : false
  },
  errorText: validationText.required,
}

const EmailValidator: Rule<string> = {
  name: 'email',
  validator: (val) => (val !== '' ? /\S+@\S+\.\S+/.test(val) : true),
  errorText: validationText.email,
}

const NotEmptyArray: Rule<Array<unknown> | null> = {
  name: 'not-empty-array',
  validator: (val) => (Array.isArray(val) && val.length ? true : false),
  errorText: validationText.required,
}

export const VALIDATORS = {
  RequiredValidator,
  NotEmptyArray,
  EmailValidator,
}
