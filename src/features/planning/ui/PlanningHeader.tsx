import React from 'react'
import { Button, Flex, message } from 'antd'

import { ShareAltOutlined } from '@ant-design/icons'

export const PlanningHeader: React.FC = () => {
  const shareClickHandler = () => {
    message.success({
      content: 'Ссылка успешно скопирована',
    })

    window.navigator.clipboard.writeText(window.location.href)
  }

  return (
    <Flex justify='space-between' className='w-full'>
      <div />

      <Button
        onClick={shareClickHandler}
        icon={<ShareAltOutlined />}
        type='primary'
      />
    </Flex>
  )
}
