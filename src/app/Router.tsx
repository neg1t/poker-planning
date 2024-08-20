import { NotFoundPage } from 'pages/NotFound'
import {
  PlanningPage,
  ProtectedDashboardPage,
  SettingsPage,
} from 'pages/ProtectedPages'
import { LoginPage, RegisterPage, WeakDashboardPage } from 'pages/WeakPages'
import React, { type ComponentProps } from 'react'
import { Routes, Route } from 'react-router-dom'

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
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <RegisterPage />,
    path: '/register',
  },
]

const protectedRoutes: TRoute[] = [
  {
    element: <ProtectedDashboardPage />,
    path: '/',
  },
  {
    element: <PlanningPage />,
    path: '/planning/:id',
  },
  {
    element: <SettingsPage />,
    path: '/settings',
  },
]

export const Router: React.FC = () => {
  const isAuth = false

  const renderRoutes = (routes: TRoute[]) =>
    routes.map((route) => <Route key={route.path} {...route} />)

  return (
    <Routes>
      {renderRoutes(isAuth ? protectedRoutes : weakRoutes)}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
