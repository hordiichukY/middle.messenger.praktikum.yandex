import formInputTmpl from './form-input.hbs'
import Block from '../../../core/Block'

type InputName =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'retype'
export type FormInputProps = {
  id?: string
  type?: string
  name: InputName
  placeholder?: string
  required?: string
  error?: string
  value?: string
  label?: string
  disabled?: string
  events?: {
    focus?: (event?: Event) => void
    blur?: (event?: Event) => void
    input?: (event?: Event) => void
  }
}

export class FormInput extends Block<FormInputProps> {
  render() {
    return this.compile(formInputTmpl, { ...this.props })
  }
}
