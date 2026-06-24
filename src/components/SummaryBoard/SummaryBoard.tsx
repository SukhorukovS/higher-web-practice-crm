import { Card, Col, Row, theme, Typography } from 'antd'
import clsx from 'clsx'

const { Text } = Typography

export const SummaryBoard = () => {
  const { token } = theme.useToken()

  const rows = [
    { label: 'Клиенты', values: [150, 5, 15, 40, 132] },
    { label: 'Активные сделки', values: [25, 3, 8, 20, 62] },
    { label: 'Завершённые сделки', values: [10, 2, 6, 18, 50] },
  ]

  const headers = ['на сегодня', 'за сегодня', 'за неделю', 'за месяц', 'за квартал']

  return (
    <div>
      <Row gutter={16} className="mb-[2px] mx-5!">
        <Col span={4} />
        {headers.map((header) => (
          <Col key={header} span={4} className="text-left">
            <Text className="text-gray-500">{header}</Text>
          </Col>
        ))}
      </Row>

      {rows.map((row) => (
        <Card key={row.label} className="mb-[2px] shadow-md px-6 py-2" classNames={{ body: 'p-0' }}>
          <Row gutter={16}>
            <Col span={4} className="flex items-center">
              <Text className="text-sm font-bold">{row.label}</Text>
            </Col>
            {row.values.map((v, i) => (
              <Col key={i} span={4} className="flex items-center text-left">
                <Text
                  className={clsx(
                    'font-bold',
                    i === 0 ? 'text-2xl text-blue-500' : 'text-xl text-green-500',
                  )}
                >
                  {i === 0 ? v : `+${v}`}
                </Text>
              </Col>
            ))}
          </Row>
        </Card>
      ))}
    </div>
  )
}
