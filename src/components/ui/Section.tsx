import type { FC, PropsWithChildren } from 'react'

export const Section: FC<PropsWithChildren & { className: string }> = ({ children, className }) => {
  return <section className={`bg-white rounded-xl py-8 px-6 ${className}`}>{children}</section>
}
