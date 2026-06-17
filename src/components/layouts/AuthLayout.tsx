import { Col, Layout, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

import logo from '/logo.png'

const { Text, Paragraph } = Typography

interface AuthLayoutProps {
  formComponent: React.ReactNode
  secondaryText: string
  linkTo: string
  linkText: string
}

export function AuthLayout({ formComponent, secondaryText, linkTo, linkText }: AuthLayoutProps) {
  return (
    <Layout>
      <main className="welcome-layout">
        <Row gutter={20} align="middle" className="w-[1180px] m-auto">
          <Col span={12}>
            <img alt="logo" src={logo} className="h-10" />
            <Paragraph className="mt-4 mb-10">
              Платформа для&nbsp;управления клиентами, сделками и&nbsp;задачами. Эффективно
              управляйте бизнес-процессами, отслеживайте ключевые показатели и&nbsp;выстраивайте
              продуктивные отношения с&nbsp;клиентами.
            </Paragraph>
            <Text type="secondary" className="block">
              {secondaryText}
            </Text>
            <Link to={linkTo}>{linkText}</Link>
          </Col>
          <Col span={12}>{formComponent}</Col>
        </Row>
      </main>
    </Layout>
  )
}
