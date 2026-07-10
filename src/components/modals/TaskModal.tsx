import { zodResolver } from '@hookform/resolvers/zod'
import { Button, DatePicker, Form, Input, Modal, Select, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { statusMap } from '@/constants/statusMaps'
import type { Task } from '@/types/task'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  task?: Task
}

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Введите название'),
  dealId: z.string().optional(),
  dueDate: z.string().min(1, 'Выберите дату'),
  status: z.string().min(1, 'Выберите статус'),
  description: z.string().trim().optional(),
})

type TaskFormValues = z.infer<typeof taskSchema>

const { Title, Paragraph } = Typography

const dealOptions = [
  { label: 'Проект «Сварог 2024»', value: 'd1000000-0000-4000-8000-000000000001' },
  { label: 'Проект «Радуга 2025»', value: 'd1000000-0000-4000-8000-000000000002' },
  { label: 'Обновление сайта Светлояр', value: 'd1000000-0000-4000-8000-000000000003' },
  { label: 'Консалтинг по IT-оптимизации', value: 'd1000000-0000-4000-8000-000000000004' },
]

const isNewTask = (task?: Task) => !task

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
  const isNew = isNewTask(task)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? '',
      dealId: task?.dealId ?? undefined,
      dueDate: task?.dueDate ?? '',
      status: isNew ? 'new' : (task?.status ?? ''),
      description: task?.description ?? '',
    },
  })

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
            onClick={handleSubmit(onSubmit)}
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
      <Form
        layout="vertical"
        classNames={{
          label: 'text-gray-400 text-xs',
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Название *"
                validateStatus={errors.title ? 'error' : ''}
                help={errors.title?.message}
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-4"
              >
                <Input {...field} placeholder="Позвонить клиенту" />
              </Form.Item>
            )}
          />
          <Controller
            name="dealId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Сделка"
                validateStatus={errors.dealId ? 'error' : ''}
                help={errors.dealId?.message}
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-4"
              >
                <Select {...field} options={dealOptions} placeholder="Выберите сделку" allowClear />
              </Form.Item>
            )}
          />
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Выполнить до *"
                validateStatus={errors.dueDate ? 'error' : ''}
                help={errors.dueDate?.message}
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-4"
              >
                <DatePicker
                  className="w-full"
                  placeholder="Выберите дату"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(_date, dateString) => {
                    field.onChange(Array.isArray(dateString) ? dateString[0] : dateString)
                  }}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Статус *"
                validateStatus={errors.status ? 'error' : ''}
                help={errors.status?.message}
                labelCol={{ style: { paddingBottom: '2px' } }}
                className="mb-4"
              >
                <Select
                  {...field}
                  disabled={isNew}
                  options={Object.entries(statusMap).map(([value, label]) => ({ value, label }))}
                  placeholder="Выберите статус"
                />
              </Form.Item>
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Описание"
              validateStatus={errors.description ? 'error' : ''}
              help={errors.description?.message}
              labelCol={{ style: { paddingBottom: '2px' } }}
              className="mb-8"
            >
              <Input.TextArea
                {...field}
                placeholder="Обсудить детали сделки"
                style={{ height: 80, resize: 'none' }}
              />
            </Form.Item>
          )}
        />
      </Form>
    </Modal>
  )
}
