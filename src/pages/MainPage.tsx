import { Col, Layout, Row, Typography } from "antd";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../types/route";
import { LoginForm } from "../components/forms/LoginForm";

const { Text, Paragraph } = Typography;

export function MainPage() {
  return (
    <Layout>
      <main className="welcome-layout">
        <Row gutter={20} className="w-[1180px] m-auto">
          <Col span={12}>
            <img alt="logo" src={logo} className="h-10" />
            <Paragraph className="mt-4 mb-10">
              Платформа для&nbsp;управления клиентами, сделками и&nbsp;задачами.
              Эффективно управляйте бизнес-процессами, отслеживайте ключевые показатели
              и&nbsp;выстраивайте продуктивные отношения с&nbsp;клиентами.
            </Paragraph>
            <Text type="secondary" className="block">
              У&nbsp;вас&nbsp;ещё нет&nbsp;аккаунта?
            </Text>
            <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
          </Col>
          <Col span={12}>
            <LoginForm />
          </Col>
        </Row>
      </main>
    </Layout>
  );
}
