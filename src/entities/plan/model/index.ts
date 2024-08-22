import { api } from 'shared/api'
import { createEffect, createEvent, createStore } from 'effector'
import type {
  CreatePlanDTO,
  PlanDTO,
  PlanUserNameUpdateDTO,
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

//? _____________________________events_____________________________________

const planUpdate = createEvent<PlanDTO>()

//? _____________________________stores_____________________________________

const $currentPlan = createStore<PlanDTO | null>(null).on(
  [getPlanFx.doneData, planUpdate],
  (_, payload) => payload,
)

//? _____________________________others_____________________________________

export const effects = {
  createPlanFx,
  getPlanFx,
  updatePlanUserNameFx,
}

export const events = {
  planUpdate,
}

export const stores = {
  $currentPlan,
}
