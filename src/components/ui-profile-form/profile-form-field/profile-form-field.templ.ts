import ProfileFormFieldTmpl from './profile-form-field.hbs'
import Block from '../../../core/Block'
import { FormInput, FormInputProps } from '../../ui-form/form-input'
import { FormInputError } from '../../ui-form/form-input-error'
import { validate } from '../../../utils/validation'

type formValidation = (inputName: string, inputValueIsValid: boolean) => void
type formFieldProps = {
  id?: string
  labelClass?: string
  label?: string
  inputProps: FormInputProps
  validateForm: formValidation
}

export class ProfileFormField extends Block<formFieldProps> {
  validateInputValue(value: string) {
    const inputName = this.props.inputProps.name
    const validateForm = this.props.validateForm
    if (!inputName) {
      return
    }
    const inputValueIsValid = validate(inputName, value)
    if (this.children.error instanceof Block) {
      if (inputValueIsValid) {
        this.children.error.setProps({ modifier: 'hide' })
      } else {
        this.children.error.setProps({ modifier: 'show' })
      }
    }
    validateForm(inputName, inputValueIsValid)
  }

  initChildren() {
    this.children.input = new FormInput({
      ...this.props.inputProps,
      events: {
        focus: (event) =>
          this.validateInputValue((event?.target as HTMLInputElement).value),
        blur: (event) =>
          this.validateInputValue((event?.target as HTMLInputElement).value),
        input: (event) =>
          this.validateInputValue((event?.target as HTMLInputElement).value),
      },
    })

    this.children.error = new FormInputError({
      error: this.props.inputProps.error,
      modifier: 'hide',
    })
  }
  render() {
    return this.compile(ProfileFormFieldTmpl, { ...this.props })
  }
}
