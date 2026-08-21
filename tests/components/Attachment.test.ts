import { mount, type MountingOptions } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import { Attachment, type AttachmentProps } from '@/components/ui/Attachment'
import { testAttrs } from '../utils/testAttrs'
import { testIconProps, testIconSize } from '../utils/testIconProps'

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
            icon: { name: 'fileText' },
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

      testIconSize({
        text: 'inherits Attachment size to icon',
        id: '[data-test-attachment-icon]',
        mount: (size) => mountAttachment({ props: { size, icon: { name: 'fileText' } } }),
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

      describe('media', () => {
        testAttrs({
          text: 'renders ui.media attributes',
          id: '[data-test-attachment-media]',
          mount: (attrs) =>
            mountAttachment({
              props: { mediaVariant: 'image', ui: { media: () => attrs } },
              slots: { media: () => 'Media' },
            }),
        })
      })

      describe('content', () => {
        testAttrs({
          text: 'renders ui.content attributes',
          id: '[data-test-attachment-content]',
          mount: (attrs) =>
            mountAttachment({
              props: {
                label: 'report.pdf',
                description: '2.4 MB',
                ui: { content: () => attrs },
              },
            }),
        })
      })

      describe('label', () => {
        testAttrs({
          text: 'renders ui.label attributes',
          id: '[data-test-attachment-label]',
          mount: (attrs) =>
            mountAttachment({
              props: { label: 'report.pdf', ui: { label: () => attrs } },
            }),
        })
      })

      describe('description', () => {
        testAttrs({
          text: 'renders ui.description attributes',
          id: '[data-test-attachment-description]',
          mount: (attrs) =>
            mountAttachment({
              props: { description: '2.4 MB', ui: { description: () => attrs } },
            }),
        })
      })

      describe('actions', () => {
        testAttrs({
          text: 'renders ui.actions attributes',
          id: '[data-test-attachment-actions]',
          mount: (attrs) =>
            mountAttachment({
              props: { ui: { actions: () => attrs } },
              slots: { actions: () => 'Actions' },
            }),
        })
      })
    })
  })

  describe('attrs', () => {
    testAttrs({
      text: 'forwards arbitrary attrs, class and style to root',
      id: '[data-test-attachment-root]',
      mount: (attrs) => mountAttachment({ attrs }),
    })
  })

  describe('slots', () => {
    describe('media', () => {
      it('does not use the media slot for icon', () => {
        const attachment = mountAttachment({
          props: { icon: { name: 'fileText' } },
          slots: { media: () => h('span', { 'data-test-image-slot': '' }, 'Image') },
        })

        expect(attachment.find('[data-test-image-slot]').exists()).toBe(false)
        expect(attachment.find('[data-test-attachment-icon]').exists()).toBe(true)
      })

      it('renders the media slot for image', () => {
        const attachment = mountAttachment({
          props: { mediaVariant: 'image' },
          slots: { media: () => h('span', { 'data-test-attachment-slot': 'media' }, 'Media') },
        })

        expect(attachment.get('[data-test-attachment-slot="media"]').text()).toBe('Media')
      })
    })

    describe('label', () => {
      it('renders the label slot and hides the label fallback', () => {
        const attachment = mountAttachment({
          props: { label: 'Label fallback' },
          slots: { label: () => h('span', { 'data-test-attachment-slot': 'label' }, 'Label') },
        })

        expect(attachment.get('[data-test-attachment-slot="label"]').text()).toBe('Label')
        expect(attachment.get('[data-test-attachment-root]').text()).not.toContain('Label fallback')
      })
    })

    describe('description', () => {
      it('renders the description slot and hides the description fallback', () => {
        const attachment = mountAttachment({
          props: { description: 'Description fallback' },
          slots: {
            description: () =>
              h('span', { 'data-test-attachment-slot': 'description' }, 'Description'),
          },
        })

        expect(attachment.get('[data-test-attachment-slot="description"]').text()).toBe(
          'Description',
        )
        expect(attachment.get('[data-test-attachment-root]').text()).not.toContain(
          'Description fallback',
        )
      })
    })

    describe('actions', () => {
      it('renders the actions slot', () => {
        const attachment = mountAttachment({
          slots: {
            actions: () => h('span', { 'data-test-attachment-slot': 'actions' }, 'Actions'),
          },
        })

        expect(attachment.get('[data-test-attachment-slot="actions"]').text()).toBe('Actions')
      })
    })
  })
})
