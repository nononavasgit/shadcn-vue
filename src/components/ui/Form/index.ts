export { default as Form } from './Form.vue'

export type FormValue = unknown

export interface FormProps {
  modelValue?: FormValue
}

export interface FormEmits {
  submit: [event: SubmitEvent]
}

export interface FormSlots {
  default?(props: { modelValue: FormValue | undefined }): unknown
}
