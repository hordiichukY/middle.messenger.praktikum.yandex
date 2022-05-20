import formInputTmpl from './form-input.hbs';
import Block from '../../../utils/block';

export type FormInputProps  = {
  id?: string
  type?: string, 
  name: string, 
  placeholder?: string, 
  required?: string, 
  error? : string, 
  value?: string,
  label?:string,
  disabled?: string,
  events?: {
    focus?: (event?: Event) => void,
    blur?: (event?: Event) => void,
    input?: (event?: Event) => void,
  }
}

export class FormInput extends Block<FormInputProps> {
  constructor(props: FormInputProps) {
    super(props)
  }
  render() {
    return this.compile(formInputTmpl, {...this.props})
  }
}