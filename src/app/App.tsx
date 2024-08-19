import { Flex, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { api } from 'shared/api'
import { IUserDTO } from 'shared/api/user/types'

function App() {
  const [user, setUser] = useState<IUserDTO[]>([])

  const getData = async () => {
    const users = await api.userAPI.fetchUsers()
    setUser(users)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Flex vertical gap={20}>
      {user.map((item) => (
        <Typography.Text key={item.name}>{item.name}</Typography.Text>
      ))}
    </Flex>
  )
}

export default App
