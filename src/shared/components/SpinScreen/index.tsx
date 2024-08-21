import React from 'react'
import { Flex, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './styles.scss'

export const SpinScreen: React.FC = () => {
  return (
    <Flex vertical justify='center' align='center' className='o-spin-screen'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} />} />
    </Flex>
  )
}
