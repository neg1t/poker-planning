import { createEvent, createStore } from 'effector'
import { Auth, getAuth, User } from 'firebase/auth'
import 'shared/firebase'

//? _____________________________events_____________________________________
const authUpdate = createEvent<Auth>()
const userUpdate = createEvent<User | null>()

//? _____________________________stores_____________________________________
const $auth = createStore<Auth | null>(getAuth()).on(
  authUpdate,
  (_, payload) => payload,
)

const $user = createStore<User | null | false>(false).on(
  userUpdate,
  (_, payload) => payload,
)

//? _____________________________others_____________________________________

export const events = { authUpdate, userUpdate }

export const stores = { $auth, $user }
