export interface User {
    id: string
    name: string
    email: string
    phone: string
  }
  
  export interface SignUpInput {
    name: string
    email: string
    phone: string
    password: string
  }
  
  export interface SignInInput {
    email: string
    password: string
    remember: boolean
  }