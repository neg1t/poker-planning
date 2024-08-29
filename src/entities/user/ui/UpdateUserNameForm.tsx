import { Button, Flex, Form, Input } from 'antd'
import { FormProps } from 'antd/lib'
import React from 'react'
import { utils } from 'shared/utils'

interface UpdateUserNameFormProps {
  onFinish: FormProps['onFinish']
}

export const UpdateUserNameForm: React.FC<UpdateUserNameFormProps> = (
  props,
) => {
  const { onFinish } = props

  return (
    <Form layout='vertical' onFinish={onFinish}>
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
  )
}
