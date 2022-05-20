import { Form } from '../../components/ui-form/form';
import registrationPageTmpl from './registration.hbs';
import { RegistrtationInputProps } from '../../helpers/form-variables';
import Block from '../../utils/block';

export class RegistrationPage extends Block {
  initChildren() {
    this.children.registrationForm = new Form({
      title: 'Registration', 
      buttonTitle: 'Sign up',
      linkProps: {
        href: '/login',
        title: 'Login',
      },
      inputFieldProps: RegistrtationInputProps,
    })
  }

  render() {
    return this.compile(registrationPageTmpl, {})
  }
}