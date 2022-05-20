import { Form } from '../../components/ui-form/form';
import { LoginInputsProps } from '../../helpers/form-variables';
import Block from '../../utils/block';
import loginPageTmpl from './login.hbs';
 
export class LoginPage extends Block {
  initChildren() {
    this.children.loginForm = new Form({
      title: 'Login', 
      buttonTitle: 'Sign in',
      linkProps: {
        href: '/registration',
        title: 'Create account',
      },
      inputFieldProps: LoginInputsProps,
    })
  }

  render() {
    return this.compile(loginPageTmpl, {})
  }


}
