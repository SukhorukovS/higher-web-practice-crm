import { Button, DatePicker, Form, Input, Modal, Select, Typography } from 'antd'
import clsx from 'clsx'
import type { FC } from 'react'

import { statusMap } from '@/constants/statusMaps'
import type { Task } from '@/types/task'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  task?: Task
}

type FieldType = {
  title: string
  dealId?: string
  dueDate: string
  status: string
  description?: string
}

const { Title, Paragraph } = Typography

const dealOptions = [
  { label: 'Проект «Сварог 2024»', value: 'd1000000-0000-4000-8000-000000000001' },
  { label: 'Проект «Радуга 2025»', value: 'd1000000-0000-4000-8000-000000000002' },
  { label: 'Обновление сайта Светлояр', value: 'd1000000-0000-4000-8000-000000000003' },
  { label: 'Консалтинг по IT-оптимизации', value: 'd1000000-0000-4000-8000-000000000004' },
]

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
  const handleOk = () => {
    console.log()
  }

  const isNewTask = !task

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<ModalTitle createdAt={task?.createdAt} />}
      closeIcon={null}
      styles={{
        container: {
          background: '#fff',
        },
      }}
      footer={[
        <div className="flex gap-4">
          <Button key="submit" type="primary" className="grow font-bold" onClick={handleOk}>
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
      <Form
        layout="vertical"
        classNames={{
          label: 'text-gray-400 text-xs',
        }}
        initialValues={{
          ...task,
          dueDate: task?.dueDate ? task.dueDate : undefined,
          status: isNewTask ? 'new' : task?.status,
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <Form.Item<FieldType>
            label="Название"
            name="title"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input placeholder="Позвонить клиенту" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Сделка"
            name="dealId"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Select options={dealOptions} placeholder="Выберите сделку" allowClear />
          </Form.Item>
          <Form.Item<FieldType>
            label="Выполнить до"
            name="dueDate"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <DatePicker className="w-full" placeholder="Выберите дату" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Статус"
            name="status"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Select
              disabled={isNewTask}
              options={Object.entries(statusMap).map(([value, label]) => ({ value, label }))}
              placeholder="Выберите статус"
            />
          </Form.Item>
        </div>
        <Form.Item<FieldType>
          label="Описание"
          name="description"
          labelCol={{ style: { paddingBottom: '2px' } }}
          className="mb-8"
        >
          <Input.TextArea
            placeholder="Обсудить детали сделки"
            style={{ height: 80, resize: 'none' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
