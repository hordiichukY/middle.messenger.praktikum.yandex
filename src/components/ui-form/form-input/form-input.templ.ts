import formInputTmpl from './form-input.hbs';
import Block from '../../../core/Block';
import { User, UserFieldsKeys } from '../../../utils/types/userData';

export type FormInputProps = {
  currentUser?: User;
  id: string;
  type?: string;
  name: string;
  placeholder?: string;
  required?: string;
  error?: string;
  label?: string;
  disabled?: string;
  value?: string;
  events?: {
    focus?: (event?: Event) => void;
    blur?: (event?: Event) => void;
    input?: (event?: Event) => void;
  };
};

export class FormInputBlock extends Block<FormInputProps> {
  constructor(props: FormInputProps) {
    super(props);
    this.checkInputValue();
  }

  checkInputValue() {
    const currentUser = this.props?.currentUser;
    if (!currentUser) {
      return;
    }
    const inputName = this.props.name as UserFieldsKeys;
    if (currentUser[inputName]) {
      this.props.value = `${currentUser[inputName]}`;
    }
  }

  render() {
    return this.compile(formInputTmpl, { ...this.props });
  }
}
