import { createForm } from 'effector-forms'
import type { ISignUp } from './types'
import { utils } from 'shared/utils'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

//? _____________________________effects_____________________________________

const createUserFx = createEffect<ISignUp, void>(({ email, password }) => {
  const auth = getAuth()
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => Promise.resolve())
    .catch(utils.helpers.showFirebaseErrorNotification)
})

//? _____________________________events_____________________________________

const setRegisterIsSuccess = createEvent<boolean>()

//? _____________________________stores_____________________________________

const $form = createForm<ISignUp>({
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

const $registerSuccess = createStore(false).on(
  setRegisterIsSuccess,
  (_, payload) => payload,
)

//? _____________________________others_____________________________________

sample({
  clock: $form.submit,
  source: { values: $form.$values, isValid: $form.$isValid },
  filter: ({ isValid }) => !!isValid,
  fn: ({ values }) => values,
  target: createUserFx,
})

sample({
  clock: createUserFx.doneData,
  fn: () => true,
  target: setRegisterIsSuccess,
})

export const effects = { createUserFx }

export const events = { setRegisterIsSuccess }

export const stores = { $form, $registerSuccess }
