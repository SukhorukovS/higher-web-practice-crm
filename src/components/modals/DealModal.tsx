import type { FC } from 'react'

import {
  useCreateDealMutation,
  useDeleteDealMutation,
  useUpdateDealMutation,
} from '@/app/endpoints/deals'
import { DealForm, type DealFormValues } from '@/components/forms/DealForm'
import type { Deal, DealStatus } from '@/types/deal'

import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  deal?: Deal
}

const DEAL_FORM_ID = 'deal-form'

export const DealModal: FC<Props> = ({ isOpen, deal, handleCancel }) => {
  const [createDeal] = useCreateDealMutation()
  const [updateDeal] = useUpdateDealMutation()
  const [deleteDeal] = useDeleteDealMutation()

  const onSubmit = async (data: DealFormValues) => {
    const payload = {
      title: data.title,
      description: data.description,
      clientId: data.client,
      amount: Number(data.amount),
    }

    if (deal) {
      const completedAt =
        data.status === 'completed' && deal.status !== 'completed'
          ? new Date().toISOString()
          : deal.completedAt
      await updateDeal({
        id: deal.id,
        ...payload,
        status: data.status as DealStatus,
        completedAt,
      })
    } else {
      await createDeal(payload)
    }
    handleCancel()
  }

  const onDelete = async () => {
    if (deal) {
      await deleteDeal(deal.id)
      handleCancel()
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      handleCancel={handleCancel}
      entity={deal}
      entityName="Карточка сделки"
      newEntityName="Новая сделка"
      deleteLabel="Удалить сделку"
      datePrefix="Создана"
      formId={DEAL_FORM_ID}
      onDelete={onDelete}
      form={
        <DealForm key={deal?.id ?? 'new'} deal={deal} onSubmit={onSubmit} formId={DEAL_FORM_ID} />
      }
    />
  )
}
