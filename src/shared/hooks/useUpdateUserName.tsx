import { Button, Flex, Form, Input, Modal } from 'antd'
import { useUnit } from 'effector-react'
import { planModel } from 'entities/plan'
import { userModel } from 'entities/user'
import { useEffect } from 'react'
import { utils } from 'shared/utils'

interface UseUpdateUserNameProps {
  id?: string
}

export const useUpdateUserName = (props: UseUpdateUserNameProps) => {
  const { id } = props

  const { effects } = planModel

  const mySelf = useUnit(userModel.stores.$user)

  //todo тут бы еще блокировать нажатие ESC

  const saveUserNameHandler = (values: { userName: string }) => {
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
        content: (
          <Form layout='vertical' onFinish={saveUserNameHandler}>
            <Form.Item
              name='userName'
              label='Имя'
              required={false}
              rules={[
                {
                  required: true,
                  message: utils.validation.validationText.required,
                },
              ]}
            >
              <Input name='userName' placeholder='Введите имя' />
            </Form.Item>
            <Form.Item>
              <Flex justify='space-between'>
                <div />
                <Button type='primary' htmlType='submit'>
                  Сохранить
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        ),
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
