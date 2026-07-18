import { zodResolver } from '@hookform/resolvers/zod'
import { DatePicker, Form, Input, Select } from 'antd'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetDealsQuery } from '@/app/endpoints/deals'
import { statusMap } from '@/constants/statusMaps'
import type { Task } from '@/types/task'

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Введите название'),
  dealId: z.string().optional(),
  dueDate: z.string().min(1, 'Выберите дату'),
  status: z.string().min(1, 'Выберите статус'),
  description: z.string().trim().optional(),
})

export type TaskFormValues = z.infer<typeof taskSchema>

type Props = {
  task?: Task
  onSubmit: (data: TaskFormValues) => void
  formId?: string
}

export const TaskForm: FC<Props> = ({ task, onSubmit, formId }) => {
  const { data: deals } = useGetDealsQuery()
  const isNew = !task
  const dealOptions = [...(deals ?? []).map((d) => ({ label: d.title, value: d.id }))]

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

  return (
    <Form
      id={formId}
      layout="vertical"
      classNames={{
        label: 'text-gray-400 text-xs',
      }}
      onFinish={handleSubmit(onSubmit)}
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
              <Select
                value={field.value || undefined}
                onChange={field.onChange}
                options={dealOptions}
                placeholder="Выберите сделку"
                allowClear
              />
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
  )
}
