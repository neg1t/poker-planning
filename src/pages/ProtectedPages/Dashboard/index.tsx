import { Button, Flex } from 'antd'
import { useUnit } from 'effector-react'
import { planModel } from 'entities/plan'
import { userModel } from 'entities/user'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FIBONACCI_VOTES } from 'shared/lib/consts'

export const ProtectedDashboardPage: React.FC = () => {
  const navigate = useNavigate()

  const { effects } = planModel

  const isLoading = useUnit(effects.createPlanFx.pending)
  const user = useUnit(userModel.stores.$user)

  const createPlanHandler = () => {
    if (user) {
      effects
        .createPlanFx({
          creatorId: user.uid,
          users: [
            {
              id: user.uid,
              active: true,
              name: user.displayName || '',
            },
          ],
          votesToSelect: FIBONACCI_VOTES,
        })
        .then((uid) => {
          effects.createPlanVoteFx(uid)
          navigate(`planning/${uid}`)
        })
    }
  }

  return (
    <Flex vertical gap={20}>
      <Button type='primary' loading={isLoading} onClick={createPlanHandler}>
        Начать планирование
      </Button>

      <Outlet />
    </Flex>
  )
}
