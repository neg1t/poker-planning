import { Button, Flex, Layout } from 'antd'
import React from 'react'
import { HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
import { getAuth } from 'firebase/auth'

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

export const AppLayout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const auth = getAuth()

  const navigate = useNavigate()

  const isAuth = auth.currentUser

  const homeClickHandler = () => {
    navigate('/')
  }

  const loginClickHandler = () => {
    navigate('/login')
  }

  const logoutClickHandler = () => {
    //todo logout function
  }

  const signUpHandler = () => {
    navigate('/register')
  }

  return (
    <Layout className='app-layout'>
      <Layout.Header className='app-layout__header'>
        <Flex justify='space-between' className='menu'>
          <Button
            type='primary'
            size='small'
            icon={<HomeOutlined />}
            onClick={homeClickHandler}
          />

          <Flex gap={20}>
            {!isAuth && (
              <Button type='primary' size='small' onClick={signUpHandler}>
                Регистрация
              </Button>
            )}
            {isAuth ? (
              <Button
                type='primary'
                size='small'
                icon={<LogoutOutlined />}
                onClick={logoutClickHandler}
              >
                Выйти
              </Button>
            ) : (
              <Button
                type='primary'
                size='small'
                icon={<LoginOutlined />}
                onClick={loginClickHandler}
              >
                Войти
              </Button>
            )}
          </Flex>
        </Flex>
      </Layout.Header>

      <Layout.Content className='app-layout__content'>
        {children}
      </Layout.Content>
    </Layout>
  )
}
