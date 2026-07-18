import { DownOutlined } from '@ant-design/icons'
import { Button, Card, Col, Pagination, Row } from 'antd'
import clsx from 'clsx'
import type { Key, ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { useIsMobile } from '@/hooks/useIsMobile'
import { LeftArrowIcon } from '@/icons/LeftArrowIcon'
import { RightArrowIcon } from '@/icons/RightArrowIcon'

export interface Column<T> {
  key: keyof T & string
  title: string
  span: number
}

interface TableProps<T extends { key: Key; className?: string }> {
  columns: Column<T>[]
  data: T[]
  defaultSortKey?: (keyof T & string) | null
  renderCell?: (record: T, key: keyof T & string) => ReactNode
  renderMobileCard?: (record: T) => ReactNode
  pageSize?: number
  onRowClick?: (record: T) => void
}

const itemRender = (
  _page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  element: React.ReactNode,
) => {
  if (type === 'prev') {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <LeftArrowIcon />
      </div>
    )
  }
  if (type === 'next') {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <RightArrowIcon />
      </div>
    )
  }
  return element
}

export const Table = <T extends { key: Key; className?: string }>({
  columns,
  data,
  defaultSortKey = null,
  renderCell,
  pageSize = 10,
  onRowClick,
  renderMobileCard,
}: TableProps<T>) => {
  const isMobile = useIsMobile()
  const [sortField, setSortField] = useState<(keyof T & string) | null>(defaultSortKey)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

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

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  if (pagedData.length === 0) {
    return <div className="text-center py-8 text-gray-500">Нет данных</div>
  }

  if (isMobile && renderMobileCard) {
    return (
      <div>
        {pagedData.map((record) => (
          <Card
            key={record.key}
            className={clsx(
              'dashboard-card-row mb-2 border border-gray-100 shadow-sm rounded-lg',
              onRowClick && 'cursor-pointer',
              record.className,
            )}
            classNames={{ body: 'p-0' }}
            onClick={() => onRowClick?.(record)}
          >
            {renderMobileCard(record)}
          </Card>
        ))}
      </div>
    )
  }

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
              <DownOutlined
                className={clsx(
                  'text-[10px] transition-transform',
                  sortOrder === 'desc' && 'rotate-180',
                  sortField === col.key && 'text-blue-500',
                )}
              />
            </Button>
          </Col>
        ))}
      </Row>
      <div className="mb-3">
        {pagedData.map((record) => (
          <Card
            key={record.key}
            className={clsx(
              'dashboard-card-row mb-2 border border-gray-100 shadow-sm rounded-lg',
              onRowClick && 'cursor-pointer',
              record.className,
            )}
            classNames={{ body: 'p-0' }}
            onClick={() => onRowClick?.(record)}
          >
            <Row gutter={8} align="middle">
              {columns.map((col) => (
                <Col key={col.key} span={col.span} className="flex last:justify-end items-center">
                  {renderCell ? renderCell(record, col.key) : <>{record[col.key]}</>}
                </Col>
              ))}
            </Row>
          </Card>
        ))}
      </div>
      {pageSize && data.length > pageSize && (
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          showSizeChanger={false}
          itemRender={itemRender}
          onChange={setCurrentPage}
        />
      )}
    </div>
  )
}
