import { Form, Input } from 'antd'
import type { FC } from 'react'

const labelCol = { style: { paddingBottom: '2px' } }

type FieldConfig = {
  label: string
  name: string
  placeholder: string
  defaultValue?: string
  type?: 'text' | 'password'
}

type FormRowProps = {
  fields: FieldConfig[]
}

export const FormRow: FC<FormRowProps> = ({ fields }) => (
  <div className="flex flex-col gap-2 w-full md:flex-row">
    {fields.map(({ label, name, placeholder, defaultValue, type }) => (
      <Form.Item
        key={name}
        label={label}
        name={name}
        labelCol={labelCol}
        className="mb-0 w-full md:w-1/2 [&_.ant-form-item-row]:!flex-col md:[&_.ant-form-item-row]:!flex-row"
      >
        {type === 'password' ? (
          <Input.Password placeholder={placeholder} className="p-0" visibilityToggle={false} />
        ) : (
          <Input placeholder={placeholder} defaultValue={defaultValue} />
        )}
      </Form.Item>
    ))}
  </div>
)
