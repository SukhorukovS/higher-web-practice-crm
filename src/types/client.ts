export type Client = {
  id: string
  name: string
  phone: string
  email: string
  company: string
  website?: string
  comment?: string

  createdAt: string
  deleted?: boolean

  createdBy: string // userId
}

export type CreateClientPayload = {
  name: string
  phone: string
  email: string
  company: string
  website?: string
  comment?: string
  createdBy: string
}

export type UpdateClientPayload = Partial<CreateClientPayload>
