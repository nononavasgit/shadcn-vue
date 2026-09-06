import type { VueWrapper } from '@vue/test-utils'
import { expect, it } from 'vitest'

import { Bubble, type BubbleProps } from '@/components/ui/Bubble'

interface TestBubbleConfigOptions {
  text: string
  mount: (input: BubbleProps) => VueWrapper | Promise<VueWrapper>
}

export function testBubbleConfig({ text, mount }: TestBubbleConfigOptions) {
  it(text, async () => {
    const input: BubbleProps = {
      align: 'end',
      variant: 'soft',
      severity: 'secondary',
      sideReaction: 'top',
      alignReaction: 'start',
      color: '#7c3aed',
    }

    const wrapper = await mount(input)
    const bubble = wrapper.getComponent(Bubble)

    expect(bubble.props()).toMatchObject(input)
  })
}
