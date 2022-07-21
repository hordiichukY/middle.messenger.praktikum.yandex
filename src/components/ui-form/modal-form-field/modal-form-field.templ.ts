import ModalFormFieldTmpl from './modal-form-field.hbs'
import Block from '../../../core/Block'
import { default as FormInput, FormInputProps } from '../form-input'
import { FormInputError } from '../form-input-error'

export class ModalFormField extends Block<FormInputProps> {
  constructor(props: FormInputProps) {
    super(props)
  }

  initChildren() {
    this.children.input = new FormInput({
      ...this.props,
    })

    this.children.error = new FormInputError({
      error: this.props.error,
      modifier: 'hide',
    })
  }
  render() {
    return this.compile(ModalFormFieldTmpl, { ...this.props })
  }
}
