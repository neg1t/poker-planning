import { api } from 'shared/api'
import { createEffect, createEvent, createStore } from 'effector'
import type {
  CreatePlanDTO,
  PlanDTO,
  PlanUserNameUpdateDTO,
  PlanVoteDTO,
  PlanVoteUpdateDTO,
} from 'shared/api/plan/types'

//? _____________________________effects_____________________________________

const createPlanFx = createEffect<CreatePlanDTO, string>(
  async (params) => await api.planAPI.fetchCreatePlan(params),
)

const getPlanFx = createEffect<string, PlanDTO>(async (id) =>
  api.planAPI.fetchPlanById(id),
)

const updatePlanUserNameFx = createEffect<PlanUserNameUpdateDTO, void>(
  async (params) => await api.planAPI.fetchPlanUserNameUpdate(params),
)

const updatePlanVoteFx = createEffect<PlanVoteUpdateDTO, void>(
  async (params) => await api.planAPI.fetchPlanVoteUpdate(params),
)

const getLastPlanVoteFx = createEffect<string, PlanVoteDTO>(
  async (params) => await api.planAPI.fetchLastPlanVote(params),
)

const createPlanVoteFx = createEffect<string, void>(
  async (params) => await api.planAPI.fetchPlanVoteCreate(params),
)

//? _____________________________events_____________________________________

const planUpdate = createEvent<PlanDTO>()
const planVoteUpdate = createEvent<PlanVoteDTO>()

//? _____________________________stores_____________________________________

const $currentPlan = createStore<PlanDTO | null>(null).on(
  [getPlanFx.doneData, planUpdate],
  (_, payload) => payload,
)

const $currentPlanVote = createStore<PlanVoteDTO | null>(null).on(
  [getLastPlanVoteFx.doneData, planVoteUpdate],
  (_, payload) => payload,
)

//? _____________________________others_____________________________________

//

export const effects = {
  createPlanFx,
  getPlanFx,
  updatePlanUserNameFx,
  getLastPlanVoteFx,
  updatePlanVoteFx,
  createPlanVoteFx,
}

export const events = {
  planUpdate,
  planVoteUpdate,
}

export const stores = {
  $currentPlan,
  $currentPlanVote,
}
