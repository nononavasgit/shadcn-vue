export const listboxDefaults = {
  disabled: false,
  multiple: false,
  orientation: 'vertical' as const,
  selectionBehavior: 'toggle' as const,
  highlightOnHover: true,
  loading: false,
  filter: false,
  ignoreFilter: false,
  items: () => [],
  groups: () => [],
  ui: undefined,
} as const
