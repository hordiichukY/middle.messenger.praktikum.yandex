import Block from '../../../core/Block'
import formTmpl from './form.hbs'
import { Button, ButtonProps } from '../../button'
import { Link, LinkProps } from '../../link'
import { FormField } from '../form-field'
import { FormInputProps } from '../form-input'

type FormData = {
  title: string
  buttonProps: ButtonProps
  linkProps: LinkProps
  updateFormState: (inputName: string, isInputValid: boolean) => void
  inputFieldProps: FormInputProps[]
  inputsValidationStatus: Record<string, unknown>
}

export class Form extends Block<FormData> {
  constructor(props: FormData) {
    // todo change validation method
    super({ ...props, ...{ inputsValidationStatus: {} } })
  }

  validateForm(inputName: string, isValid: boolean) {
    this.props.inputsValidationStatus[inputName] = isValid
    return Object.values(this.props.inputsValidationStatus).every(
      (value) => value
    )
  }

  setSubmitButtonProps(isFormValid: boolean) {
    if (this.children.button instanceof Block) {
      if (isFormValid) {
        this.children.button.setProps({ class: 'button' })
      } else {
        this.children.button.setProps({ class: 'button disabled' })
      }
    }
  }

  updateFormState(inputName: string, isInputValid: boolean) {
    const isFormValid = this.validateForm(inputName, isInputValid)

    this.setSubmitButtonProps(isFormValid)
  }

  initChildren() {
    this.children.button = new Button({
      class: 'button disabled',
      type: 'submit',
      ...this.props.buttonProps,
    })

    this.children.link = new Link({
      ...this.props.linkProps,
      class: 'link',
    })

    this.children.fields = this.props.inputFieldProps.map((props) => {
      this.props.inputsValidationStatus[props.name] = false

      return new FormField({
        inputProps: props,
        updateFormState: this.updateFormState.bind(this),
      })
    })
  }

  render() {
    return this.compile(formTmpl, { ...this.props })
  }
}
