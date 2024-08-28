import React from 'react'
import { planModel } from '..'
import { useUnit } from 'effector-react'
import { Card, Flex, Typography } from 'antd'
import clsx from 'clsx'
import crownIcon from 'shared/assets/icons/crown.svg'
import './styles.scss'

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
    <Flex gap={30} justify='space-around' wrap align='center'>
      {plan.users.map((user) => (
        <Card
          className={clsx(
            'user-card',
            !!planVote?.usersVotes.some(
              (voteUser) => voteUser.id === user.id,
            ) && 'user-card_voted',
          )}
          key={user.id}
          onClick={onClick && onClick(user.id)}
          hoverable={!!onClick}
        >
          {plan.creatorId === user.id && (
            <img className='user-card__lead' src={crownIcon} alt='lead' />
          )}
          <Text>{user.name || 'Кто ты воин?'}</Text>
        </Card>
      ))}
    </Flex>
  )
}
