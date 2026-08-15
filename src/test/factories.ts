import type { Client } from '../types/client'
import type { Deal } from '../types/deal'
import type { Task } from '../types/task'
import type { User } from '../types/user'

export const client = (overrides: Partial<Client> = {}): Client => ({
  id: 'c1',
  name: 'Иван',
  phone: '+70000000000',
  email: 'ivan@example.com',
  company: 'ООО Ромашка',
  createdAt: '2026-01-01T00:00:00Z',
  createdBy: 'u1',
  ...overrides,
})

export const deal = (overrides: Partial<Deal> = {}): Deal => ({
  id: 'd1',
  title: 'Сделка',
  clientId: 'c1',
  amount: 1000,
  status: 'new',
  createdAt: '2026-01-01T00:00:00Z',
  completedAt: undefined,
  createdBy: 'u1',
  ...overrides,
})

export const task = (overrides: Partial<Task> = {}): Task => ({
  id: 't1',
  title: 'Задача',
  assigneeId: 'u1',
  status: 'new',
  createdAt: '2026-08-10T00:00:00Z',
  createdBy: 'u1',
  ...overrides,
})

export const user = (overrides: Partial<User> = {}): User => ({
  id: 'u1',
  email: 'ivan@example.com',
  name: 'Иван',
  surname: 'Петров',
  createdAt: '2026-01-01T00:00:00Z',
  ...overrides,
})
