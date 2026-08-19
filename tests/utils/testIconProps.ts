import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'
import type { IconConfig, IconName, IconSize } from '@/components/ui/Icon'

interface TestIconPropsOptions {
  text: string
  id: string
  default?: IconName
  mount: (input: IconConfig | undefined) => VueWrapper | Promise<VueWrapper>
}

interface TestIconSizeOptions {
  text: string
  id: string
  input?: IconSize
  mount: (input: IconSize | undefined) => VueWrapper | Promise<VueWrapper>
}

export function testIconProps({ text, id, default: defaultIcon, mount }: TestIconPropsOptions) {
  it.each([
    {
      input: {
        name: 'save' as IconName,
        color: '#ff0000',
        id: 'custom-icon',
        class: 'custom-icon',
        style: 'opacity: 0.5',
        'aria-label': 'Save',
        'data-test-icon-prop': 'true',
      },
    },
  ])(`${text}`, async ({ input }) => {
    const icon = (await mount(input)).findComponent(id)
    const expectedProps = getExpectedIconProps(input, defaultIcon)

    expect(icon.exists()).toBe(expectedProps !== undefined)
    if (expectedProps !== undefined) {
      expect(icon.props()).toMatchObject(expectedProps)

      if (input?.id) expect(icon.attributes('id')).toBe(input.id)
      if (input?.class) expect(icon.classes()).toContain(input.class)
      if (input?.style) expect(icon.attributes('style')).toContain('opacity: 0.5')
      if (input?.['aria-label']) expect(icon.attributes('aria-label')).toBe(input['aria-label'])
      if (input?.['data-test-icon-prop']) {
        expect(icon.attributes('data-test-icon-prop')).toBe(input['data-test-icon-prop'])
      }
    }
  })
}

function getExpectedIconProps(input: IconConfig | undefined, defaultIcon: IconName | undefined) {
  if (input) {
    return {
      name: input.name,
      ...(input.size !== undefined && { size: input.size }),
      ...(input.color !== undefined && { color: input.color }),
    }
  }
  if (defaultIcon !== undefined) return { name: defaultIcon }
  return undefined
}

export function testIconSize({ text, id, input = 'md', mount }: TestIconSizeOptions) {
  it(text, async () => {
    const icon = (await mount(input)).getComponent(id)

    expect(icon.props()).toMatchObject({ size: input })
  })
}
