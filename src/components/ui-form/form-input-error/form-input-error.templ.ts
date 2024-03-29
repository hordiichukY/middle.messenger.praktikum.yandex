import Block from '../../../core/Block';
import FormInputErrorTmpl from './form-input-error.hbs';

type FormInputErrorProps = {
  error?: string;
  showError?: boolean;
};

export class FormInputError extends Block<FormInputErrorProps> {
  render() {
    return this.compile(FormInputErrorTmpl, { ...this.props });
  }
}
