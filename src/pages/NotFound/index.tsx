import { Button, Flex, Result, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <Space className='not-found-page'>
      <Flex vertical>
        <Result
          status='404'
          title='404'
          subTitle='Упс... Страница потерялась'
          extra={
            <Button type='link' onClick={goHome}>
              Домой
            </Button>
          }
        />
      </Flex>
    </Space>
  )
}
