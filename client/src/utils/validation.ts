// for email confirmation like ubaidah@blablabla
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Optional +, then 7 to 15 digits, spaces or dashes
export const PHONE_PATTERN = /^\+?[0-9\s-]{7,15}$/

// At least 8 characters, with at least one letter and one number
export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/