import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { IconName, IconSize, NormalizeIconProps } from '@/components/ui/Icon'

interface TestIconPropsOptions {
  text: string
  id: string
  mount: (input: NormalizeIconProps | undefined) => VueWrapper | Promise<VueWrapper>
}

interface TestIconSizeOptions {
  text: string
  id: string
  mount: (input: IconSize | undefined) => VueWrapper | Promise<VueWrapper>
}

export function testIconProps({ text, id, mount }: TestIconPropsOptions) {
  it.each([
    { input: 'check' as IconName, expected: 'check' as IconName },
    { input: { name: 'save' as IconName }, expected: 'save' as IconName },
    { input: undefined, expected: undefined },
  ])(`${text} input=$input`, async ({ input, expected }) => {
    const icon = (await mount(input)).findComponent(id)

    expect(icon.exists()).toBe(expected !== undefined)
    if (expected !== undefined) expect(icon.props('name')).toBe(expected)
  })
}

export function testIconSize({ text, id, mount }: TestIconSizeOptions) {
  it.each([
    { input: 'xs' as IconSize, expected: 'xs' as IconSize },
    { input: 'sm' as IconSize, expected: 'sm' as IconSize },
    { input: 'md' as IconSize, expected: 'md' as IconSize },
    { input: 'lg' as IconSize, expected: 'lg' as IconSize },
    { input: undefined, expected: 'md' as IconSize },
  ])(`${text} input=$input as size=$expected`, async ({ input, expected }) => {
    const icon = (await mount(input)).getComponent(id)

    expect(icon.props('size')).toBe(expected)
  })
}
