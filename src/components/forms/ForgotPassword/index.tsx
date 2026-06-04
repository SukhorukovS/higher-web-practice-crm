import { Button, Form, Input } from 'antd';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

type FieldType = {
  email?: string;
};

export const ForgotPasswordForm = () => {
  return (
    <Form
      layout="vertical"
    >
      <Title level={1} className="text-2xl mb-6">Восстановление пароля</Title>
      <Paragraph className="mb-6">
        Укажите почту, на&nbsp;которую вы регистрировали аккаунт, и&nbsp;мы&nbsp;отправим вам инструкцию по&nbsp;восстановлению пароля.
      </Paragraph>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        labelCol={{ style: { paddingBottom: '2px' } }}
        className="mb-4"
      >
        <Input />
      </Form.Item>
      <Button type="primary" className="w-full mt-14 h-10">Восстановить</Button>
    </Form>
  )
}
