import { Button, Modal, Typography } from 'antd'
import clsx from 'clsx'
import type { FC } from 'react'

import { DealForm, type DealFormValues } from '@/components/forms/DealForm'
import type { Deal } from '@/types/deal'

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
            htmlType="submit"
            form={DEAL_FORM_ID}
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
      <DealForm deal={deal} onSubmit={onSubmit} formId={DEAL_FORM_ID} />
    </Modal>
  )
}
