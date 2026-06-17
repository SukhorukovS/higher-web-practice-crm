import { Button, Typography } from 'antd'

import user from '/user.png'
import { Section } from '@/components/ui/Section'
import { PhotoIcon } from '@/icons/PhotoIcon'

const { Title } = Typography

export const ProfilePage = () => {
  return (
    <div className="p-5">
      <Title level={1}>Настройка аккаунта</Title>
      <Section className="w-[680px]">
        <div className="flex items-end">
          <img alt="logo" src={user} className="h-[96px] w-[96px] rounded-full" />
          <Button
            type="primary"
            className="rounded-full h-10 w-10 p-0 -translate-x-1/2"
            aria-label="Загрузить фото"
          >
            <PhotoIcon />
          </Button>
        </div>
      </Section>
    </div>
  )
}
