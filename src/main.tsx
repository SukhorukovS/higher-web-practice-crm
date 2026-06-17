import './index.css'

import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { antdThemeTokens } from './styles/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: antdThemeTokens,
          components: {
            Layout: {
              lightSiderBg: '#F9FAFB',
              lightTriggerBg: '#F9FAFB',
            },
            Menu: {
              itemSelectedBg: 'transparent',
              collapsedIconSize: 24,
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
)
