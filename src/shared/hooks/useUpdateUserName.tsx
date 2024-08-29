import { Modal } from 'antd'
import { FormProps } from 'antd/lib'
import { useUnit } from 'effector-react'
import { planModel } from 'entities/plan'
import { UpdateUserNameForm, userModel } from 'entities/user'
import { useEffect } from 'react'

interface UseUpdateUserNameProps {
  id?: string
}

export const useUpdateUserName = (props: UseUpdateUserNameProps) => {
  const { id } = props

  const { effects } = planModel

  const mySelf = useUnit(userModel.stores.$user)

  //todo тут бы еще блокировать нажатие ESC

  const saveUserNameHandler: FormProps['onFinish'] = (values: {
    userName: string
  }) => {
    if (mySelf) {
      userModel.effects
        .updateUserNameFx({
          user: mySelf,
          name: values.userName,
        })
        .then(() => {
          effects.updatePlanUserNameFx({
            userId: mySelf.uid,
            planId: id!,
            userName: values.userName,
          })
          Modal.destroyAll()
        })
    }
  }

  useEffect(() => {
    if (mySelf && !mySelf.displayName) {
      Modal.confirm({
        maskClosable: false,
        icon: null,
        title: 'Кажется Вы не представились',
        content: <UpdateUserNameForm onFinish={saveUserNameHandler} />,
        footer: null,
      })
    } else {
      Modal.destroyAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySelf])

  if (!id) {
    return null
  }
}
export default useUpdateUserName
