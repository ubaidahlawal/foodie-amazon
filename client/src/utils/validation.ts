// This is for checking the shape only, like ubaidah@something.something with no space, basically for email confirmation.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Optional +, then 7 to 15 digits, spaces or dashes
export const PHONE_PATTERN = /^\+?[0-9\s-]{7,15}$/