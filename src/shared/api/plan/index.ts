import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { CreatePlanDTO, PlanDTO, PlanUserNameUpdateDTO } from './types'
import { db } from 'shared/firebase'
import unqiid from 'uniqid'
import { DB_TABLES } from '..'

export const fetchCreatePlan = async (data: CreatePlanDTO): Promise<string> => {
  try {
    const uid = unqiid()
    return await setDoc(doc(db, DB_TABLES.PLANNING, uid), data).then(() =>
      Promise.resolve(uid),
    )
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

    await setDoc(planRef, plan)
  } catch (err) {
    return Promise.reject(err)
  }
}
