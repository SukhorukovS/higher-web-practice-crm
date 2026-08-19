import 'dayjs/locale/ru'

import { Button, Card, Spin, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { useGetUserTasksQuery } from '@/app/endpoints/tasks'
import { useAppSelector } from '@/app/store'
import { statusBgMap, statusColorMap, statusMap } from '@/constants/statusMaps'

import { TaskModal } from '../modals/TaskModal'

const { Title, Text, Paragraph } = Typography

export const LastTasks = () => {
  const user = useAppSelector((state) => state.auth.user)
  const { data: tasks, isLoading } = useGetUserTasksQuery(user?.id ?? '', {
    skip: !user,
  })
  const [isOpen, setIsOpen] = useState(false)

  const lastTasks = useMemo(() => {
    if (!tasks) return []
    return [...tasks]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
  }, [tasks])

  return (
    <>
      <div className="dashboard-section">
        <Title level={5} className="dashboard-title">
          Последние 10 задач
        </Title>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : (
          <div className="dashboard-grid">
            {lastTasks.map((task) => (
              <Card
                key={task.id}
                className={clsx('dashboard-card-col', statusBgMap[task.status])}
                classNames={{ body: 'dashboard-card-col-body' }}
              >
                <div className="grow">
                  <Paragraph className="font-bold text-sm block mb-[2px]">{task.title}</Paragraph>
                  <Paragraph className="text-xs text-gray-400 mb-[2px]">сделка</Paragraph>
                  <Text className="text-sm text-gray-500">{task.description}</Text>
                </div>
                <div className="mt-2 flex justify-between">
                  <Text className="text-sm text-gray-500">
                    до {dayjs(task.dueDate).locale('ru').format('D MMMM YYYY')}
                  </Text>
                  <Text className={clsx('text-sm', statusColorMap[task.status])}>
                    {statusMap[task.status]}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-10 md:mt-3">
          <Button
            type="primary"
            size="large"
            className="w-full md:w-auto"
            onClick={() => setIsOpen(true)}
          >
            Новая задача
          </Button>
        </div>
      </div>
      <TaskModal isOpen={isOpen} handleCancel={() => setIsOpen(false)} />
    </>
  )
}
