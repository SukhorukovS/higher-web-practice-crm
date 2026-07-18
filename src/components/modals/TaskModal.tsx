import { Button, Modal, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { FC } from 'react'

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '@/app/endpoints/tasks'
import { TaskForm, type TaskFormValues } from '@/components/forms/TaskForm'
import type { Task, TaskStatus } from '@/types/task'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  task?: Task
}

const { Title, Paragraph } = Typography

const TASK_FORM_ID = 'task-form'

const ModalTitle = ({ createdAt }: { createdAt?: string }) => {
  if (createdAt) {
    return (
      <div className="flex justify-between">
        <Title level={3} className="text-2xl">
          Карточка задачи
        </Title>
        <Paragraph>Создана {dayjs(createdAt).locale('ru').format('D MMMM YYYY')}</Paragraph>
      </div>
    )
  }

  return (
    <Title level={3} className="text-2xl">
      Новая задача
    </Title>
  )
}

export const TaskModal: FC<Props> = ({ isOpen, task, handleCancel }) => {
  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const onSubmit = async (data: TaskFormValues) => {
    const payload = {
      title: data.title,
      description: data.description,
      dealId: data.dealId,
      dueDate: data.dueDate,
    }

    if (task) {
      await updateTask({ id: task.id, ...payload, status: data.status as TaskStatus })
    } else {
      await createTask({ ...payload, assigneeId: '' })
    }
    handleCancel()
  }

  const onDelete = async () => {
    if (task) {
      await deleteTask(task.id)
      handleCancel()
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={<ModalTitle createdAt={task?.createdAt} />}
      closeIcon={null}
      classNames={{ container: 'h-full bg-white rounded-none md:h-auto md:rounded-xl' }}
      footer={[
        <div className="flex gap-4" key="footer">
          <Button
            key="submit"
            type="primary"
            className="grow font-bold"
            htmlType="submit"
            form={TASK_FORM_ID}
          >
            {task ? 'Редактировать' : 'Cоздать'}
          </Button>
          <Button
            key="back"
            onClick={task ? onDelete : handleCancel}
            className={clsx(task && 'text-red-500', 'font-bold')}
          >
            {task ? 'Удалить задачу' : 'Отменить'}
          </Button>
        </div>,
      ]}
    >
      <TaskForm key={task?.id ?? 'new'} task={task} onSubmit={onSubmit} formId={TASK_FORM_ID} />
    </Modal>
  )
}
