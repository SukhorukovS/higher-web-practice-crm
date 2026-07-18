import { Button, Modal, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { FC } from 'react'

import {
  useCreateDealMutation,
  useDeleteDealMutation,
  useUpdateDealMutation,
} from '@/app/endpoints/deals'
import { DealForm, type DealFormValues } from '@/components/forms/DealForm'
import type { Deal, DealStatus } from '@/types/deal'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  deal?: Deal
}

const { Title, Paragraph } = Typography

const DEAL_FORM_ID = 'deal-form'

const ModalTitle = ({ addDate }: { addDate?: string }) => {
  if (addDate) {
    return (
      <div className="flex justify-between">
        <Title level={3} className="text-2xl">
          Карточка сделки
        </Title>
        <Paragraph>Создана {dayjs(addDate).locale('ru').format('D MMMM YYYY')}</Paragraph>
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
      await updateDeal({ id: deal.id, ...payload, status: data.status as DealStatus })
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
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={<ModalTitle addDate={deal?.createdAt} />}
      closeIcon={null}
      footer={[
        <div className="flex gap-4" key="footer">
          <Button
            key="submit"
            type="primary"
            className="grow font-bold"
            htmlType="submit"
            form={DEAL_FORM_ID}
          >
            {deal ? 'Редактировать' : 'Cоздать'}
          </Button>
          <Button
            key="back"
            onClick={deal ? onDelete : handleCancel}
            className={clsx(deal && 'text-red-500', 'font-bold')}
          >
            {deal ? 'Удалить сделку' : 'Отменить'}
          </Button>
        </div>,
      ]}
      classNames={{ container: 'h-full bg-white rounded-none md:h-auto md:rounded-xl' }}
    >
      <DealForm key={deal?.id ?? 'new'} deal={deal} onSubmit={onSubmit} formId={DEAL_FORM_ID} />
    </Modal>
  )
}
