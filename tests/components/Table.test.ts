import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Table, type TableColumn, type TableProps } from '@/components/ui/Table'
import { testAttrs } from '../utils/testAttrs'

type Person = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

const columns: TableColumn<Person>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
]

const derivedColumns: TableColumn<Person>[] = [
  { accessorKey: 'id', header: 'Identifier' },
  {
    accessorFn: (person) => `${person.name} (${person.status})`,
    id: 'summary',
    header: 'Summary',
  },
]

const groupedColumns: TableColumn<Person>[] = [
  {
    id: 'profile',
    header: 'Profile',
    columns: [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
    ],
  },
  { accessorKey: 'status', header: 'Status' },
]

const data: Person[] = [
  { id: '1', name: 'Ada Lovelace', status: 'active' },
  { id: '2', name: 'Grace Hopper', status: 'inactive' },
]

const repeatedStatusData: Person[] = [
  { id: '1', name: 'Ada Lovelace', status: 'active' },
  { id: '2', name: 'Alan Turing', status: 'active' },
  { id: '3', name: 'Grace Hopper', status: 'inactive' },
]

const rowSpanningColumns: TableColumn<Person>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status', spanRows: true },
]

const predicateRowSpanningColumns: TableColumn<Person>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'Name',
    spanRows: ({ anchorValue, value }) => String(anchorValue).charAt(0) === String(value).charAt(0),
  },
  { accessorKey: 'status', header: 'Status' },
]

const columnSpanningColumns: TableColumn<Person>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    spanColumns: ({ row }) => (row.original.status === 'inactive' ? Infinity : 1),
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
]

function mountTable(options: MountingOptions<TableProps<Person>> = {}) {
  return mount(Table, {
    ...options,
    props: { columns, ...options.props },
  })
}

