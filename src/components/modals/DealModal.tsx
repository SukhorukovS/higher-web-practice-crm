import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import clsx from 'clsx'
import type { FC } from 'react'

import { statusMap } from '@/constants/statusMaps'
import type { Deal } from '@/types/deal'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  deal?: Deal
}

type FieldType = {
  title: string
  client: string
  amount: string
  status: string
  description: string
}

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
  const handleOk = () => {
    console.log()
  }

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<ModalTitle addDate={deal?.createdAt} />}
      closeIcon={null}
      styles={{
        container: {
          background: '#fff',
        },
      }}
      footer={[
        <div className="flex gap-4">
          <Button key="submit" type="primary" className="grow font-bold" onClick={handleOk}>
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
        initialValues={deal}
      >
        <div className="grid grid-cols-2 gap-2">
          <Form.Item<FieldType>
            label="Название"
            name="title"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input placeholder="Заключение договора" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Клиент"
            name="client"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-2"
          >
            <Select
              options={[{ label: 'Велимир', value: 'qowjerou203u4' }]}
              placeholder="Выберите клиента"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Сумма"
            name="amount"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input placeholder="50 000 ₽" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Статус"
            name="status"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Select
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
            placeholder="Прогнозируется рост активности."
            style={{ height: 80, resize: 'none' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
