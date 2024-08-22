export interface PlanUserDTO {
  id: string
  name: string
  active: boolean
}

export interface PlanDTO {
  id: string
  creatorId: string
  users: PlanUserDTO[]
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