describe('Table', () => {
  describe('props', () => {
    describe('columns', () => {
      it.each([
        { input: columns, expectedHeaders: ['ID', 'Name', 'Status'] },
        { input: derivedColumns, expectedHeaders: ['Identifier', 'Summary'] },
      ])('renders headers for columns=$expectedHeaders', ({ input, expectedHeaders }) => {
        const table = mountTable({ props: { columns: input, data } })

        expect(table.findAll('thead th').map((header) => header.text())).toEqual(expectedHeaders)
      })

      it('renders values from an accessorFn column', () => {
        const table = mountTable({ props: { columns: derivedColumns, data } })

        expect(table.findAll('tbody tr').map((row) => row.text())).toEqual([
          '1Ada Lovelace (active)',
          '2Grace Hopper (inactive)',
        ])
      })

      it('renders nested columns as grouped header rows', () => {
        const table = mountTable({ props: { columns: groupedColumns, data } })
        const headerRows = table.findAll('thead tr')

        expect(headerRows).toHaveLength(2)
        expect(headerRows[0].findAll('th').map((header) => header.text())).toEqual([
          'Profile',
          'Status',
        ])
        expect(headerRows[0].findAll('th').map((header) => header.attributes('colspan'))).toEqual([
          '2',
          '1',
        ])
        expect(headerRows[0].findAll('th').map((header) => header.attributes('rowspan'))).toEqual([
          '1',
          '2',
        ])
        expect(headerRows[1].findAll('th').map((header) => header.text())).toEqual(['ID', 'Name'])
        expect(headerRows[1].findAll('th').map((header) => header.attributes('colspan'))).toEqual([
          '1',
          '1',
        ])
      })
    })

    describe('data', () => {
      it.each([
        { input: data, expectedRows: 2 },
        { input: [data[0]], expectedRows: 1 },
        { input: [], expectedRows: 1 },
        { input: undefined, expectedRows: 1 },
      ])('renders data=$input with $expectedRows body row(s)', ({ input, expectedRows }) => {
        const table = mountTable({ props: { data: input } })

        expect(table.findAll('tbody tr')).toHaveLength(expectedRows)
      })

      it('renders every cell value in the corresponding row', () => {
        const table = mountTable({ props: { data } })

        expect(table.findAll('tbody tr')[0].text()).toBe('1Ada Lovelaceactive')
        expect(table.findAll('tbody tr')[1].text()).toBe('2Grace Hopperinactive')
      })
    })

    describe('enableCellSpanning', () => {
      it.each([undefined, false])(
        'does not merge cells when enableCellSpanning=%s',
        (enableCellSpanning) => {
          const table = mountTable({
            props: {
              columns: rowSpanningColumns,
              data: repeatedStatusData,
              enableCellSpanning,
            },
          })

          expect(table.findAll('tbody tr').map((row) => row.findAll('td').length)).toEqual([
            3, 3, 3,
          ])
          expect(table.findAll('tbody tr')[0].findAll('td')[2].attributes('rowspan')).toBe('1')
          expect(table.findAll('tbody tr')[1].text()).toContain('active')
        },
      )

      it('merges adjacent equal values vertically and skips covered cells', () => {
        const table = mountTable({
          props: {
            columns: rowSpanningColumns,
            data: repeatedStatusData,
            enableCellSpanning: true,
          },
        })
        const rows = table.findAll('tbody tr')

        expect(rows.map((row) => row.findAll('td').length)).toEqual([3, 2, 3])
        expect(rows[0].findAll('td')[2].text()).toBe('active')
        expect(rows[0].findAll('td')[2].attributes('rowspan')).toBe('2')
        expect(rows[1].text()).toBe('2Alan Turing')
        expect(rows[2].findAll('td')[2].attributes('rowspan')).toBe('1')
      })

      it('supports a spanRows predicate for custom vertical merging', () => {
        const table = mountTable({
          props: {
            columns: predicateRowSpanningColumns,
            data: repeatedStatusData,
            enableCellSpanning: true,
          },
        })
        const rows = table.findAll('tbody tr')

        expect(rows.map((row) => row.findAll('td').length)).toEqual([3, 2, 3])
        expect(rows[0].findAll('td')[1].text()).toBe('Ada Lovelace')
        expect(rows[0].findAll('td')[1].attributes('rowspan')).toBe('2')
        expect(rows[1].text()).toBe('2active')
      })

      it('merges cells horizontally with spanColumns and skips covered cells', () => {
        const table = mountTable({
          props: {
            columns: columnSpanningColumns,
            data,
            enableCellSpanning: true,
          },
        })
        const rows = table.findAll('tbody tr')

        expect(rows.map((row) => row.findAll('td').length)).toEqual([3, 1])
        expect(rows[1].get('td').text()).toBe('2')
        expect(rows[1].get('td').attributes('colspan')).toBe('3')
      })

      it('reacts when cell spanning is enabled after mount', async () => {
        const table = mountTable({
          props: {
            columns: rowSpanningColumns,
            data: repeatedStatusData,
            enableCellSpanning: false,
          },
        })

        expect(table.findAll('tbody tr').map((row) => row.findAll('td').length)).toEqual([3, 3, 3])

        await table.setProps({ enableCellSpanning: true })

        expect(table.findAll('tbody tr').map((row) => row.findAll('td').length)).toEqual([3, 2, 3])
        expect(table.findAll('tbody tr')[0].findAll('td')[2].attributes('rowspan')).toBe('2')
      })
    })

    describe('columnPinning', () => {
      it('renders start and end pinned columns in their logical regions', () => {
        const table = mountTable({
          props: {
            data,
            columnPinning: { start: ['name'], end: ['id'] },
          },
        })

        expect(table.findAll('thead th').map((header) => header.text())).toEqual([
          'Name',
          'Status',
          'ID',
        ])
        expect(
          table
            .findAll('tbody tr')[0]
            .findAll('td')
            .map((cell) => cell.text()),
        ).toEqual(['Ada Lovelace', 'active', '1'])
        expect(table.get('th[data-pinned="start"]').attributes('style')).toContain(
          'position: sticky',
        )
        expect(table.get('th[data-pinned="end"]').attributes('style')).toContain('position: sticky')
      })

      it('reacts to columnPinning prop changes', async () => {
        const table = mountTable({
          props: { data, columnPinning: { start: ['id'], end: [] } },
        })

        expect(table.get('th[data-pinned="start"]').text()).toBe('ID')

        await table.setProps({ columnPinning: { start: [], end: ['status'] } })

        expect(table.find('th[data-pinned="start"]').exists()).toBe(false)
        expect(table.get('th[data-pinned="end"]').text()).toBe('Status')
      })

      it('does not apply sticky styles when no columns are pinned', () => {
        const table = mountTable({ props: { data } })

        expect(table.find('[data-pinned]').exists()).toBe(false)
        expect(table.findAll('th').every((header) => !header.attributes('style'))).toBe(true)
      })
    })

    describe('textNoResults', () => {
      it.each([
        { input: undefined, expected: 'No results.' },
        { input: 'Nothing found', expected: 'Nothing found' },
      ])('renders fallback text=$expected', ({ input, expected }) => {
        const table = mountTable({ props: { data: [], textNoResults: input } })

        expect(table.get('tbody').text()).toContain(expected)
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-table-root]',
      mount: (attrs) => mountTable({ attrs }),
    })
  })

  describe('slots', () => {
    describe('header-{accessorKey}', () => {
      it('renders a custom header slot with header and column props', () => {
        const table = mountTable({
          props: { data },
          slots: {
            'header-status': ({ header, column }) =>
              h('span', { 'data-test-table-header-slot': 'status' }, `${header.id}:${column.id}`),
          },
        })

        expect(table.get('[data-test-table-header-slot="status"]').text()).toBe('status:status')
        expect(table.findAll('thead th').map((header) => header.text())).toEqual([
          'ID',
          'Name',
          'status:status',
        ])
      })

      it('keeps the default header rendering when the slot is absent', () => {
        const table = mountTable({ props: { data } })

        expect(table.findAll('thead th').map((header) => header.text())).toEqual([
          'ID',
          'Name',
          'Status',
        ])
      })
    })

    describe('cell-{accessorKey}', () => {
      it('renders a custom cell slot with row, cell and value props', () => {
        const table = mountTable({
          props: { data },
          slots: {
            'cell-status': ({ row, cell, value }) =>
              h(
                'span',
                { 'data-test-table-cell-slot': 'status' },
                `${row.original.name}:${cell.column.id}:${value}`,
              ),
          },
        })

        expect(
          table.findAll('[data-test-table-cell-slot="status"]').map((cell) => cell.text()),
        ).toEqual(['Ada Lovelace:status:active', 'Grace Hopper:status:inactive'])
        expect(table.findAll('tbody td')[1].text()).toBe('Ada Lovelace')
      })
    })

    describe('empty', () => {
      it('keeps the header visible and renders the fallback when absent', () => {
        const table = mountTable({ props: { data: [] } })

        expect(table.findAll('thead th')).toHaveLength(columns.length)
        expect(table.get('tbody').text()).toContain('No results.')
      })

      it('renders the custom slot and exposes colspan', () => {
        const table = mountTable({
          props: { data: [] },
          slots: {
            empty: ({ colspan }) =>
              h('span', { 'data-test-table-empty-slot': '' }, `Empty:${colspan}`),
          },
        })

        expect(table.get('[data-test-table-empty-slot]').text()).toBe('Empty:3')
        expect(table.get('tbody').text()).not.toContain('No results.')
      })

      it('uses the number of leaf columns for grouped tables', () => {
        const table = mountTable({
          props: { columns: groupedColumns, data: [] },
          slots: {
            empty: ({ colspan }) =>
              h('span', { 'data-test-table-empty-slot': '' }, `Empty:${colspan}`),
          },
        })

        expect(table.get('[data-test-table-empty-slot]').text()).toBe('Empty:3')
        expect(table.get('tbody td').attributes('colspan')).toBe('3')
      })
    })
  })
})
