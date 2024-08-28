import { User } from 'firebase/auth'
import { IUserDTO } from '../user/types'

export interface PlanUserDTO {
  id: string
  name: string
  active: boolean
}

export interface PlanDTO {
  id: string
  creatorId: string
  users: PlanUserDTO[]
  currentVoteId?: string
  votesToSelect: number[]
}

export interface CreatePlanDTO {
  creatorId: string
  users: PlanUserDTO[]
  votesToSelect: number[]
}

export interface PlanUserNameUpdateDTO {
  planId: string
  userId: string
  userName: string
}

export interface UsersVoteDTO extends IUserDTO {
  vote: number
}

export interface PlanVoteDTO {
  id: string
  planId: string
  createdAt: string
  usersVotes: UsersVoteDTO[]
  result?: number
}

export interface PlanVoteUpdateDTO {
  id: string
  planId: string
  user: User
  vote: number
}

export interface ReqFetchJoinToPlan {
  user: User
  planId: string
}
export interface ReqFetchLeavePlan {
  user: User
  planId: string
}

export interface ReqFetchUpdateResult {
  planVoteId: string
  result: number
}

export interface ReqFetchUpdatePlanCurrentVote {
  planId: string
  planVoteId: string
}
