import { Button, Card, Typography } from 'antd'
import clsx from 'clsx'

import type { Task } from '@/types/task'

const { Title, Text, Paragraph } = Typography

const tasks: Task[] = [
  {
    id: 't2000000-0000-4000-8000-000000000001',
    title: 'Позвонить клиенту',
    description: 'Обсудить детали сделки',
    dealId: 'd1000000-0000-4000-8000-000000000001',
    assigneeId: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
    status: 'in_progress',
    dueDate: '2026-03-15T18:00:00Z',
    createdAt: '2026-03-10T10:00:00Z',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: 't2000000-0000-4000-8000-000000000002',
    title: 'Подготовить коммерческое предложение',
    description: 'Отправить PDF клиенту',
    dealId: 'd1000000-0000-4000-8000-000000000003',
    assigneeId: '5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002',
    status: 'new',
    dueDate: '2026-03-18T18:00:00Z',
    createdAt: '2026-03-11T09:00:00Z',
    createdBy: '2c4c0c9a-6b1e-4f7c-9a6b-1f9a7a2e1001',
  },
  {
    id: 't2000000-0000-4000-8000-000000000003',
    title: 'Закрыть сделку',
    description: 'Подписать акт выполненных работ',
    dealId: 'd1000000-0000-4000-8000-000000000002',
    assigneeId: '5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002',
    status: 'completed',
    dueDate: '2026-03-05T15:00:00Z',
    createdAt: '2026-02-20T11:00:00Z',
    createdBy: '5b7a3c2d-9e4f-4a1c-b2d3-7f6e5c4b1002',
  },
]

const statusMap = {
  in_progress: 'В работе',
  new: 'Новая',
  completed: 'Завершена',
}

const statusBgMap = {
  new: 'bg-blue-100',
  in_progress: 'bg-white',
  completed: 'bg-green-100',
}

const statusColorMap = {
  new: 'text-gray-800',
  in_progress: 'text-blue-500',
  completed: 'text-green-500',
}

export const LastTasks = () => {
  return (
    <div className="flex flex-col">
      <Title level={5} className="mb-2 font-bold">
        топ 10 активных клиентов
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={clsx('shadow-md flex flex-col', statusBgMap[task.status])}
            classNames={{ body: 'px-4 py-3 h-full flex flex-col' }}
          >
            <div className="grow">
              <Paragraph className="font-bold text-sm block mb-[2px]">{task.title}</Paragraph>
              <Paragraph className="text-xs text-gray-400 mb-[2px]">сделка</Paragraph>
              <Text className="text-sm text-gray-500">Проект «Сварог 2024»</Text>
            </div>
            <div className="mt-2 flex justify-between">
              <Text className="text-sm text-gray-500">{task.dueDate}</Text>
              <Text className={clsx('text-sm', statusColorMap[task.status])}>
                {statusMap[task.status]}
              </Text>
            </div>
          </Card>
        ))}
      </div>
      <div>
        <Button type="primary" size="large">
          Новая задача
        </Button>
      </div>
    </div>
  )
}
