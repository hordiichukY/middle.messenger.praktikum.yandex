import Handlebars from 'handlebars';
import { Button } from '../button';
import { Link } from '../link';
import { FormInput } from '../form-input';
import formTmpl from './form.hbs';

export const Form = ({ title, buttonProps, linkProps, inputProps }) => {
  Handlebars.registerPartial('button', Button(buttonProps));
  Handlebars.registerPartial('link', Link(linkProps));
  Handlebars.registerPartial('inputField', FormInput);

  return formTmpl({
    title,
    buttonProps,
    linkProps,
    inputProps,
  });
};
