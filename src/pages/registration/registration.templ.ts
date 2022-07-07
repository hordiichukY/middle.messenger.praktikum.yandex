import { Form } from '../../components/ui-form/form'
import registrationPageTmpl from './registration.hbs'
import { RegistrtationInputProps } from '../../variables/form-variables'
import Block from '../../core/Block'

export class RegistrationPage extends Block {
  initChildren() {
    this.children.registrationForm = new Form({
      title: 'Registration',
      buttonTitle: 'Sign up',
      linkProps: {
        href: '/',
        title: 'Login',
      },
      inputFieldProps: RegistrtationInputProps,
    })
  }

  render() {
    return this.compile(registrationPageTmpl, {})
  }
}
