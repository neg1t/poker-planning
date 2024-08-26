import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { planModel, UsersList, VoteButtons } from 'entities/plan'
import { useUnit } from 'effector-react'
import { Button, Divider, Flex } from 'antd'
import { Spinner } from 'shared/components'
import { userModel } from 'entities/user'
import { DB_TABLES } from 'shared/api'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import type { Unsubscribe } from 'firebase/auth'
import type { PlanDTO, PlanVoteDTO } from 'shared/api/plan/types'
import useUpdateUserName from 'shared/hooks/useUpdateUserName'
import './styles.scss'

export const PlanningPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { effects, stores, events } = planModel

  const plan = useUnit(stores.$currentPlan)
  const mySelf = useUnit(userModel.stores.$user)
  const currentPlanVote = useUnit(stores.$currentPlanVote)

  const isCreator = mySelf?.uid === plan?.creatorId

  const allUsersVotes =
    currentPlanVote?.usersVotes?.length === plan?.users?.length

  const voteButtonDisabled = !isCreator || !allUsersVotes // todo проверка на всех проголосовавших

  // если у пользователя нет имени заставляем его создает его)
  useUpdateUserName({ id })

  // подписываемся на обновление текущего плана
  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (id) {
      unsubscribe = onSnapshot(
        doc(getFirestore(), DB_TABLES.PLANNING, id!),
        (doc) => {
          events.planUpdate(doc.data() as PlanDTO)
        },
      )

      effects.getLastPlanVoteFx(id)
    }

    return () => unsubscribe && unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // получаем данные о последнем голосовании
  useEffect(() => {
    if (id) {
      effects.getLastPlanVoteFx(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // подписываемся на обновление текущего голосования
  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (currentPlanVote?.id) {
      unsubscribe = onSnapshot(
        doc(getFirestore(), DB_TABLES.PLAN_VOTE, currentPlanVote.id),
        (doc) => {
          events.planVoteUpdate(doc.data() as PlanVoteDTO)
        },
      )
    }

    return () => unsubscribe && unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlanVote?.id])

  useEffect(() => {
    if (id) {
      effects.getPlanFx(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!plan) {
    return <Spinner />
  }

  return (
    <div className='planning-page'>
      <Flex flex={'5%'} justify='center' className='planning-page__header'>
        a
      </Flex>
      <Divider />
      <Flex flex={'85%'} justify='center' className='planning-page__content'>
        <Flex vertical gap={20}>
          <UsersList />
          <Button size='large' disabled={voteButtonDisabled} type='primary'>
            Голосовать
          </Button>
        </Flex>
      </Flex>
      <Divider />
      <Flex flex={'10%'} justify='center' className='planning-page__footer'>
        <VoteButtons />
      </Flex>
    </div>
  )
}
