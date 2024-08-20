import { Button, Flex, Typography } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const ProtectedDashboardPage: React.FC = () => {
  return (
    <Flex vertical gap={20}>
      <Typography.Title level={4}>Protected Dashboard Page</Typography.Title>
      <Button type='primary'>Начать планирование</Button>

      <Outlet />
    </Flex>
  )
}
