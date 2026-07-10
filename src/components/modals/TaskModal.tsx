import { Button, Modal, Typography } from 'antd'
import clsx from 'clsx'
import type { FC } from 'react'

import { TaskForm, type TaskFormValues } from '@/components/forms/TaskForm'
import type { Task } from '@/types/task'

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
        <Paragraph>Создана {createdAt}</Paragraph>
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
  const onSubmit = (data: TaskFormValues) => {
    console.log(data)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={<ModalTitle createdAt={task?.createdAt} />}
      closeIcon={null}
      styles={{
        container: {
          background: '#fff',
        },
      }}
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
            onClick={handleCancel}
            className={clsx(task && 'text-red-500', 'font-bold')}
          >
            {task ? 'Удалить задачу' : 'Отменить'}
          </Button>
        </div>,
      ]}
    >
      <TaskForm task={task} onSubmit={onSubmit} formId={TASK_FORM_ID} />
    </Modal>
  )
}
