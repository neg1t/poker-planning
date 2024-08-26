import { Button, Flex } from 'antd'
import React from 'react'
import { planModel } from '..'
import { useUnit } from 'effector-react'
import { userModel } from 'entities/user'

export const VoteButtons: React.FC = () => {
  const { stores, effects } = planModel

  const plan = useUnit(stores.$currentPlan)
  const mySelf = useUnit(userModel.stores.$user)
  const currentPlanVote = useUnit(stores.$currentPlanVote)

  const voteLoading = useUnit(effects.updatePlanVoteFx.pending)

  const voteClickHandler = (vote: number) => () => {
    if (currentPlanVote && plan && mySelf) {
      effects.updatePlanVoteFx({
        id: currentPlanVote.id,
        planId: plan.id,
        user: mySelf,
        vote,
      })
    }
  }

  if (!plan?.votesToSelect?.length) {
    return null
  }

  return (
    <Flex gap={20} align='center' justify='space-between' wrap>
      {plan.votesToSelect.map((vote) => (
        <Button
          key={vote}
          size='large'
          type='primary'
          disabled={voteLoading}
          onClick={voteClickHandler(vote)}
        >
          {vote}
        </Button>
      ))}
    </Flex>
  )
}
