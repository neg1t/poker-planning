import { type User } from 'firebase/auth'

export interface IUserDTO {
  name: string
  id: string
}

export interface UserNameUpdateDTO {
  user: User
  name: string
}
