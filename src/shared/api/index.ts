export const DB_TABLES = {
  PLANNING: 'planning',
  USER: 'user',
  PLAN_VOTE: 'planVote',
}

import * as userAPI from './user'
import * as planAPI from './plan'

export const api = {
  userAPI,
  planAPI,
}
