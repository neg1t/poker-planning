import { Button, Flex, Form, Input } from 'antd'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { signUpModel } from 'entities/signUp'
import React from 'react'
import useComponentWillUnmount from 'shared/hooks/useComponentWillUnmount'
import { utils } from 'shared/utils'

export const RegisterForm: React.FC = () => {
  const { stores, effects } = signUpModel

  const { values, fields, submit, reset } = useForm(stores.$form)

  const isLoading = useUnit(effects.createUserFx.pending)

  useComponentWillUnmount(() => {
    reset()
  })

  return (
    <Form layout='vertical' className='w-300'>
      <Form.Item
        id='email'
        label='e-mail'
        validateStatus={utils.effectorForm.formValidationStatus(
          fields,
          'email',
        )}
        help={utils.effectorForm.formErrorText(fields, 'email')}
      >
        <Input
          autoFocus
          id='email'
          placeholder='e-mail'
          value={values.email}
          defaultValue={values.email}
          onChange={utils.effectorForm.formInputChange(fields, 'email')}
          onBlur={utils.effectorForm.formBlur(fields, 'email')}
        />
      </Form.Item>

      <Form.Item
        id='password'
        label='password'
        validateStatus={utils.effectorForm.formValidationStatus(
          fields,
          'password',
        )}
        help={utils.effectorForm.formErrorText(fields, 'password')}
      >
        <Input.Password
          id='password'
          placeholder='password'
          value={values.password}
          defaultValue={values.password}
          onChange={utils.effectorForm.formInputChange(fields, 'password')}
          onBlur={utils.effectorForm.formBlur(fields, 'password')}
        />
      </Form.Item>

      <Flex vertical justify='center'>
        <Button loading={isLoading} type='primary' onClick={() => submit()}>
          Зарегистрироваться
        </Button>
      </Flex>
    </Form>
  )
}
