import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from 'shared/firebase'
import { IUserDTO, UserNameUpdateDTO } from './types'
import { DB_TABLES } from '..'
import { updateProfile } from 'firebase/auth'

//? _____________________________GET_____________________________________

export const fetchUsers = async (): Promise<IUserDTO[]> => {
  try {
    const userCol = collection(db, DB_TABLES.USER)
    const res = await getDocs(userCol)
    return res.docs.map((item) => item.data()) as IUserDTO[]
  } catch (err) {
    return Promise.reject(err)
  }
}

//? _____________________________POST_____________________________________

export const fetchUserNameUpdate = async ({
  user,
  name,
}: UserNameUpdateDTO): Promise<void> => {
  try {
    return await updateProfile(user, {
      displayName: name,
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
