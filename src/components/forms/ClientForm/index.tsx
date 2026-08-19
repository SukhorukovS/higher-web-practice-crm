import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input } from 'antd'
import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Client } from '@/types/client'

const clientSchema = z.object({
  name: z.string().trim().min(1, { message: 'Введите имя' }),
  phone: z
    .string()
    .trim()
    .min(1, { message: 'Введите телефон' })
    .regex(/^\+?[\d\s\-()]+$/, {
      message:
        'Телефон может содержать только цифры, пробелы, дефисы, скобки и опциональный + в начале',
    })
    .refine((val) => val.replace(/\D/g, '').length >= 6, {
      message: 'Телефон должен содержать минимум 6 цифр',
    }),
  company: z.string().trim().min(1, { message: 'Введите компанию' }),
  site: z
    .string()
    .trim()
    .min(1, { message: 'Введите сайт' })
    .regex(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i, {
      message: 'Введите корректный URL (например, example.com или https://example.com)',
    }),
  email: z
    .string()
    .trim()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Некорректный email' })
    .or(z.literal(''))
    .optional(),
  comment: z.string().trim().optional(),
})

export type ClientFormValues = z.infer<typeof clientSchema>

type Props = {
  client?: Client
  onSubmit: (data: ClientFormValues) => void
  formId?: string
}

export const ClientForm: FC<Props> = ({ client, onSubmit, formId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name ?? '',
      phone: client?.phone ?? '',
      company: client?.company ?? '',
      site: client?.website ?? '',
      email: client?.email ?? '',
      comment: client?.comment ?? '',
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
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Имя *"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input {...field} placeholder="Добрыня" />
          </Form.Item>
        )}
      />
      <div className="md:grid grid-cols-2 gap-2">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Телефон *"
              validateStatus={errors.phone ? 'error' : ''}
              help={errors.phone?.message}
              labelCol={{ style: { paddingBottom: '2px' } }}
              className="mb-2"
            >
              <Input {...field} placeholder="+7 915 876-54-32" />
            </Form.Item>
          )}
        />
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Компания *"
              validateStatus={errors.company ? 'error' : ''}
              help={errors.company?.message}
              labelCol={{ style: { paddingBottom: '2px' } }}
              className="mb-2"
            >
              <Input {...field} placeholder="Доброград" />
            </Form.Item>
          )}
        />
        <Controller
          name="site"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Сайт *"
              validateStatus={errors.site ? 'error' : ''}
              help={errors.site?.message}
              labelCol={{ style: { paddingBottom: '2px' } }}
              className="mb-4"
            >
              <Input {...field} placeholder="www.dobrograd.ru" />
            </Form.Item>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Email"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
              labelCol={{ style: { paddingBottom: '2px' } }}
              className="mb-4"
            >
              <Input {...field} placeholder="ivanov@yandex.ru" />
            </Form.Item>
          )}
        />
      </div>
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <Form.Item
            label="Комментарий"
            validateStatus={errors.comment ? 'error' : ''}
            help={errors.comment?.message}
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-8"
          >
            <Input.TextArea
              {...field}
              placeholder="Прогнозируется рост активности."
              style={{ height: 80, resize: 'none' }}
            />
          </Form.Item>
        )}
      />
    </Form>
  )
}
