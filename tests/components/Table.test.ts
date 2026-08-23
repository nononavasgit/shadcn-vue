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

const data: Person[] = [
  { id: '1', name: 'Ada Lovelace', status: 'active' },
  { id: '2', name: 'Grace Hopper', status: 'inactive' },
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
    })
  })
})
