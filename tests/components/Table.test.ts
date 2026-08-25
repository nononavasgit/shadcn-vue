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

    describe('columnFilters', () => {
      it.each([
        { input: undefined, expectedNames: ['Ada Lovelace', 'Grace Hopper'] },
        { input: [], expectedNames: ['Ada Lovelace', 'Grace Hopper'] },
        { input: [{ id: 'name', value: 'ada' }], expectedNames: ['Ada Lovelace'] },
        { input: [{ id: 'status', value: 'inactive' }], expectedNames: ['Grace Hopper'] },
      ])('renders rows matching columnFilters=$input', ({ input, expectedNames }) => {
        const table = mountTable({ props: { columnFilters: input, data } })

        expect(table.findAll('tbody tr').map((row) => row.findAll('td')[1].text())).toEqual(
          expectedNames,
        )
      })

      it('reacts to external filter changes', async () => {
        const table = mountTable({ props: { columnFilters: [], data } })

        await table.setProps({ columnFilters: [{ id: 'name', value: 'grace' }] })

        expect(table.findAll('tbody tr')).toHaveLength(1)
        expect(table.get('tbody').text()).toContain('Grace Hopper')
      })
    })

    describe('enableColumnFilters', () => {
      it.each([undefined, true])(
        'filters rows when enableColumnFilters=%s',
        (enableColumnFilters) => {
          const table = mountTable({
            props: {
              columnFilters: [{ id: 'name', value: 'ada' }],
              data,
              enableColumnFilters,
            },
          })

          expect(table.findAll('tbody tr')).toHaveLength(1)
        },
      )

      it('does not expose filtering through columns when disabled', () => {
        const table = mountTable({
          props: { data, enableColumnFilters: false },
          slots: {
            'header-name': ({ column }) =>
              h('span', { 'data-test-can-filter': '' }, String(column.getCanFilter())),
          },
        })

        expect(table.get('[data-test-can-filter]').text()).toBe('false')
      })
    })

    describe('globalFilter', () => {
      it.each([
        { input: undefined, expectedNames: ['Ada Lovelace', 'Grace Hopper'] },
        { input: '', expectedNames: ['Ada Lovelace', 'Grace Hopper'] },
        { input: 'ada', expectedNames: ['Ada Lovelace'] },
        { input: 'INACTIVE', expectedNames: ['Grace Hopper'] },
      ])('searches all eligible columns for globalFilter=$input', ({ input, expectedNames }) => {
        const table = mountTable({ props: { data, globalFilter: input } })

        expect(table.findAll('tbody tr').map((row) => row.findAll('td')[1].text())).toEqual(
          expectedNames,
        )
      })

      it('reacts to an externally controlled search value', async () => {
        const table = mountTable({ props: { data, globalFilter: '' } })

        await table.setProps({ globalFilter: 'grace' })

        expect(table.findAll('tbody tr')).toHaveLength(1)
        expect(table.get('tbody').text()).toContain('Grace Hopper')
      })

      it('respects enableGlobalFilter=false on a column', () => {
        const globallyFilteredColumns: TableColumn<Person>[] = [
          { accessorKey: 'id', header: 'ID' },
          { accessorKey: 'name', header: 'Name', enableGlobalFilter: false },
          { accessorKey: 'status', header: 'Status' },
        ]
        const table = mountTable({
          props: { columns: globallyFilteredColumns, data, globalFilter: 'ada' },
        })

        expect(table.get('tbody').text()).toContain('No results.')
      })

      it.each([
        { input: 'jose', expectedId: '1' },
        { input: 'madrid', expectedId: '1' },
        { input: 'administracion', expectedId: '1' },
        { input: 'vue', expectedId: '2' },
      ])('searches nested objects and arrays for $input', ({ input, expectedId }) => {
        type RichPerson = Person & {
          profile: { city: string; displayName: string }
          tags: string[]
        }
        const richColumns: TableColumn<RichPerson>[] = [
          { accessorKey: 'id', header: 'ID' },
          { accessorKey: 'profile', header: 'Profile' },
          { accessorKey: 'tags', header: 'Tags' },
        ]
        const richData: RichPerson[] = [
          {
            id: '1',
            name: 'Fallback name',
            status: 'active',
            profile: { city: 'Madrid', displayName: 'José Navas' },
            tags: ['Administración', 'TypeScript'],
          },
          {
            id: '2',
            name: 'Another name',
            status: 'inactive',
            profile: { city: 'Lisboa', displayName: 'Ana Silva' },
            tags: ['Vue', 'Diseño'],
          },
        ]
        const table = mount(Table, {
          props: { columns: richColumns, data: richData, globalFilter: input },
          slots: {
            'cell-profile': ({ value }) =>
              h('span', { 'data-test-profile-component': '' }, JSON.stringify(value)),
          },
        })

        expect(table.findAll('tbody tr')).toHaveLength(1)
        expect(table.get('tbody tr td').text()).toBe(expectedId)
        expect(table.get('[data-test-profile-component]').exists()).toBe(true)
      })

      it('accepts a custom globalFilterFn criterion', () => {
        const table = mountTable({
          props: {
            data,
            globalFilter: '2',
            globalFilterFn: (row, _columnId, filterValue) => row.original.id === filterValue,
          },
        })

        expect(table.findAll('tbody tr')).toHaveLength(1)
        expect(table.get('tbody').text()).toContain('Grace Hopper')
      })
    })

    describe('enableGlobalFilter', () => {
      it.each([undefined, true])(
        'searches rows when enableGlobalFilter=%s',
        (enableGlobalFilter) => {
          const table = mountTable({ props: { data, enableGlobalFilter, globalFilter: 'ada' } })

          expect(table.findAll('tbody tr')).toHaveLength(1)
          expect(table.get('tbody').text()).toContain('Ada Lovelace')
        },
      )

      it('renders the supplied data unchanged when enableGlobalFilter=false', () => {
        const table = mountTable({
          props: { data, enableGlobalFilter: false, globalFilter: 'ada' },
        })

        expect(table.findAll('tbody tr')).toHaveLength(2)
      })
    })

    describe('manualFiltering', () => {
      it.each([undefined, false])(
        'filters local data when manualFiltering=%s',
        (manualFiltering) => {
          const table = mountTable({
            props: { columnFilters: [{ id: 'name', value: 'ada' }], data, manualFiltering },
          })

          expect(table.findAll('tbody tr')).toHaveLength(1)
        },
      )

      it('renders the supplied data unchanged when manualFiltering=true', () => {
        const table = mountTable({
          props: {
            columnFilters: [{ id: 'name', value: 'ada' }],
            data,
            manualFiltering: true,
          },
        })

        expect(table.findAll('tbody tr')).toHaveLength(2)
      })

      it('bypasses global filtering when manualFiltering=true', () => {
        const table = mountTable({ props: { data, globalFilter: 'ada', manualFiltering: true } })

        expect(table.findAll('tbody tr')).toHaveLength(2)
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
      it.each([undefined, false])('does not render pin buttons when pinnable=%s', (pinnable) => {
        const table = mountTable({ props: { data, pinnable } })

        expect(table.find('[data-test-table-pin]').exists()).toBe(false)
      })

      it('renders an accessible pin button before every pinnable header when enabled', () => {
        const table = mountTable({ props: { data, pinnable: true } })
        const headers = table.findAll('thead th')

        expect(table.findAll('[data-test-table-pin]')).toHaveLength(columns.length)
        expect(headers[0].element.firstElementChild?.querySelector('button')).not.toBeNull()
        expect(table.get('[data-test-table-pin][data-column-id="id"]').attributes()).toMatchObject({
          'aria-label': 'Fijar columna id',
          'aria-pressed': 'false',
          'data-test-button-root': '',
          type: 'button',
        })
      })

      it('does not render a pin button for a column with pinning disabled', () => {
        const columnsWithDisabledPinning: TableColumn<Person>[] = [
          { accessorKey: 'id', header: 'ID', enablePinning: false },
          { accessorKey: 'name', header: 'Name' },
        ]
        const table = mountTable({
          props: { columns: columnsWithDisabledPinning, data, pinnable: true },
        })

        expect(table.find('[data-test-table-pin][data-column-id="id"]').exists()).toBe(false)
        expect(table.find('[data-test-table-pin][data-column-id="name"]').exists()).toBe(true)
      })

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
        const table = mountTable({ props: { data, pinnable: true } })

        expect(table.find('[data-pinned]').exists()).toBe(false)
        expect(
          table.findAll('th').every((header) => !header.attributes('style')?.includes('sticky')),
        ).toBe(true)
      })
    })

    describe('columnVisibility', () => {
      it.each([
        { input: undefined, expectedHeaders: ['ID', 'Name', 'Status'] },
        { input: {}, expectedHeaders: ['ID', 'Name', 'Status'] },
        { input: { name: false }, expectedHeaders: ['ID', 'Status'] },
        { input: { id: false, status: false }, expectedHeaders: ['Name'] },
      ])('renders visible headers for columnVisibility=$input', ({ input, expectedHeaders }) => {
        const table = mountTable({ props: { columnVisibility: input, data } })

        expect(table.findAll('thead th').map((header) => header.text())).toEqual(expectedHeaders)
        expect(
          table
            .findAll('tbody tr')[0]
            .findAll('td')
            .map((cell) => cell.text()),
        ).toEqual(
          expectedHeaders.map((header) => {
            if (header === 'ID') return '1'
            if (header === 'Name') return 'Ada Lovelace'
            return 'active'
          }),
        )
      })

      it('reacts to external column visibility changes', async () => {
        const table = mountTable({ props: { columnVisibility: { name: false }, data } })

        expect(table.findAll('thead th').map((header) => header.text())).toEqual(['ID', 'Status'])

        await table.setProps({ columnVisibility: { id: false } })

        expect(table.findAll('thead th').map((header) => header.text())).toEqual(['Name', 'Status'])
      })

      it('uses the visible leaf column count for the empty row colspan', () => {
        const table = mountTable({
          props: { columns: groupedColumns, columnVisibility: { name: false }, data: [] },
        })

        expect(table.get('tbody td').attributes('colspan')).toBe('2')
      })

      it('keeps pinned visible columns in their logical regions', () => {
        const table = mountTable({
          props: {
            columnPinning: { start: ['name'], end: ['id'] },
            columnVisibility: { status: false },
            data,
          },
        })

        expect(table.findAll('thead th').map((header) => header.text())).toEqual(['Name', 'ID'])
        expect(table.get('th[data-pinned="start"]').text()).toBe('Name')
        expect(table.get('th[data-pinned="end"]').text()).toBe('ID')
      })
    })

    describe('column sizing', () => {
      it('applies each configured size to its header and cells', () => {
        const sizedColumns: TableColumn<Person>[] = [
          { accessorKey: 'id', header: 'ID', size: 80 },
          { accessorKey: 'name', header: 'Name', size: 260 },
          { accessorKey: 'status', header: 'Status', size: 120 },
        ]
        const table = mountTable({ props: { columns: sizedColumns, data } })

        expect(table.findAll('thead th').map((header) => header.attributes('style'))).toEqual([
          'max-width: 80px; min-width: 80px; width: 80px;',
          'max-width: 260px; min-width: 260px; width: 260px;',
          'max-width: 120px; min-width: 120px; width: 120px;',
        ])
        expect(table.findAll('tbody tr')[0].findAll('td')[1].attributes('style')).toContain(
          'width: 260px',
        )
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

  describe('emits', () => {
    describe('update:columnFilters', () => {
      it('emits the next controlled state when a column filter changes', async () => {
        const table = mountTable({
          props: { columnFilters: [{ id: 'status', value: 'active' }], data },
          slots: {
            'header-name': ({ column }) =>
              h(
                'button',
                {
                  'data-test-column-filter': '',
                  onClick: () => column.setFilterValue('ada'),
                },
                'Filter',
              ),
          },
        })

        await table.get('[data-test-column-filter]').trigger('click')

        expect(table.emitted('update:columnFilters')).toEqual([
          [
            [
              { id: 'status', value: 'active' },
              { id: 'name', value: 'ada' },
            ],
          ],
        ])
      })

      it('emits removal when a filter is cleared', async () => {
        const table = mountTable({
          props: { columnFilters: [{ id: 'name', value: 'ada' }], data },
          slots: {
            'header-name': ({ column }) =>
              h('button', {
                'data-test-column-filter': '',
                onClick: () => column.setFilterValue(''),
              }),
          },
        })

        await table.get('[data-test-column-filter]').trigger('click')

        expect(table.emitted('update:columnFilters')).toEqual([[[]]])
      })
    })

    describe('update:columnPinning', () => {
      it('emits start pinning when an unpinned column button is clicked', async () => {
        const table = mountTable({ props: { data, pinnable: true } })

        await table.get('[data-test-table-pin][data-column-id="name"]').trigger('click')

        expect(table.emitted('update:columnPinning')).toEqual([[{ start: ['name'], end: [] }]])
      })

      it.each(['start', 'end'] as const)(
        'emits unpinning when a column pinned at %s is clicked',
        async (position) => {
          const columnPinning = {
            start: position === 'start' ? ['name'] : [],
            end: position === 'end' ? ['name'] : [],
          }
          const table = mountTable({ props: { data, columnPinning, pinnable: true } })
          const button = table.get('[data-test-table-pin][data-column-id="name"]')

          expect(button.attributes('aria-pressed')).toBe('true')
          expect(button.attributes('aria-label')).toBe('Desfijar columna name')

          await button.trigger('click')

          expect(table.emitted('update:columnPinning')).toEqual([[{ start: [], end: [] }]])
        },
      )
    })

    describe('update:columnVisibility', () => {
      it('emits the next controlled state when a column is toggled', async () => {
        const table = mountTable({
          props: { columnVisibility: { status: false }, data },
          slots: {
            'header-name': ({ column }) =>
              h('button', {
                'data-test-column-visibility-toggle': '',
                onClick: () => column.toggleVisibility(),
              }),
          },
        })

        await table.get('[data-test-column-visibility-toggle]').trigger('click')

        expect(table.emitted('update:columnVisibility')).toEqual([[{ status: false, name: false }]])
      })
    })
  })

  describe('slots', () => {
    describe('pinning', () => {
      it('replaces the default button and exposes isPinned and togglePinning', async () => {
        const pinningColumns: TableColumn<Person>[] = [{ accessorKey: 'name', header: 'Name' }]
        const table = mountTable({
          props: {
            columns: pinningColumns,
            columnPinning: { start: ['name'], end: [] },
            data,
            pinnable: true,
          },
          slots: {
            pinning: ({ isPinned, togglePinning }) =>
              h(
                'button',
                {
                  'data-test-custom-pinning': '',
                  'data-is-pinned': String(isPinned),
                  onClick: togglePinning,
                },
                'Custom pin',
              ),
          },
        })
        const customPinning = table.get('[data-test-custom-pinning]')

        expect(customPinning.attributes('data-is-pinned')).toBe('true')
        expect(table.find('[data-test-table-pin]').exists()).toBe(false)

        await customPinning.trigger('click')

        expect(table.emitted('update:columnPinning')).toEqual([[{ start: [], end: [] }]])
      })

      it.each([
        { pinnable: undefined, enablePinning: undefined },
        { pinnable: false, enablePinning: undefined },
        { pinnable: true, enablePinning: false },
      ])(
        'does not render when pinnable=$pinnable and enablePinning=$enablePinning',
        ({ pinnable, enablePinning }) => {
          const pinningColumns: TableColumn<Person>[] = [
            { accessorKey: 'name', header: 'Name', enablePinning },
          ]
          const table = mountTable({
            props: { columns: pinningColumns, data, pinnable },
            slots: {
              pinning: () => h('span', { 'data-test-custom-pinning': '' }, 'Custom pin'),
            },
          })

          expect(table.find('[data-test-custom-pinning]').exists()).toBe(false)
        },
      )
    })

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

    describe('cell-{columnId}', () => {
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

      it('uses the explicit column id for an accessorFn column', () => {
        const table = mountTable({
          props: { columns: derivedColumns, data },
          slots: {
            'cell-summary': ({ row, cell, value }) =>
              h(
                'span',
                { 'data-test-table-derived-cell-slot': '' },
                `${row.original.id}:${cell.column.id}:${value}`,
              ),
          },
        })

        expect(
          table.findAll('[data-test-table-derived-cell-slot]').map((cell) => cell.text()),
        ).toEqual(['1:summary:Ada Lovelace (active)', '2:summary:Grace Hopper (inactive)'])
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
