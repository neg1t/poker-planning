import type { ThemeConfig } from 'antd'

const token: ThemeConfig['token'] = {
  colorPrimary: '#af97ed',
  // colorInfo: '#361766',
}

const components: ThemeConfig['components'] = {
  Form: {
    itemMarginBottom: 14,
  },
  Layout: {
    headerBg: '#7e92a6',
    padding: 0,
  },
  // Menu: {
  //   itemSelectedColor: '#d9503b',
  // },
  // Typography: {
  //   titleMarginBottom: 0,
  // },
}

export const themeConfig: ThemeConfig = {
  token,
  components,
  cssVar: true,
}
