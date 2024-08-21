import { createForm } from 'effector-forms'
import type { ILogin } from './types'
import { utils } from 'shared/utils'
import { createEffect, sample } from 'effector'
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth'
import { userModel } from 'entities/user'

//? _____________________________effects_____________________________________

const singInFx = createEffect<ILogin, User>(({ email, password }) => {
  const auth = getAuth()

  return setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          return Promise.resolve(userCredential.user)
        },
      )
    })
    .catch(utils.helpers.showFirebaseErrorNotification)
})

//? _____________________________events_____________________________________

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

//? _____________________________others_____________________________________

sample({
  clock: $form.submit,
  source: { values: $form.$values, isValid: $form.$isValid },
  filter: ({ isValid }) => !!isValid,
  fn: ({ values }) => values,
  target: singInFx,
})

sample({
  clock: singInFx.doneData,
  fn: (user) => user,
  target: userModel.events.userUpdate,
})

export const effects = { singInFx }

export const stores = { $form }
