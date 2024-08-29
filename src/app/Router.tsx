import { NotFoundPage } from 'pages/NotFound'
import {
  PlanningPage,
  ProtectedDashboardPage,
  SettingsPage,
} from 'pages/ProtectedPages'
import { LoginPage, RegisterPage, WeakDashboardPage } from 'pages/WeakPages'
import React, { type ComponentProps } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

type TRoute = {
  element: ComponentProps<typeof Route>['element']
  path: ComponentProps<typeof Route>['path']
}

const weakRoutes: TRoute[] = [
  {
    element: <WeakDashboardPage />,
    path: '/',
  },
  {
    element: <RegisterPage />,
    path: '/register',
  },
  {
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <PlanningPage />,
    path: '/planning/:id',
  },
  {
    element: <NotFoundPage />,
    path: '/*',
  },
]

const protectedRoutes: TRoute[] = [
  {
    path: '/',
    element: <ProtectedDashboardPage />,
  },
  {
    element: <PlanningPage />,
    path: '/planning/:id',
  },
  {
    element: <SettingsPage />,
    path: '/settings',
  },
  {
    path: '/*',
    element: <Navigate to='/' replace />,
  },
]

interface RouterProps {
  isAuth: boolean
}

export const Router: React.FC<RouterProps> = (props) => {
  const { isAuth } = props

  console.log('isAuth', isAuth)

  const renderRoutes = (routes: TRoute[]) =>
    routes.map((route) => <Route key={route.path} {...route} />)

  return <Routes>{renderRoutes(isAuth ? protectedRoutes : weakRoutes)}</Routes>
}
