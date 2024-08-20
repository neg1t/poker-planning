import { createForm } from 'effector-forms'
import { ILogin } from './types'
import { utils } from 'shared/utils'
import { createEffect, sample } from 'effector'

//? _____________________________effects_____________________________________

const singInFx = createEffect<ILogin, void>(() => {})

//? _____________________________stores_____________________________________

const $form = createForm<ILogin>({
  fields: {
    email: {
      init: '',
      rules: [
        utils.validation.VALIDATORS.EmailValidator,
        utils.validation.VALIDATORS.RequiredValidator,
      ],
    },
    password: {
      init: '',
      rules: [utils.validation.VALIDATORS.RequiredValidator],
    },
  },
})

sample({
  clock: $form.submit,
  source: { values: $form.$values, isValid: $form.$isValid },
  filter: ({ isValid }) => !!isValid,
  fn: ({ values }) => values,
  target: singInFx,
})

export const effects = { singInFx }

export const stores = { $form }
