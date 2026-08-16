import { Button } from 'antd'

import userAvatar from '/user.png'
import { PhotoIcon } from '@/icons/PhotoIcon'

export const ProfileAvatar = () => (
  <div className="flex justify-center md:justify-start mb-4 items-end">
    <img alt="logo" src={userAvatar} className="h-[96px] w-[96px] rounded-full" />
    <Button
      type="primary"
      className="rounded-full h-10 w-10 p-0 -translate-x-1/2"
      aria-label="Загрузить фото"
    >
      <PhotoIcon />
    </Button>
  </div>
)
