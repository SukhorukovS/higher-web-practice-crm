import { message } from 'antd'
import type { FC } from 'react'

import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from '@/app/endpoints/clients'
import { useAppSelector } from '@/app/store'
import { ClientForm, type ClientFormValues } from '@/components/forms/ClientForm'
import type { Client } from '@/types/client'

import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  client?: Client
}

const CLIENT_FORM_ID = 'client-form'

export const ClientModal: FC<Props> = ({ isOpen, client, handleCancel }) => {
  const [createClient] = useCreateClientMutation()
  const [updateClient] = useUpdateClientMutation()
  const [deleteClient] = useDeleteClientMutation()
  const user = useAppSelector((state) => state.auth.user)

  const onSubmit = async (data: ClientFormValues) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      company: data.company,
      email: data.email ?? '',
      website: data.site,
      comment: data.comment,
    }

    try {
      if (client) {
        await updateClient({ id: client.id, ...payload }).unwrap()
      } else {
        await createClient({ ...payload, createdBy: user!.id }).unwrap()
      }
      handleCancel()
    } catch {
      message.error('Ошибка при сохранении клиента')
    }
  }

  const onDelete = async () => {
    if (client) {
      try {
        await deleteClient(client.id).unwrap()
        handleCancel()
      } catch {
        message.error('Ошибка при удалении клиента')
      }
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      handleCancel={handleCancel}
      entity={client}
      entityName="Карточка клиента"
      newEntityName="Новый клиент"
      deleteLabel="Удалить клиента"
      datePrefix="добавлен"
      formId={CLIENT_FORM_ID}
      onDelete={onDelete}
      form={
        <ClientForm
          key={client?.id ?? 'new'}
          client={client}
          onSubmit={onSubmit}
          formId={CLIENT_FORM_ID}
        />
      }
    />
  )
}
