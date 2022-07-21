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
  inputFieldProps: FormInputProps[]
  inputsValidationStatus: Record<string, unknown>
}

let formIsValid = false
export class Form extends Block<FormData> {
  constructor(props: FormData) {
    // todo change validation method
    super({ ...props, ...{ inputsValidationStatus: {} } })
  }

  validateForm(inputName: string, isValid: boolean) {
    this.props.inputsValidationStatus[inputName] = isValid

    formIsValid = Object.values(this.props.inputsValidationStatus).every(
      (value) => value
    )
    if (this.children.button instanceof Block) {
      if (formIsValid) {
        this.children.button.setProps({ class: 'button' })
      } else {
        this.children.button.setProps({ class: 'button disabled' })
      }
    }
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
        validateForm: this.validateForm.bind(this),
      })
    })
  }

  render() {
    return this.compile(formTmpl, { ...this.props })
  }
}
