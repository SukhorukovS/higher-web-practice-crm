import { Card, Col, Row, Spin, Typography } from 'antd'
import clsx from 'clsx'

import { useSummaryStats } from '@/hooks/useSummaryStats'

const { Text } = Typography

const headers = ['на сегодня', 'за сегодня', 'за неделю', 'за месяц', 'за квартал']

export const SummaryBoard = () => {
  const { rows, isLoading } = useSummaryStats()

  if (isLoading) {
    return <Spin className="flex justify-center py-8" />
  }

  return (
    <div>
      <Row gutter={16} className="hidden md:flex mb-[2px] mx-5!">
        <Col span={4} />
        {headers.map((header) => (
          <Col key={header} span={4} className="text-left">
            <Text className="text-gray-500">{header}</Text>
          </Col>
        ))}
      </Row>

      {rows.map((row) => (
        <Card key={row.label} className="dashboard-card-row" classNames={{ body: 'p-0' }}>
          <div className="block md:hidden">
            <Text className="text-sm font-bold block mb-2">{row.label}</Text>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <Text className="text-xl font-bold text-blue-500">{row.values[0]}</Text>
                <Text className="text-gray-500 text-xs">{headers[0]}</Text>
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                {row.values.slice(1).map((v, i) => (
                  <div key={i} className="flex items-baseline justify-end gap-[2px]">
                    <Text className="text-gray-500 text-xs">{headers[i + 1]}</Text>
                    <Text className="text-sm font-bold text-green-500">+{v}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Row gutter={16} className="hidden md:flex">
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
