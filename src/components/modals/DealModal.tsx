import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import clsx from 'clsx'
import type { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { statusMap } from '@/constants/statusMaps'
import type { Deal } from '@/types/deal'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  deal?: Deal
}

const dealSchema = z.object({
  title: z.string().trim().min(1, 'Введите название'),
  client: z.string().min(1, 'Выберите клиента'),
  amount: z.string().trim().min(1, 'Введите сумму'),
  status: z.string().min(1, 'Выберите статус'),
  description: z.string().trim().optional(),
})

type DealFormValues = z.infer<typeof dealSchema>

const { Title, Paragraph } = Typography

const ModalTitle = ({ addDate }: { addDate?: string }) => {
  if (addDate) {
    return (
      <div className="flex justify-between">
        <Title level={3} className="text-2xl">
          Карточка сделки
        </Title>
        <Paragraph>Создана {addDate}</Paragraph>
      </div>
    )
  }

  return (
    <Title level={3} className="text-2xl">
      Новая сделка
    </Title>
  )
}

export const DealModal: FC<Props> = ({ isOpen, deal, handleCancel }) => {
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
      status: deal?.status ?? '',
      description: deal?.description ?? '',
    },
  })

  const onSubmit = (data: DealFormValues) => {
    console.log(data)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={<ModalTitle addDate={deal?.createdAt} />}
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
            {deal ? 'Редактировать' : 'Cоздать'}
          </Button>
          <Button
            key="back"
            onClick={handleCancel}
            className={clsx(deal && 'text-red-500', 'font-bold')}
          >
            {deal ? 'Удалить сделку' : 'Отменить'}
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
                  options={[{ label: 'Велимир', value: 'qowjerou203u4' }]}
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
                style={{ height: 80, resize: 'none' }}
              />
            </Form.Item>
          )}
        />
      </Form>
    </Modal>
  )
}
