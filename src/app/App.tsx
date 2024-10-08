import { BrowserRouter } from 'react-router-dom'
import locale from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { ConfigProvider } from 'antd'
import { themeConfig } from 'shared/config/theme'
import { AppLayout } from './Layout'
dayjs.locale('ru')

function App() {
  return (
    <ConfigProvider locale={locale} theme={themeConfig}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
