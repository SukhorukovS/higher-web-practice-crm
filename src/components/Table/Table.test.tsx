// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Key } from 'react'

import { Table, type Column } from './Table'

interface Row {
  key: Key
  className?: string
  name: string
  amount: string
}

vi.mock('@/hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(() => false),
}))

const columns: Column<Row>[] = [
  { key: 'name', title: 'Имя', span: 12 },
  { key: 'amount', title: 'Сумма', span: 12 },
]

function makeRows(count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({
    key: `r${i}`,
    name: `Имя ${i}`,
    amount: `${(i + 1) * 100} ₽`,
  }))
}

function renderTable(props: Partial<React.ComponentProps<typeof Table<Row>>> = {}) {
  return render(
    <Table<Row>
      columns={columns}
      data={makeRows(3)}
      {...props}
    />,
  )
}

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

afterEach(() => {
  cleanup()
})

describe('Table', () => {
  describe('empty & loading states', () => {
    it('shows "Нет данных" when data is empty', () => {
      renderTable({ data: [] })
      expect(screen.getByText('Нет данных')).toBeInTheDocument()
    })

    it('shows spinner when isLoading is true', () => {
      renderTable({ isLoading: true, data: [] })
      expect(document.querySelector('.ant-spin')).toBeInTheDocument()
    })

    it('does not render table content when loading', () => {
      renderTable({ isLoading: true })
      expect(screen.queryByText('Имя')).not.toBeInTheDocument()
    })
  })

  describe('rendering', () => {
    it('renders column headers', () => {
      renderTable()
      expect(screen.getByText('Имя')).toBeInTheDocument()
      expect(screen.getByText('Сумма')).toBeInTheDocument()
    })

    it('renders all data rows', () => {
      renderTable()
      expect(screen.getByText('Имя 0')).toBeInTheDocument()
      expect(screen.getByText('Имя 1')).toBeInTheDocument()
      expect(screen.getByText('Имя 2')).toBeInTheDocument()
    })

    it('uses renderCell when provided', () => {
      const renderCell = vi.fn((record: Row, key: keyof Row & string) => (
        <span data-testid={`cell-${record.key}-${key}`}>custom-{String(record[key as keyof Row])}</span>
      ))
      renderTable({ renderCell })

      expect(renderCell).toHaveBeenCalled()
      expect(screen.getByTestId('cell-r0-name')).toHaveTextContent('custom-Имя 0')
    })

    it('falls back to raw value when renderCell is not provided', () => {
      renderTable()
      expect(screen.getByText('100 ₽')).toBeInTheDocument()
    })
  })

  describe('sorting', () => {
    it('sorts ascending on first click', async () => {
      const user = userEvent.setup()
      renderTable()

      await user.click(screen.getByText('Имя'))

      const cards = document.querySelectorAll('.dashboard-card-row')
      expect(cards.length).toBe(3)
    })

    it('cycles sort: asc → desc → none', async () => {
      const user = userEvent.setup()
      renderTable()

      const nameHeader = screen.getByText('Имя')

      await user.click(nameHeader)
      let cards = document.querySelectorAll('.dashboard-card-row')
      const firstAsc = within(cards[0] as HTMLElement).getByText('Имя 0')
      expect(firstAsc).toBeInTheDocument()

      await user.click(nameHeader)
      cards = document.querySelectorAll('.dashboard-card-row')
      const firstDesc = within(cards[0] as HTMLElement).getByText('Имя 2')
      expect(firstDesc).toBeInTheDocument()

      await user.click(nameHeader)
      cards = document.querySelectorAll('.dashboard-card-row')
      const firstNone = within(cards[0] as HTMLElement).getByText('Имя 0')
      expect(firstNone).toBeInTheDocument()
    })

    it('sorts currency values correctly', async () => {
      const user = userEvent.setup()
      const data: Row[] = [
        { key: 'a', name: 'A', amount: '300 ₽' },
        { key: 'b', name: 'B', amount: '100 ₽' },
        { key: 'c', name: 'C', amount: '200 ₽' },
      ]
      renderTable({ data })

      await user.click(screen.getByText('Сумма'))

      const cards = document.querySelectorAll('.dashboard-card-row')
      expect(within(cards[0] as HTMLElement).getByText('100 ₽')).toBeInTheDocument()
      expect(within(cards[1] as HTMLElement).getByText('200 ₽')).toBeInTheDocument()
      expect(within(cards[2] as HTMLElement).getByText('300 ₽')).toBeInTheDocument()
    })

    it('resets sort when switching to a different column', async () => {
      const user = userEvent.setup()
      renderTable()

      await user.click(screen.getByText('Имя'))
      await user.click(screen.getByText('Имя'))

      await user.click(screen.getByText('Сумма'))

      const cards = document.querySelectorAll('.dashboard-card-row')
      expect(within(cards[0] as HTMLElement).getByText('100 ₽')).toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('does not show pagination when data fits in one page', () => {
      renderTable({ data: makeRows(5), pageSize: 10 })
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    })

    it('shows pagination when data exceeds pageSize', () => {
      renderTable({ data: makeRows(15), pageSize: 10 })
      expect(document.querySelector('.ant-pagination')).toBeInTheDocument()
    })

    it('displays only pageSize rows per page', () => {
      renderTable({ data: makeRows(15), pageSize: 5 })
      const cards = document.querySelectorAll('.dashboard-card-row')
      expect(cards.length).toBe(5)
    })

    it('navigates to next page on pagination click', async () => {
      const user = userEvent.setup()
      renderTable({ data: makeRows(15), pageSize: 5 })

      expect(screen.getByText('Имя 0')).toBeInTheDocument()
      expect(screen.queryByText('Имя 5')).not.toBeInTheDocument()

      const nextBtn = document.querySelector('.ant-pagination-next')!
      await user.click(nextBtn)

      expect(screen.getByText('Имя 5')).toBeInTheDocument()
      expect(screen.queryByText('Имя 0')).not.toBeInTheDocument()
    })
  })

  describe('row click', () => {
    it('calls onRowClick when a row is clicked', async () => {
      const user = userEvent.setup()
      const onRowClick = vi.fn()
      renderTable({ onRowClick })

      const cards = document.querySelectorAll('.dashboard-card-row')
      await user.click(cards[1])

      expect(onRowClick).toHaveBeenCalledWith(
        expect.objectContaining({ key: 'r1' }),
      )
    })

    it('adds cursor-pointer class when onRowClick is provided', () => {
      const onRowClick = vi.fn()
      renderTable({ onRowClick })

      const cards = document.querySelectorAll('.dashboard-card-row')
      expect(cards[0].className).toContain('cursor-pointer')
    })

    it('does not add cursor-pointer class when onRowClick is not provided', () => {
      renderTable()

      const cards = document.querySelectorAll('.dashboard-card-row')
      expect(cards[0].className).not.toContain('cursor-pointer')
    })
  })

  describe('mobile view', () => {
    it('renders mobile cards when isMobile and renderMobileCard are set', async () => {
      const { useIsMobile } = await import('@/hooks/useIsMobile')
      vi.mocked(useIsMobile).mockReturnValue(true)

      const renderMobileCard = vi.fn((record: Row) => (
        <div data-testid={`mobile-${record.key}`}>{record.name}</div>
      ))

      renderTable({ renderMobileCard })

      expect(screen.getByTestId('mobile-r0')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-r1')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-r2')).toBeInTheDocument()
      expect(renderMobileCard).toHaveBeenCalledTimes(3)
    })

    it('does not render column headers in mobile view', async () => {
      const { useIsMobile } = await import('@/hooks/useIsMobile')
      vi.mocked(useIsMobile).mockReturnValue(true)

      const renderMobileCard = (record: Row) => <div>{record.name}</div>
      renderTable({ renderMobileCard })

      expect(screen.queryByText('Имя', { selector: 'button' })).not.toBeInTheDocument()
    })

    it('falls back to desktop view when renderMobileCard is not provided on mobile', async () => {
      const { useIsMobile } = await import('@/hooks/useIsMobile')
      vi.mocked(useIsMobile).mockReturnValue(true)

      renderTable()

      expect(screen.getByText('Имя')).toBeInTheDocument()
    })
  })

  describe('record className', () => {
    it('applies record className to the card', () => {
      const data: Row[] = [
        { key: 'r0', name: 'A', amount: '100 ₽', className: 'highlight-row' },
      ]
      renderTable({ data })

      const card = document.querySelector('.dashboard-card-row')
      expect(card?.className).toContain('highlight-row')
    })
  })

  describe('defaultSortKey', () => {
    it('applies initial sort by defaultSortKey', () => {
      const data: Row[] = [
        { key: 'a', name: 'C', amount: '300 ₽' },
        { key: 'b', name: 'A', amount: '100 ₽' },
        { key: 'c', name: 'B', amount: '200 ₽' },
      ]
      renderTable({ data, defaultSortKey: 'name' })

      const cards = document.querySelectorAll('.dashboard-card-row')
      expect(within(cards[0] as HTMLElement).getByText('C')).toBeInTheDocument()
    })
  })
})
