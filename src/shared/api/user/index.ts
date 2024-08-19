import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from 'shared/firebase'
import { IUserDTO } from './types'

const userCol = collection(db, 'user')

//? _____________________________GET_____________________________________

export const fetchUsers = async (): Promise<IUserDTO[]> => {
  try {
    const res = await getDocs(userCol)
    return res.docs.map((item) => item.data()) as IUserDTO[]
  } catch (err) {
    return Promise.reject(err)
  }
}
