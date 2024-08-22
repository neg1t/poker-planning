import React from 'react'
import { Flex, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './styles.scss'

interface SpinnerProps {
  fontSize?: number
}

type Spinner = {
  Screen: typeof Screen
}

const Screen: React.FC = () => {
  return (
    <Flex vertical justify='center' align='center' className='o-spin-screen'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} />} />
    </Flex>
  )
}

export const Spinner: React.FC<SpinnerProps> & Spinner = (props) => {
  const { fontSize = 40 } = props
  return <Spin indicator={<LoadingOutlined style={{ fontSize }} />} />
}

Spinner.Screen = Screen
