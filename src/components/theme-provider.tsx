'use client'

import { ConfigProvider, type ThemeConfig } from 'antd'
import type { ReactNode } from 'react'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#0f766e',
    borderRadius: 8,
    fontFamily: 'var(--font-geist-sans)',
  },
  components: {
    Form: {
      labelColor: '#ffffff',
    },
    Input: {
      activeShadow: '0 0 0 2px rgba(15, 118, 110, 0.15)',
    },
    Checkbox: {
      colorText: '#ffffff',
    },
    Modal: {
      colorIcon: '#ffffff',
      contentBg: '#141414',
      colorBgContainer: '#141414',
    }
  },
}

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>
}
