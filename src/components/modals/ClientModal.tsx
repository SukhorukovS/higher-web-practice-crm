import 'dayjs/locale/ru'

import { Button, Modal, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { FC } from 'react'

import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from '@/app/endpoints/clients'
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
        <Paragraph>добавлен {dayjs(addDate).locale('ru').format('D MMMM YYYY')}</Paragraph>
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
  const [createClient] = useCreateClientMutation()
  const [updateClient] = useUpdateClientMutation()
  const [deleteClient] = useDeleteClientMutation()

  const onSubmit = async (data: ClientFormValues) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      company: data.company,
      email: data.email ?? '',
      website: data.site,
      comment: data.comment,
    }

    if (client) {
      await updateClient({ id: client.id, ...payload })
    } else {
      await createClient(payload)
    }
    handleCancel()
  }

  const onDelete = async () => {
    if (client) {
      await deleteClient(client.id)
      handleCancel()
    }
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
            onClick={client ? onDelete : handleCancel}
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
