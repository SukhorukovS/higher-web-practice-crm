import 'dayjs/locale/ru'

import { Button, Modal, Typography } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import type { FC, ReactNode } from 'react'

import { LeftArrowIcon } from '@/icons/LeftArrowIcon'

const { Title, Paragraph } = Typography

type ModalTitleProps = {
  addDate?: string
  onCancel: () => void
  entityName: string
  newEntityName: string
  datePrefix?: string
}

const ModalTitle = ({
  addDate,
  onCancel,
  entityName,
  newEntityName,
  datePrefix = 'добавлен',
}: ModalTitleProps) => {
  if (addDate) {
    return (
      <div className="md:flex justify-between">
        <div className="flex gap-2 items-center mb-4">
          <div onClick={onCancel} className="md:hidden">
            <LeftArrowIcon />
          </div>
          <Title level={3} className="text-xl md:text-2xl mb-0">
            {entityName}
          </Title>
        </div>
        <Paragraph className="text-xs md:text-base">
          {datePrefix} {dayjs(addDate).locale('ru').format('D MMMM YYYY')}
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
        {newEntityName}
      </Title>
    </div>
  )
}

type BaseModalProps = {
  isOpen: boolean
  handleCancel: () => void
  entity?: { id: string; createdAt?: string }
  entityName: string
  newEntityName: string
  deleteLabel: string
  datePrefix?: string
  formId: string
  form: ReactNode
  onDelete: () => void
}

export const BaseModal: FC<BaseModalProps> = ({
  isOpen,
  handleCancel,
  entity,
  entityName,
  newEntityName,
  deleteLabel,
  datePrefix,
  formId,
  form,
  onDelete,
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      title={
        <ModalTitle
          addDate={entity?.createdAt}
          onCancel={handleCancel}
          entityName={entityName}
          newEntityName={newEntityName}
          datePrefix={datePrefix}
        />
      }
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
            form={formId}
          >
            {entity ? 'Редактировать' : 'Создать'}
          </Button>
          <Button
            key="back"
            onClick={entity ? onDelete : handleCancel}
            className={clsx(entity && 'text-red-500', 'font-bold')}
          >
            {entity ? deleteLabel : 'Отменить'}
          </Button>
        </div>,
      ]}
    >
      {form}
    </Modal>
  )
}
