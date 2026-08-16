import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import {
  Attachment,
  createAttachmentContext,
  type AttachmentContext,
  type AttachmentProps,
} from '@/components/ui/Attachment'
import { testIconProps } from '../utils/testIconProps'

function mountAttachment(options: MountingOptions<AttachmentProps> = {}) {
  return mount(Attachment, options)
}

describe('Attachment', () => {
  describe('props', () => {
    describe('label', () => {
      it('renders label', () => {
        const attachment = mountAttachment({ props: { label: 'report.pdf' } })

        expect(attachment.get('[data-test-attachment-label]').text()).toBe('report.pdf')
      })
    })

    describe('description', () => {
      it('renders description', () => {
        const attachment = mountAttachment({ props: { description: '2.4 MB' } })

        expect(attachment.get('[data-test-attachment-description]').text()).toBe('2.4 MB')
      })
    })

    describe('orientation', () => {
      it.each([
        { input: 'horizontal' as const, expected: 'w-fit' },
        { input: 'vertical' as const, expected: 'w-40' },
      ])('renders orientation=$input', ({ input, expected }) => {
        const root = mountAttachment({ props: { orientation: input } }).get(
          '[data-test-attachment-root]',
        )

        expect(root.classes()).toContain(expected)
      })
    })

    describe('size', () => {
      it.each([
        {
          input: 'md' as const,
          expected: { root: 'p-3', media: 'size-10', label: 'text-sm', description: 'text-xs' },
        },
        {
          input: 'sm' as const,
          expected: {
            root: 'p-2.5',
            media: 'size-8',
            label: 'text-xs',
            description: 'text-[11px]',
          },
        },
        {
          input: 'xs' as const,
          expected: {
            root: 'p-2',
            media: 'size-6',
            label: 'text-[11px]',
            description: 'text-[11px]',
          },
        },
      ])('renders size=$input', ({ input, expected }) => {
        const attachment = mountAttachment({
          props: {
            size: input,
            icon: 'fileText',
            label: 'report.pdf',
            description: '2.4 MB',
          },
        })

        expect(attachment.get('[data-test-attachment-root]').classes()).toContain(expected.root)
        expect(attachment.get('[data-test-attachment-media]').classes()).toContain(expected.media)
        expect(attachment.get('[data-test-attachment-label]').classes()).toContain(expected.label)
        expect(attachment.get('[data-test-attachment-description]').classes()).toContain(
          expected.description,
        )
      })
    })

    describe('state', () => {
      it.each([
        { input: 'idle' as const, expected: 'border-dashed' },
        { input: 'uploading' as const, expected: 'animate-pulse' },
        { input: 'processing' as const, expected: 'animate-pulse' },
        { input: 'error' as const, expected: 'text-error' },
      ])('renders state=$input', ({ input, expected }) => {
        const attachment = mountAttachment({
          props: { state: input, label: 'report.pdf', description: '2.4 MB' },
        })
        const root = attachment.get('[data-test-attachment-root]')
        const label = attachment.get('[data-test-attachment-label]')

        expect(root.classes().concat(label.classes())).toContain(expected)
      })

      it('renders state=done', () => {
        const root = mountAttachment({
          props: { state: 'done', label: 'report.pdf', description: '2.4 MB' },
        }).get('[data-test-attachment-root]')

        expect(root.classes()).not.toContain('border-dashed')
      })
    })

    describe('icon', () => {
      testIconProps({
        text: 'passes icon props',
        id: '[data-test-attachment-icon]',
        mount: (input) => mountAttachment({ props: { icon: input } }),
      })

      it.each([
        { attachmentSize: 'md' as const, expected: 'md' },
        { attachmentSize: 'sm' as const, expected: 'sm' },
        { attachmentSize: 'xs' as const, expected: 'xs' },
      ])('maps Attachment size=$attachmentSize to icon size', ({ attachmentSize, expected }) => {
        const icon = mountAttachment({
          props: { size: attachmentSize, icon: 'fileText' },
        }).getComponent('[data-test-attachment-icon]')

        expect(icon.props('size')).toBe(expected)
      })

      it('renders an animated spinner while uploading', () => {
        const icon = mountAttachment({ props: { state: 'uploading' } }).getComponent(
          '[data-test-attachment-icon]',
        )

        expect(icon.props('name')).toBe('spinner')
        expect(icon.classes()).toContain('animate-spin')
      })
    })

    describe('ui', () => {
      const parts = ['media', 'content', 'label', 'description', 'actions'] as const

      it.each(parts)('renders ui.%s attributes', (part) => {
        const attachment = mountAttachment({
          props: {
            label: 'report.pdf',
            description: '2.4 MB',
            mediaVariant: 'image',
            ui: { [part]: () => ({ class: `ui-${part}`, style: 'opacity: 0.8' }) },
          },
          slots: {
            media: () => 'Media',
            actions: () => 'Actions',
          },
        })
        const element = attachment.get(`[data-test-attachment-${part}]`)

        expect(element.classes()).toContain(`ui-${part}`)
        expect(element.attributes('style')).toContain('opacity: 0.8')
      })
    })
  })

  describe('attrs', () => {
    it('forwards arbitrary attrs, class and style to root', () => {
      const root = mountAttachment({
        attrs: {
          id: 'attachment',
          'aria-label': 'Report attachment',
          class: 'custom-attachment',
          style: 'opacity: 0.5',
        },
      }).get('[data-test-attachment-root]')

      expect(root.attributes('id')).toBe('attachment')
      expect(root.attributes('aria-label')).toBe('Report attachment')
      expect(root.classes()).toContain('custom-attachment')
      expect(root.attributes('style')).toContain('opacity: 0.5')
    })
  })

  describe('context contract', () => {
    it.each([
      {
        name: 'default values',
        input: {},
        expected: {
          state: 'idle',
        },
      },
      {
        name: 'configured values',
        input: {
          state: 'done' as const,
        },
        expected: {
          state: 'done',
        },
      },
    ])('creates the contract with $name', ({ input, expected }) => {
      expect(createAttachmentContext(input)).toEqual(expected satisfies AttachmentContext)
    })
  })

  describe('slots', () => {
    it('does not use the media slot for icon', () => {
      const attachment = mountAttachment({
        props: { icon: 'fileText' },
        slots: { media: () => h('span', { 'data-test-image-slot': '' }, 'Image') },
      })

      expect(attachment.find('[data-test-image-slot]').exists()).toBe(false)
      expect(attachment.find('[data-test-attachment-icon]').exists()).toBe(true)
    })

    const slotCases = [
      { input: 'media' as const, expected: 'media', props: { mediaVariant: 'image' as const } },
      { input: 'label' as const, expected: 'label', props: {} },
      { input: 'description' as const, expected: 'description', props: {} },
      { input: 'actions' as const, expected: 'actions', props: {} },
    ]

    it.each(slotCases)('renders the $input slot', ({ input, expected, props }) => {
      const attachment = mountAttachment({
        props,
        slots: {
          [input]: () => h('span', { 'data-test-attachment-slot': expected }, `Slot ${expected}`),
        },
      })

      expect(attachment.get(`[data-test-attachment-slot="${expected}"]`).text()).toBe(
        `Slot ${expected}`,
      )
    })
  })
})
