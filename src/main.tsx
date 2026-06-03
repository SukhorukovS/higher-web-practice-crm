import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import './index.css';
import App from './App.tsx';
import { antdThemeTokens } from './styles/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          token: antdThemeTokens,
        }}
      >
        <App />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
)
