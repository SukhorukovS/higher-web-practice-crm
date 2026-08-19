import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Select } from 'antd'
import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetClientsQuery } from '@/app/endpoints/clients'
import { statusMap } from '@/constants/statusMaps'
import type { Deal } from '@/types/deal'

const dealSchema = z.object({
  title: z.string().trim().min(1, 'Введите название'),
  client: z.string().min(1, 'Выберите клиента'),
  amount: z
    .string()
    .trim()
    .min(1, 'Введите сумму')
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, 'Введите корректную сумму'),
  status: z.string().min(1, 'Выберите статус'),
  description: z.string().trim().optional(),
})

export type DealFormValues = z.infer<typeof dealSchema>

type Props = {
  deal?: Deal
  onSubmit: (data: DealFormValues) => void
  formId?: string
}

export const DealForm: FC<Props> = ({ deal, onSubmit, formId }) => {
  const { data: clients } = useGetClientsQuery()
  const isNew = !deal

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: deal?.title ?? '',
      client: deal?.clientId ?? '',
      amount: deal?.amount?.toString() ?? '',
      status: isNew ? 'new' : (deal?.status ?? ''),
      description: deal?.description ?? '',
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
      <div className="md:grid grid-cols-2 gap-2">
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
              <Input {...field} placeholder="Заключение договора" />
            </Form.Item>
          )}
        />
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Клиент *"
              validateStatus={errors.client ? 'error' : ''}
              help={errors.client?.message}
              labelCol={{ style: { paddingBottom: '2px' } }}
              className="mb-2"
            >
              <Select
                {...field}
                options={(clients ?? [])
                  .filter((c) => !c.deleted)
                  .map((c) => ({ label: c.name, value: c.id }))}
                placeholder="Выберите клиента"
              />
            </Form.Item>
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Сумма *"
              validateStatus={errors.amount ? 'error' : ''}
              help={errors.amount?.message}
              labelCol={{ style: { paddingBottom: '2px' } }}
              className="mb-4"
            >
              <Input {...field} placeholder="50 000 ₽" />
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
              placeholder="Прогнозируется рост активности."
              className="h-20 resize-none"
            />
          </Form.Item>
        )}
      />
    </Form>
  )
}
