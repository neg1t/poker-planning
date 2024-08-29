import { Button, Drawer, Flex, Layout, Modal, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { Spinner } from 'shared/components'
import { useUnit } from 'effector-react'
import { UpdateUserNameForm, userModel } from 'entities/user'
import { Router } from './Router'
import { planModel } from 'entities/plan'
import { FormProps } from 'antd/lib'
import './styles.scss'

export const AppLayout: React.FC = () => {
  const { events, stores } = userModel

  const [drawerOpen, setDrawerOpen] = useState(false)

  const location = useLocation()

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

  // закрываем Drawer после перехода на другую страницу
  useEffect(() => {
    setDrawerOpen(false)
  }, [location])

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

  const onOpenDrawer = () => {
    setDrawerOpen(true)
  }

  const onCloseDrawer = () => {
    setDrawerOpen(false)
  }

  const saveUserNameHandler: FormProps['onFinish'] = (values: {
    userName: string
  }) => {
    if (user) {
      userModel.effects
        .updateUserNameFx({
          user: user,
          name: values.userName,
        })
        .then(() => {
          if (plan) {
            planModel.effects.updatePlanUserNameFx({
              userId: user.uid,
              planId: plan.id,
              userName: values.userName,
            })
          }
          Modal.destroyAll()
        })
    }
  }

  const changeName = () => {
    setDrawerOpen(false)
    Modal.info({
      icon: null,
      closable: true,
      title: 'Изменение имени',
      content: <UpdateUserNameForm onFinish={saveUserNameHandler} />,
      footer: null,
    })
  }

  if (userDataLoad === false) {
    return <Spinner.Screen />
  }

  return (
    <Layout className='app-layout'>
      <Layout.Header className='app-layout__header'>
        <Flex justify='space-between' align='center' className='menu'>
          <Flex gap={20} align='center'>
            {user ? (
              <Button
                onClick={onOpenDrawer}
                icon={<MenuOutlined />}
                type='text'
              />
            ) : (
              <div />
            )}
            <Button
              type='primary'
              size='small'
              icon={<HomeOutlined />}
              onClick={homeClickHandler}
            />
          </Flex>

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

      {user && (
        <Drawer
          width={270}
          title={
            <Flex align='center' gap={20}>
              <UserOutlined />
              <Typography.Text>{user.displayName}</Typography.Text>
            </Flex>
          }
          closable={false}
          open={drawerOpen}
          onClose={onCloseDrawer}
          placement='left'
        >
          <ul className='drawer-list'>
            <Link className='drawer-list__item' to={'/settings'}>
              <SettingOutlined /> Настройки
            </Link>
            <div className='drawer-list__item' onClick={changeName}>
              <EditOutlined /> Изменить имя
            </div>
          </ul>
        </Drawer>
      )}

      <Layout.Content className='app-layout__content'>
        <Router isAuth={!!user} />
      </Layout.Content>
    </Layout>
  )
}
