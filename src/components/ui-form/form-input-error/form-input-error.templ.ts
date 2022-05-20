import Block from '../../../utils/block';
import FormInputErrorTmpl from './form-input-error.hbs';

type FormInputErrorProps = {
  error?: string;
  modifier?: string;
}; 

export class FormInputError extends Block<FormInputErrorProps> {
  constructor(props: FormInputErrorProps) {
    super(props)
  }

  render() {
    return this.compile(FormInputErrorTmpl, {...this.props})
  }
}