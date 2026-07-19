import 'dayjs/locale/ru'

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
import { LeftArrowIcon } from '@/icons/LeftArrowIcon'
import type { Deal, DealStatus } from '@/types/deal'

type Props = {
  isOpen: boolean
  handleCancel: () => void
  deal?: Deal
}

const { Title, Paragraph } = Typography

const DEAL_FORM_ID = 'deal-form'

const ModalTitle = ({ addDate, onCancel }: { addDate?: string; onCancel: () => void }) => {
  if (addDate) {
    return (
      <div className="md:flex justify-between">
        <div className="flex gap-2 items-center mb-4">
          <div onClick={onCancel} className="md:hidden">
            <LeftArrowIcon />
          </div>
          <Title level={3} className="text-xl md:text-2xl mb-0">
            Карточка сделки
          </Title>
        </div>
        <Paragraph className="text-xs md:text-base">
          Создана {dayjs(addDate).locale('ru').format('D MMMM YYYY')}
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
        Новая сделка
      </Title>
    </div>
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
      title={<ModalTitle addDate={deal?.createdAt} onCancel={handleCancel} />}
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
    >
      <DealForm key={deal?.id ?? 'new'} deal={deal} onSubmit={onSubmit} formId={DEAL_FORM_ID} />
    </Modal>
  )
}
