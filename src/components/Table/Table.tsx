import { DownOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import clsx from 'clsx'
import type { Key, ReactNode } from 'react'
import { useMemo, useState } from 'react'

interface Column<T> {
  key: keyof T & string
  title: string
  span: number
}

interface TableProps<T extends { key: Key; className?: string }> {
  columns: Column<T>[]
  data: T[]
  defaultSortKey?: (keyof T & string) | null
  renderCell?: (record: T, key: keyof T & string) => ReactNode
}

export const Table = <T extends { key: Key; className?: string }>({
  columns,
  data,
  defaultSortKey = null,
  renderCell,
}: TableProps<T>) => {
  const [sortField, setSortField] = useState<(keyof T & string) | null>(defaultSortKey)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)

  const handleSort = (key: keyof T & string) => {
    if (sortField === key) {
      setSortOrder((prev) => {
        if (prev === 'asc') return 'desc'
        if (prev === 'desc') return null
        return 'asc'
      })
    } else {
      setSortField(key)
      setSortOrder('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortField || !sortOrder) return data

    return [...data].sort((a, b) => {
      let valA: number | string = a[sortField] as number | string
      let valB: number | string = b[sortField] as number | string

      if (typeof valA === 'string' && valA.includes('₽')) {
        valA = parseFloat(valA.replace(/[ ₽]/g, ''))
        valB = parseFloat(String(valB).replace(/[ ₽]/g, ''))
      }

      const compare = sortOrder === 'asc' ? -1 : 1
      return valA < valB ? compare : valA > valB ? -compare : 0
    })
  }, [data, sortField, sortOrder])

  return (
    <div>
      <Row gutter={8} className="mb-1 mx-6!">
        {columns.map((col) => (
          <Col key={col.key} span={col.span} className="flex last:justify-end">
            <Button
              type="text"
              size="small"
              className="!p-0 !h-auto flex items-center gap-1 text-xs text-gray-500 tracking-wide font-medium"
              onClick={() => handleSort(col.key)}
            >
              {col.title}
              {
                <DownOutlined
                  className={clsx(
                    'text-[10px] transition-transform',
                    {
                      'rotate-180': sortOrder === 'desc',
                    },
                    sortField === col.key && 'text-blue-500',
                  )}
                />
              }
            </Button>
          </Col>
        ))}
      </Row>

      {sortedData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Нет данных</div>
      ) : (
        sortedData.map((record) => (
          <Card
            key={record.key}
            className={clsx(
              'dashboard-card-row mb-2 border border-gray-100 shadow-sm rounded-lg',
              record.className,
            )}
            classNames={{ body: 'p-0' }}
          >
            <Row gutter={8} align="middle">
              {columns.map((col) => (
                <Col key={col.key} span={col.span} className="flex last:justify-end items-center">
                  {renderCell ? renderCell(record, col.key) : <>{record[col.key]}</>}
                </Col>
              ))}
            </Row>
          </Card>
        ))
      )}
    </div>
  )
}
