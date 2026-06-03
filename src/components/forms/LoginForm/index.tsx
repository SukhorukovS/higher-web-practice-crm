import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../types/route';
import { Typography } from 'antd';

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const LoginForm = () => {
  return (
    <Form
      layout="vertical"
    >
      <Title level={1} className="text-2xl mb-6">Вход в аккаунт</Title>
      <Form.Item<FieldType>
        label="Email или логин"
        name="username"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-4"
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-1"
      >
        <Input.Password />
      </Form.Item>
      <div className="text-right">
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-gray-500! text-base">Забыли пароль?</Link>
      </div>
      <Button type="primary" className="w-full mt-14 h-10">Войти</Button>
    </Form>
  )
}
