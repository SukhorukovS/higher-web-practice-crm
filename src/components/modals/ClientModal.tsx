import { Button, Form, Input, Modal, Typography } from 'antd'
import type { FC } from 'react'

import type { Client } from '@/types/client'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  client?: Client
}

type FieldType = {
  name: string
  email?: string
  phone: string
  company: string
  site: string
  comment?: string
}

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
  const handleOk = () => {
    console.log()
  }

  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<ModalTitle addDate={client?.createdAt} />}
      closeIcon={null}
      styles={{
        container: {
          background: '#fff',
        },
      }}
      footer={[
        <div className="flex gap-4">
          <Button key="submit" type="primary" className="grow" onClick={handleOk}>
            {client ? 'Редактировать' : 'Cоздать'}
          </Button>
          <Button key="back" onClick={handleCancel}>
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
        <Form.Item<FieldType>
          label="Имя"
          name="name"
          labelCol={{ style: { paddingBottom: '2px' } }}
          className="mb-4"
        >
          <Input placeholder="Добрыня" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-2">
          <Form.Item<FieldType>
            label="Телефон"
            name="phone"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-2"
          >
            <Input placeholder="+7 915 876-54-32" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Компания"
            name="company"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-2"
          >
            <Input placeholder="Доброград" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Сайт"
            name="site"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input placeholder="www.dobrograd.ru" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            labelCol={{ style: { paddingBottom: '2px' } }}
            className="mb-4"
          >
            <Input placeholder="ivanov@yandex.ru" />
          </Form.Item>
        </div>
        <Form.Item<FieldType>
          label="Комментарий"
          name="email"
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
