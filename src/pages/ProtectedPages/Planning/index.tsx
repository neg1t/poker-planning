import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { planModel, UsersList, VoteButtons } from 'entities/plan'
import { useUnit } from 'effector-react'
import { Button, Divider, Flex, Typography } from 'antd'
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
  const location = useLocation()

  const navigate = useNavigate()

  const plan = useUnit(stores.$currentPlan)
  const mySelf = useUnit(userModel.stores.$user)
  const currentPlanVote = useUnit(stores.$currentPlanVote)

  const isCreator = mySelf?.uid === plan?.creatorId

  const allUsersVotes =
    currentPlanVote?.usersVotes?.length === plan?.users?.length

  const voteButtonDisabled = !allUsersVotes ? !isCreator : false

  if (!mySelf?.uid) {
    navigate('/')
    userModel.events.userShouldNavigateUpdate(location.pathname)
  }

  useEffect(() => {
    if (plan?.id && mySelf?.displayName) {
      if (!plan.users.map((item) => item.id).includes(mySelf.uid)) {
        effects.joinPlanFx({
          planId: plan.id,
          user: mySelf,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySelf, plan])

  // если у пользователя нет имени заставляем его создает его)
  useUpdateUserName({ id })

  // подписываемся на обновление текущего плана
  useEffect(() => {
    let unsubscribe: Unsubscribe
    if (id) {
      unsubscribe = onSnapshot(
        doc(getFirestore(), DB_TABLES.PLANNING, id!),
        (doc) => {
          const newPlan = doc.data() as PlanDTO
          events.planUpdate(newPlan)
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

  const voteButtonClick = () => {
    let result = 0
    currentPlanVote?.usersVotes.forEach((vote) => {
      result += vote.vote
    })

    result =
      Math.round((result / (currentPlanVote?.usersVotes.length || 0)) * 100) /
      100

    if (currentPlanVote?.id) {
      effects.updateResultFx({ result, planVoteId: currentPlanVote.id })
    }
  }

  const createNewVoting = () => {
    effects.createPlanVoteFx(id!)
  }

  if (!plan) {
    return <Spinner />
  }

  return (
    <div className='planning-page'>
      <Flex flex={'5%'} justify='center' className='planning-page__header'>
        <div />
      </Flex>
      <Divider />
      <Flex flex={'85%'} justify='center' className='planning-page__content'>
        <Flex vertical gap={20}>
          <UsersList />

          {currentPlanVote?.result && (
            <Flex vertical gap={10} justify='center' align='center'>
              <Typography.Text>
                Результат: {currentPlanVote?.result}
              </Typography.Text>
              <Button
                disabled={!isCreator}
                onClick={createNewVoting}
                type='primary'
              >
                Новое голосование
              </Button>
            </Flex>
          )}

          {!currentPlanVote?.result && (
            <Flex justify='center' align='center'>
              <Button
                size='large'
                disabled={voteButtonDisabled}
                type='primary'
                onClick={voteButtonClick}
              >
                Голосовать
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Divider />
      <Flex flex={'10%'} justify='center' className='planning-page__footer'>
        <VoteButtons disabled={!!currentPlanVote?.result} />
      </Flex>
    </div>
  )
}
