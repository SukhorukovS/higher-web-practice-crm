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
import { LeftArrowIcon } from '@/icons/LeftArrowIcon'
import type { Client } from '@/types/client'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  client?: Client
}

const { Title, Paragraph } = Typography

const CLIENT_FORM_ID = 'client-form'

const ModalTitle = ({ addDate, onCancel }: { addDate?: string; onCancel: () => void }) => {
  if (addDate) {
    return (
      <div className="md:flex justify-between">
        <div className="flex gap-2 items-center mb-4">
          <div onClick={onCancel} className="md:hidden">
            <LeftArrowIcon />
          </div>
          <Title level={3} className="text-xl md:text-2xl mb-0">
            Карточка клиента
          </Title>
        </div>
        <Paragraph className="text-xs md:text-base">
          добавлен {dayjs(addDate).locale('ru').format('D MMMM YYYY')}
        </Paragraph>
      </div>
    )
  }

  return (
    <div className="flex gap-2 items-center mb-4">
      <div onClick={onCancel} className="md:hidden">
        <LeftArrowIcon />
      </div>
      <Title level={3} className="text-xl md:text-2xl mb-0">
        Новый клиент
      </Title>
    </div>
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
      title={<ModalTitle addDate={client?.createdAt} onCancel={handleCancel} />}
      closeIcon={null}
      classNames={{
        container: 'h-full bg-white rounded-none md:h-auto md:rounded-xl flex flex-col',
        body: 'flex-1',
      }}
      footer={[
        <div className="flex flex-col md:flex-row gap-4" key="footer">
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
      <ClientForm
        key={client?.id ?? 'new'}
        client={client}
        onSubmit={onSubmit}
        formId={CLIENT_FORM_ID}
      />
    </Modal>
  )
}
