import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { User } from '@/types/user'
import { getCookie, removeCookie, setCookie } from '@/utils/cookies'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const savedUser = getCookie('auth_user')
let initialUser: User | null = null
try {
  if (savedUser) initialUser = JSON.parse(savedUser)
} catch {
  removeCookie('auth_user')
}

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: initialUser !== null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true
      setCookie('auth_user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      removeCookie('auth_user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export const authReducer = authSlice.reducer
