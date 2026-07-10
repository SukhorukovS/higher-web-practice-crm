import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input, Modal, Typography } from 'antd'
import clsx from 'clsx'
import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Client } from '@/types/client'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  client?: Client
}

const clientSchema = z.object({
  name: z.string().trim().min(1, 'Введите имя'),
  phone: z.string().trim().min(1, 'Введите телефон'),
  company: z.string().trim().min(1, 'Введите компанию'),
  site: z.string().trim().min(1, 'Введите сайт'),
  email: z.string().trim().email('Некорректный email').or(z.literal('')).optional(),
  comment: z.string().trim().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

const { Title, Paragraph } = Typography

const ModalTitle = ({ addDate }: { addDate?: string }) => {
  if (addDate) {
    return (
      <div className="flex justify-between">
        <Title level={3} className="text-2xl">
          Карточка клиента
        </Title>
        <Paragraph>добавлен {addDate}</Paragraph>
      </div>
    )
  }

  return (
    <Title level={3} className="text-2xl">
      Новый клиент
    </Title>
  )
}

export const ClientModal: FC<Props> = ({ isOpen, client, handleCancel }) => {
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

  const onSubmit = (data: ClientFormValues) => {
    console.log(data)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={<ModalTitle addDate={client?.createdAt} />}
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
            {client ? 'Редактировать' : 'Cоздать'}
          </Button>
          <Button
            key="back"
            onClick={handleCancel}
            className={clsx(client && 'text-red-500', 'font-bold')}
          >
            {client ? 'Удалить клиента' : 'Отменить'}
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
        <div className="grid grid-cols-2 gap-2">
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
    </Modal>
  )
}
