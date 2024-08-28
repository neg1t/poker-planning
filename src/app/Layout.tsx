import { Button, Flex, Layout } from 'antd'
import React, { useEffect } from 'react'
import { HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { Spinner } from 'shared/components'
import { useUnit } from 'effector-react'
import { userModel } from 'entities/user'
import { Router } from './Router'
import { planModel } from 'entities/plan'
import './styles.scss'

export const AppLayout: React.FC = () => {
  const { events, stores } = userModel

  const firebaseAuth = getAuth()
  const auth = useUnit(stores.$auth)
  const user = useUnit(stores.$user)
  const userShouldNavigate = useUnit(stores.$userShouldNavigateTo)
  const userDataLoad = useUnit(stores.$userDataLoad)

  const plan = useUnit(planModel.stores.$currentPlan)

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    events.userUpdate(currentUser)
    events.setUserDataLoad(true)
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (user?.uid && userShouldNavigate) {
      navigate(userShouldNavigate)
      events.userShouldNavigateUpdate('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userShouldNavigate, user])

  const homeClickHandler = () => {
    navigate('/')
  }

  const loginClickHandler = () => {
    navigate('/login')
  }

  const logoutClickHandler = async () => {
    if (auth) {
      await planModel.effects
        .leavePlanFx({
          planId: plan!.id,
          userId: user!.uid,
        })
        .then(() => {
          signOut(auth)
        })
    }
  }

  const signUpHandler = () => {
    navigate('/register')
  }

  if (userDataLoad === false) {
    return <Spinner.Screen />
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
            {!user && (
              <Button type='primary' size='small' onClick={signUpHandler}>
                Регистрация
              </Button>
            )}
            {user ? (
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
        <Router isAuth={!!user} />
      </Layout.Content>
    </Layout>
  )
}
