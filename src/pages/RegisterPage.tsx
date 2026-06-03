import { Col, Layout, Row, Typography } from "antd";
import logo from "/logo.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../types/route";
import { RegisterForm } from "../components/forms/RegisterForm";

const { Text, Paragraph } = Typography;

export function RegisterPage() {
  return (
    <Layout>
      <main className="welcome-layout">
        <Row gutter={20} align="middle" className="w-[1180px] m-auto">
          <Col span={12}>
            <img alt="logo" src={logo} className="h-10" />
            <Paragraph className="mt-4 mb-10">
              Платформа для&nbsp;управления клиентами, сделками и&nbsp;задачами.
              Эффективно управляйте бизнес-процессами, отслеживайте ключевые показатели
              и&nbsp;выстраивайте продуктивные отношения с&nbsp;клиентами.
            </Paragraph>
            <Text type="secondary" className="block">
              Уже зарегистрированы?
            </Text>
            <Link to={ROUTES.MAIN}>Войти в аккаунт</Link>
          </Col>
          <Col span={12}>
            <RegisterForm />
          </Col>
        </Row>
      </main>
    </Layout>
  );
}
