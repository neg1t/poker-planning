import { Button, Flex, Typography } from 'antd'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const WeakDashboardPage: React.FC = () => {
  const navigate = useNavigate()

  const loginClickHandler = () => {
    navigate('/login')
  }

  return (
    <Flex vertical gap={20}>
      <Typography.Title level={4}>Weak Dashboard Page</Typography.Title>
      <Button type='primary' onClick={loginClickHandler}>
        Войти
      </Button>

      <Outlet />
    </Flex>
  )
}
