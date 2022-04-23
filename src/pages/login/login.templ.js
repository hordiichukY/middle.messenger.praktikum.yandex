import Handlebars from 'handlebars';
import { Form } from '../../components/form';
import loginPageTmpl from './login.hbs';
import { LoginInputsProps } from '../../helpers/form-variables';

const loginData = {
  title: 'Login',
  buttonProps: {
    type: 'submit',
    title: 'Sign in',
  },
  linkProps: {
    class: 'link',
    href: '/registration',
    title: 'Create account',
  },
  inputProps: LoginInputsProps,
};

export const getLoginPageHTML = () => {
  Handlebars.registerPartial('login', Form(loginData));

  return loginPageTmpl();
};
