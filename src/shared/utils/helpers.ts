import { notification } from 'antd'

export const showFirebaseErrorNotification = (error: unknown) => {
  notification.error({
    message: error instanceof Error && error.message,
    placement: 'bottom',
  })
  return Promise.reject(error)
}
