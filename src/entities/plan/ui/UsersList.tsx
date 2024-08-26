import React from 'react'
import { planModel } from '..'
import { useUnit } from 'effector-react'
import { Card, Flex, Typography } from 'antd'
import './styles.scss'
import clsx from 'clsx'

const { Text } = Typography

interface UsersListProps {
  onClick?: (userId: string) => (ev: React.MouseEvent) => void
}

export const UsersList: React.FC<UsersListProps> = (props) => {
  const { onClick } = props

  const { stores } = planModel

  const plan = useUnit(stores.$currentPlan)
  const planVote = useUnit(stores.$currentPlanVote)

  if (!plan?.users?.length) {
    return null
  }

  return (
    <Flex gap={30} justify='space-between' wrap align='center'>
      {plan.users.map((user) => (
        <Card
          className={clsx(
            'user-card',
            !!planVote?.usersVotes.some((user) =>
              plan.users.map((planUser) => planUser.id).includes(user.id),
            ) && 'user-card_voted',
          )}
          key={user.id}
          onClick={onClick && onClick(user.id)}
          hoverable={!!onClick}
        >
          <Text>{user.name || 'Кто ты воин?'}</Text>
        </Card>
      ))}
    </Flex>
  )
}
