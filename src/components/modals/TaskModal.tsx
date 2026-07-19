import 'dayjs/locale/ru'

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
import { LeftArrowIcon } from '@/icons/LeftArrowIcon'
import type { Task, TaskStatus } from '@/types/task'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  task?: Task
}

const { Title, Paragraph } = Typography

const TASK_FORM_ID = 'task-form'

const ModalTitle = ({ createdAt, onCancel }: { createdAt?: string; onCancel: () => void }) => {
  if (createdAt) {
    return (
      <div className="md:flex justify-between">
        <div className="flex gap-2 items-center mb-4">
          <div onClick={onCancel} className="md:hidden">
            <LeftArrowIcon />
          </div>
          <Title level={3} className="text-xl md:text-2xl mb-0">
            Карточка задачи
          </Title>
        </div>
        <Paragraph className="text-xs md:text-base">
          Создана {dayjs(createdAt).locale('ru').format('D MMMM YYYY')}
        </Paragraph>
      </div>
    )
  }

  return (
    <div className="flex gap-2 items-center mb-4">
      <div onClick={onCancel} className="md:hidden">
        <LeftArrowIcon />
      </div>
      <Title level={3} className="text-xl md:text-2xl mb-0">
        Новая задача
      </Title>
    </div>
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
      title={<ModalTitle createdAt={task?.createdAt} onCancel={handleCancel} />}
      closeIcon={null}
      classNames={{
        container: 'h-full bg-white rounded-none md:h-auto md:rounded-xl flex flex-col',
        body: 'flex-1',
      }}
      footer={[
        <div className="flex flex-col md:flex-row gap-4" key="footer">
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
