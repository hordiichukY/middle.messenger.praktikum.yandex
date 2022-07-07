import { Form } from '../../components/ui-form/form'
import { LoginInputsProps } from '../../variables/form-variables'
import Block from '../../core/Block'
import loginPageTmpl from './login.hbs'

export class LoginPage extends Block {
  initChildren() {
    this.children.loginForm = new Form({
      title: 'Login',
      buttonTitle: 'Sign in',
      linkProps: {
        href: '/sign-up',
        title: 'Create account',
      },
      inputFieldProps: LoginInputsProps,
    })
  }

  render() {
    return this.compile(loginPageTmpl, {})
  }
}
