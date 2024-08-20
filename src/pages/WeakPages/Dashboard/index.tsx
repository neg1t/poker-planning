import { Button, Flex, Typography } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const WeakDashboardPage: React.FC = () => {
  return (
    <Flex vertical gap={20}>
      <Typography.Title level={4}>Weak Dashboard Page</Typography.Title>
      <Button type='primary'>Войти</Button>

      <Outlet />
    </Flex>
  )
}
