import formInputTmpl from './form-input.hbs'
import Block from '../../../core/Block'
import { User } from '../../../utils/types/userData'

type InputName =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'retype'
  | 'oldPassword'
  | 'newPassword'

export type FormInputProps = {
  currentUser?: User
  id: string
  type?: string
  name: InputName
  placeholder?: string
  required?: string
  error?: string
  label?: string
  disabled?: string
  value?: string
  events?: {
    focus?: (event?: Event) => void
    blur?: (event?: Event) => void
    input?: (event?: Event) => void
  }
}

export class FormInputBlock extends Block<FormInputProps> {
  constructor(props: FormInputProps) {
    super(props)
  }

  checkInputValue() {
    const currentUser = JSON.parse(JSON.stringify(this.props?.currentUser))
    if (!currentUser) {
      return
    }
    const inputName = this.props.name
    if (currentUser[inputName]) {
      this.props.value = currentUser[inputName]
    }
  }

  render() {
    this.checkInputValue()
    return this.compile(formInputTmpl, { ...this.props })
  }
}
