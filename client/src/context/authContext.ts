import { createContext } from 'react'
import type { SignInInput, SignUpInput, User } from '../types/auth'

export interface AuthContextValue {
  user: User | null
  signIn: (input: SignInInput) => Promise<void>
  signUp: (input: SignUpInput) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)