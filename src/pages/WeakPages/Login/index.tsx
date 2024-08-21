import React from 'react'
import { LoginForm } from 'feature/login'
import useComponentWillUnmount from 'shared/hooks/useComponentWillUnmount'
import { useNavigate } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  useComponentWillUnmount(() => {
    navigate('/')
  })

  return <LoginForm />
}
