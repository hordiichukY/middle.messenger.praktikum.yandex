import FormFieldTmpl from './form-field.hbs'
import Block from '../../../core/Block'
import { default as FormInput, FormInputProps } from '../form-input'
import { FormInputError } from '../form-input-error'
import { validate } from '../../../utils/validation'

type formValidation = (inputName: string, inputValueIsValid: boolean) => void
type formFieldProps = {
  inputProps: FormInputProps
  validateForm: formValidation
}

export class FormField extends Block<formFieldProps> {
  constructor(props: formFieldProps) {
    super(props)
  }

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
        focus: (event: Event) =>
          this.validateInputValue((event?.target as HTMLInputElement).value),
        blur: (event: Event) =>
          this.validateInputValue((event?.target as HTMLInputElement).value),
        input: (event: Event) =>
          this.validateInputValue((event?.target as HTMLInputElement).value),
      },
    })

    this.children.error = new FormInputError({
      error: this.props.inputProps.error,
      modifier: 'hide',
    })
  }
  render() {
    return this.compile(FormFieldTmpl, { ...this.props })
  }
}
