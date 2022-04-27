import Handlebars from 'handlebars';
import { Form } from '../../components/form';
import registrationPageTmpl from './registration.hbs';
import { RegistrtationInputProps } from '../../helpers/form-variables';

const registrationData = {
  title: 'Registration',
  buttonProps: {
    type: 'submit',
    title: 'Sign up',
  },
  linkProps: {
    class: 'link',
    href: '/login',
    title: 'Login',
  },
  inputProps: RegistrtationInputProps,
};

export const getRegistrationPageHTML = () => {
  Handlebars.registerPartial('registration', Form(registrationData));

  return registrationPageTmpl();
};
