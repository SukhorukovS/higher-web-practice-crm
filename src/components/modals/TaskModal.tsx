import { message } from 'antd'
import type { FC } from 'react'

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '@/app/endpoints/tasks'
import { useAppSelector } from '@/app/store'
import { TaskForm, type TaskFormValues } from '@/components/forms/TaskForm'
import type { Task, TaskStatus } from '@/types/task'

import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  task?: Task
}

const TASK_FORM_ID = 'task-form'

export const TaskModal: FC<Props> = ({ isOpen, task, handleCancel }) => {
  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const user = useAppSelector((state) => state.auth.user)

  const onSubmit = async (data: TaskFormValues) => {
    const payload = {
      title: data.title,
      description: data.description,
      dealId: data.dealId,
      dueDate: data.dueDate,
      status: data.status as TaskStatus,
    }

    try {
      if (task) {
        await updateTask({ id: task.id, ...payload }).unwrap()
      } else {
        await createTask({ ...payload, assigneeId: user!.id, createdBy: user!.id }).unwrap()
      }
      handleCancel()
    } catch {
      message.error('Ошибка при сохранении задачи')
    }
  }

  const onDelete = async () => {
    if (task) {
      try {
        await deleteTask(task.id).unwrap()
        handleCancel()
      } catch {
        message.error('Ошибка при удалении задачи')
      }
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      handleCancel={handleCancel}
      entity={task}
      entityName="Карточка задачи"
      newEntityName="Новая задача"
      deleteLabel="Удалить задачу"
      datePrefix="Создана"
      formId={TASK_FORM_ID}
      onDelete={onDelete}
      form={
        <TaskForm key={task?.id ?? 'new'} task={task} onSubmit={onSubmit} formId={TASK_FORM_ID} />
      }
    />
  )
}
