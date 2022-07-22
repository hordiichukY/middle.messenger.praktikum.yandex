import FormFieldTmpl from './form-field.hbs'
import Block from '../../../core/Block'
import { default as FormInput, FormInputProps } from '../form-input'
import { FormInputError } from '../form-input-error'
import { validate } from '../../../utils/validation'

type formFieldProps = {
  inputProps: FormInputProps
  updateFormState: (inputName: string, isInputValid: boolean) => void
}

export class FormField extends Block<formFieldProps> {
  constructor(props: formFieldProps) {
    super(props)
  }

  validateInputValue(value: string) {
    const inputName = this.props.inputProps.name
    const isValid = validate(inputName, value)

    this.updateErrorBlock(isValid)
    this.props.updateFormState(inputName, isValid)
  }

  updateErrorBlock(isValid: boolean) {
    if (this.children.error instanceof Block) {
      this.children.error.setProps({ modifier: isValid ? 'hide' : 'show' })
    }
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
