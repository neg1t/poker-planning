import { Button, Flex } from 'antd'
import React from 'react'
import { planModel } from '..'
import { useUnit } from 'effector-react'

interface VoteButtonsProps {
  voteClick: (count: number) => (ev: React.MouseEvent) => void
}

export const VoteButtons: React.FC<VoteButtonsProps> = (props) => {
  const { voteClick } = props

  const { stores } = planModel

  const plan = useUnit(stores.$currentPlan)

  if (!plan) {
    return null
  }

  return (
    <Flex gap={20} align='center' justify='space-between' wrap>
      {plan.votesToSelect.map((vote) => (
        <Button
          key={vote}
          size='large'
          type='primary'
          onClick={voteClick(vote)}
        >
          {vote}
        </Button>
      ))}
    </Flex>
  )
}
