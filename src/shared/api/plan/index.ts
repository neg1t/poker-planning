import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
} from 'firebase/firestore/lite'
import {
  CreatePlanDTO,
  PlanDTO,
  PlanUserNameUpdateDTO,
  PlanVoteDTO,
  PlanVoteUpdateDTO,
  ReqFetchJoinToPlan,
  ReqFetchUpdatePlanCurrentVote,
  ReqFetchUpdateResult,
} from './types'
import { db } from 'shared/firebase'
import unqiid from 'uniqid'
import { DB_TABLES } from '..'
import dayjs from 'dayjs'

export const fetchCreatePlan = async (data: CreatePlanDTO): Promise<string> => {
  try {
    const uid = unqiid()
    return await setDoc(doc(db, DB_TABLES.PLANNING, uid), {
      ...data,
      id: uid,
    }).then(() => Promise.resolve(uid))
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchJoinToPlan = async (
  data: ReqFetchJoinToPlan,
): Promise<void> => {
  try {
    const plan = (
      await getDoc(doc(db, DB_TABLES.PLANNING, data.planId))
    ).data() as PlanDTO
    return await updateDoc(doc(db, DB_TABLES.PLANNING, data.planId), {
      users: [
        ...plan.users,
        {
          id: data.user.uid,
          active: true,
          name: data.user.displayName,
        },
      ],
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchUpdatePlanCurrentVote = async ({
  planId,
  planVoteId,
}: ReqFetchUpdatePlanCurrentVote): Promise<void> => {
  try {
    return await updateDoc(doc(db, DB_TABLES.PLANNING, planId), {
      currentVoteId: planVoteId,
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchUpdateResult = async ({
  planVoteId,
  result,
}: ReqFetchUpdateResult): Promise<void> => {
  try {
    return await updateDoc(doc(db, DB_TABLES.PLAN_VOTE, planVoteId), {
      result,
    })
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchPlanById = async (id: string): Promise<PlanDTO> => {
  try {
    const plan = await getDoc(doc(db, DB_TABLES.PLANNING, id))
    return plan.data() as PlanDTO
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchPlanUserNameUpdate = async (
  data: PlanUserNameUpdateDTO,
): Promise<void> => {
  try {
    const planRef = doc(db, DB_TABLES.PLANNING, data.planId)
    const plan = (await getDoc(planRef)).data() as PlanDTO

    plan.users = plan.users.flatMap((item) =>
      item.id === data.userId ? { ...item, name: data.userName } : item,
    )

    return await setDoc(planRef, plan)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchPlanVoteCreate = async (planId: string): Promise<string> => {
  try {
    const newId = unqiid()
    const planVoteRef = doc(db, DB_TABLES.PLAN_VOTE, newId)
    await setDoc(planVoteRef, {
      id: newId,
      planId,
      createdAt: dayjs().format('DD-MM-YYYY HH:mm:ss'),
      usersVotes: [],
    } as PlanVoteDTO)
    return newId
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchPlanVoteUpdate = async (
  data: PlanVoteUpdateDTO,
): Promise<void> => {
  try {
    const planVoteRef = doc(db, DB_TABLES.PLAN_VOTE, data.id)
    const planVote = (await getDoc(planVoteRef)).data() as PlanVoteDTO

    if (planVote.usersVotes.some((userVote) => userVote.id === data.user.uid)) {
      planVote.usersVotes = planVote.usersVotes.flatMap((item) =>
        item.id === data.user.uid ? { ...item, vote: data.vote } : item,
      )
    } else {
      planVote.usersVotes = [
        ...planVote.usersVotes,
        {
          vote: data.vote,
          name: data.user.displayName as string,
          id: data.user.uid,
        },
      ]
    }

    return await setDoc(planVoteRef, planVote)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const fetchLastPlanVote = async (
  planId: string,
): Promise<PlanVoteDTO> => {
  try {
    const planVoteQuery = query(
      collection(db, DB_TABLES.PLAN_VOTE),
      where('planId', '==', planId),
      orderBy('createdAt', 'desc'),
      limit(1),
    )

    const planVoteSnapshot = await getDocs(planVoteQuery)

    const planVote = planVoteSnapshot.docs.map((item) =>
      item.data(),
    )[0] as PlanVoteDTO

    return planVote
  } catch (err) {
    return Promise.reject(err)
  }
}
