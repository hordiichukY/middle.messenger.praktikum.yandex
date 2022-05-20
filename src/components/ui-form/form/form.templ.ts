import Block from '../../../utils/block';
import formTmpl from './form.hbs';
import { Button} from '../../button';
import { Link, LinkProps } from '../../link';
import { FormField } from '../form-field'
import { FormInputProps } from '../form-input'

type FormData = {
  title: string, 
  buttonTitle: string,
  linkProps: LinkProps,
  inputFieldProps: FormInputProps[],
}
type FormValues = Record<string, string>
type inputsValidation = Record<string, boolean>

const inputsValidationStatus: inputsValidation = {};
let formIsValid = false; 

export class Form extends Block<FormData> {
  
  constructor(props: FormData) {
    super(props);
  }

  validateForm(inputName:string, isValid:boolean) {
    inputsValidationStatus[inputName] = isValid;
    formIsValid = Object.values(inputsValidationStatus).every(value => value);
    if (this.children.button instanceof Block) {
      if(formIsValid) {
        this.children.button.setProps({class: ""})
      } else {
        this.children.button.setProps({class: "disabled"})
      }
    }
  }

  logData() {
    const formData: FormValues = {};
    const inputs = Array.from(document.getElementsByTagName("input"))
    inputs.forEach(input  => {
      formData[input.name] = input.value
    })
    console.log(formData)
  }
  
  initChildren(){
    this.children.button = new Button({
      class: "disabled",
      type: "submit",
      title: this.props.buttonTitle,
      events: {
        click: (event) => {
          this.logData(); 
          event?.preventDefault();
        },
      }
    })
    
    this.children.link = new Link({
      ...this.props.linkProps,
      class: 'link'
    });
    
    this.children.fields = this.props.inputFieldProps
      .map(props => {
        inputsValidationStatus[props.name] = false; 
        return new FormField({ 
            inputProps: props, 
            validateForm: this.validateForm.bind(this),
          })
      } 
    ); 
  }
  
  render() {
    return this.compile(formTmpl, {...this.props})
  }
}
