export type User = {
  id: string
  email: string
  name: string
  surname: string
  createdAt: string
  password?: string
}

export type UserProfile = User & {
  password?: string
}

export type RegisterPayload = {
  email: string
  password: string
  name: string
  surname: string
  username: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type UpdateProfilePayload = {
  email?: string
  name?: string
  surname?: string
  password?: string
}
