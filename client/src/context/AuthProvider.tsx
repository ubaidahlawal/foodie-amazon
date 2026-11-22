import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import * as authService from '../services/authService'
import type { SignInInput, SignUpInput, User } from '../types/auth'
import { AuthContext } from './authContext'
import type { AuthContextValue } from './authContext'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(authService.getSessionUser)

  const signIn = useCallback(async (input: SignInInput) => {
    setUser(await authService.signIn(input))
  }, [])

  const signUp = useCallback(async (input: SignUpInput) => {
    setUser(await authService.signUp(input))
  }, [])

  const signOut = useCallback(() => {
    authService.signOut()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, signIn, signUp, signOut }),
    [user, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider