import type { FC, PropsWithChildren } from 'react'

export const Section: FC<PropsWithChildren & { className: string }> = ({ children, className }) => {
  return (
    <section className={`bg-white rounded-xl py-6 px-4 md:py-8 md:px-6 ${className}`}>
      {children}
    </section>
  )
}
