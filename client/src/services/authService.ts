import type { SignInInput, SignUpInput, User } from '../types/auth'

const USERS_KEY = 'foodie-amazon:users'
const SESSION_KEY = 'foodie-amazon:session'
const PBKDF2_ITERATIONS = 100_000

export type AuthErrorCode = 'email-taken' | 'invalid-credentials'

export class AuthError extends Error {
  code: AuthErrorCode

  constructor(code: AuthErrorCode, message: string) {
    super(message)
    this.name = 'AuthError'
    this.code = code
  }
}

interface StoredUser extends User {
  passwordHash: string
  salt: string
  createdAt: string
}

function readUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    const parsed: unknown = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed) ? (parsed as StoredUser[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    throw new Error('Could not save the account')
  }
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    256,
  )

  return Array.from(new Uint8Array(bits), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
}

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const toPublicUser = ({ id, name, email, phone }: StoredUser): User => ({
  id,
  name,
  email,
  phone,
})

function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
  }
}

function saveSession(userId: string, remember: boolean) {
  clearSession()

  try {
    ;(remember ? localStorage : sessionStorage).setItem(SESSION_KEY, userId)
  } catch {

  }
}

export function getSessionUser(): User | null {
  try {
    const userId =
      localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)
    const user = readUsers().find((candidate) => candidate.id === userId)

    return user ? toPublicUser(user) : null
  } catch {
    return null
  }
}

export async function signUp({
  name,
  email,
  phone,
  password,
}: SignUpInput): Promise<User> {
  const users = readUsers()
  const emailAddress = normalizeEmail(email)

  if (users.some((user) => user.email === emailAddress)) {
    throw new AuthError('email-taken', 'An account with this email already exists')
  }

  const salt = crypto.randomUUID()
  const user: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: emailAddress,
    phone: phone.trim(),
    passwordHash: await hashPassword(password, salt),
    salt,
    createdAt: new Date().toISOString(),
  }

  writeUsers([...users, user])
  saveSession(user.id, true)

  return toPublicUser(user)
}

export async function signIn({
  email,
  password,
  remember,
}: SignInInput): Promise<User> {
  const emailAddress = normalizeEmail(email)
  const user = readUsers().find((candidate) => candidate.email === emailAddress)
  const passwordHash = user ? await hashPassword(password, user.salt) : ''

  if (!user || passwordHash !== user.passwordHash) {
    throw new AuthError('invalid-credentials', 'Incorrect email or password')
  }

  saveSession(user.id, remember)

  return toPublicUser(user)
}

export function signOut() {
  clearSession()
}

export async function requestPasswordReset(email: string): Promise<void> {
  void email
  await new Promise((resolve) => setTimeout(resolve, 600))
}