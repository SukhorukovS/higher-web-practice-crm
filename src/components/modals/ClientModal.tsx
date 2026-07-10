import { Button, Modal, Typography } from 'antd'
import clsx from 'clsx'
import type { FC } from 'react'

import { ClientForm, type ClientFormValues } from '@/components/forms/ClientForm'
import type { Client } from '@/types/client'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  client?: Client
}

const { Title, Paragraph } = Typography

const CLIENT_FORM_ID = 'client-form'

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
            htmlType="submit"
            form={CLIENT_FORM_ID}
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
      <ClientForm client={client} onSubmit={onSubmit} formId={CLIENT_FORM_ID} />
    </Modal>
  )
}
