import { createEffect, createEvent, createStore } from 'effector'
import { Auth, getAuth, User } from 'firebase/auth'
import { api } from 'shared/api'
import { UserNameUpdateDTO } from 'shared/api/user/types'
import 'shared/firebase'

//? _____________________________effects_____________________________________

const updateUserNameFx = createEffect<UserNameUpdateDTO, void>(async (params) =>
  api.userAPI.fetchUserNameUpdate(params),
)

//? _____________________________events_____________________________________
const authUpdate = createEvent<Auth>()
const userUpdate = createEvent<User | null>()

const setUserDataLoad = createEvent<boolean>()

//? _____________________________stores_____________________________________
const $auth = createStore<Auth | null>(getAuth()).on(
  authUpdate,
  (_, payload) => payload,
)

const $userDataLoad = createStore(false).on(
  setUserDataLoad,
  (_, payload) => payload,
)

const $user = createStore<User | null>(null).on(
  userUpdate,
  (_, payload) => payload,
)

//? _____________________________others_____________________________________

export const effects = { updateUserNameFx }

export const events = { authUpdate, userUpdate, setUserDataLoad }

export const stores = { $auth, $user, $userDataLoad }
