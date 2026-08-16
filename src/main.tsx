import './index.css'

import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from '@/App'
import { store } from '@/app/store'
import { antdThemeTokens } from '@/styles/theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
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
              Pagination: {
                itemActiveBg: '#3B82F6',
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </StyleProvider>
    </Provider>
  </StrictMode>,
)
