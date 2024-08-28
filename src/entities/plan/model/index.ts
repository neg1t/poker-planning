import { api } from 'shared/api'
import { createEffect, createEvent, createStore, sample } from 'effector'
import type {
  CreatePlanDTO,
  PlanDTO,
  PlanUserNameUpdateDTO,
  PlanVoteDTO,
  PlanVoteUpdateDTO,
  ReqFetchJoinToPlan,
  ReqFetchLeavePlan,
  ReqFetchUpdatePlanCurrentVote,
  ReqFetchUpdateResult,
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

const createPlanVoteFx = createEffect<string, string>(
  async (params) => await api.planAPI.fetchPlanVoteCreate(params),
)

const joinPlanFx = createEffect<ReqFetchJoinToPlan, void>(
  async (params) => await api.planAPI.fetchJoinToPlan(params),
)

const leavePlanFx = createEffect<ReqFetchLeavePlan, void>(
  async (params) => await api.planAPI.fetchLeavePlan(params),
)

const updateResultFx = createEffect<ReqFetchUpdateResult, void>(
  async (params) => await api.planAPI.fetchUpdateResult(params),
)

const updatePlanCurrentVote = createEffect<ReqFetchUpdatePlanCurrentVote, void>(
  async (params) => await api.planAPI.fetchUpdatePlanCurrentVote(params),
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

sample({
  clock: createPlanVoteFx.doneData,
  source: $currentPlan,
  fn: (plan) => plan!.id,
  target: getLastPlanVoteFx,
})

sample({
  clock: createPlanVoteFx.doneData,
  source: $currentPlan,
  fn: (plan, planVoteId) => ({ planId: plan!.id, planVoteId }),
  target: updatePlanCurrentVote,
})

sample({
  clock: $currentPlan.updates,
  source: { currentPlanVote: $currentPlanVote },
  filter: ({ currentPlanVote }, plan) =>
    currentPlanVote?.id !== plan?.currentVoteId,
  fn: (_, plan) => plan!.id,
  target: getLastPlanVoteFx,
})

export const effects = {
  createPlanFx,
  getPlanFx,
  updatePlanUserNameFx,
  getLastPlanVoteFx,
  updatePlanVoteFx,
  createPlanVoteFx,
  joinPlanFx,
  updateResultFx,
  leavePlanFx,
}

export const events = {
  planUpdate,
  planVoteUpdate,
}

export const stores = {
  $currentPlan,
  $currentPlanVote,
}
