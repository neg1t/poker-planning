import React from 'react'
import { planModel } from '..'
import { useUnit } from 'effector-react'
import { Button, Card, Flex, Typography } from 'antd'
import clsx from 'clsx'
import crownIcon from 'shared/assets/icons/crown.svg'
import './styles.scss'
import { DeleteOutlined } from '@ant-design/icons'
import { userModel } from 'entities/user'

const { Text } = Typography

interface UsersListProps {
  onClick?: (userId: string) => (ev: React.MouseEvent) => void
}

export const UsersList: React.FC<UsersListProps> = (props) => {
  const { onClick } = props

  const { stores, effects } = planModel

  const plan = useUnit(stores.$currentPlan)
  const planVote = useUnit(stores.$currentPlanVote)
  const mySelf = useUnit(userModel.stores.$user)

  const isCreator = mySelf?.uid === plan?.creatorId

  const mySelfVote = planVote?.usersVotes.filter(
    (userVote) => userVote.id === mySelf?.uid,
  )[0]?.vote

  const kickUser = (userId: string) => () => {
    effects.leavePlanFx({
      planId: plan!.id,
      userId,
    })
  }

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

          {isCreator && user.id !== mySelf?.uid && (
            <Button
              onClick={kickUser(user.id)}
              className='user-card__remove'
              icon={<DeleteOutlined />}
              type='text'
              size='small'
            />
          )}

          <Flex vertical justify='center' align='center'>
            {user.id === mySelf?.uid && mySelfVote && (
              <div className='user-card__vote'>{mySelfVote}</div>
            )}

            <Text>{user.name || 'Кто ты воин?'}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}
