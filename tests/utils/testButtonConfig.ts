import type { VueWrapper } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

import { Button, type NormalizeButtonProps } from '@/components/ui/Button'

interface TestButtonConfigOptions {
  text: string
  id: string
  mount: (input: NormalizeButtonProps) => VueWrapper | Promise<VueWrapper>
}

export function testButtonConfig({ text, id, mount }: TestButtonConfigOptions) {
  it(text, async () => {
    const onClick = vi.fn()
    const input: NormalizeButtonProps = {
      label: 'Close',
      onClick,
      id: 'custom-button',
      class: 'custom-button',
      style: 'opacity: 0.5',
    }

    const wrapper = await mount(input)
    const button = wrapper
      .findAllComponents(Button)
      .find((component) => component.attributes('id') === input.id)

    if (!button) throw new Error(`Expected Button ${id}`)

    expect(button.exists()).toBe(true)
    expect(button.props('label')).toBe(input.label)
    expect(button.attributes('id')).toBe(input.id)
    expect(button.classes()).toContain(input.class)
    expect(button.attributes('style')).toContain('opacity: 0.5')

    await button.trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })
}
