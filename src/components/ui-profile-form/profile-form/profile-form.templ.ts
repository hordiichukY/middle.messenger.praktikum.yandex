import profileFormTmpl from './profile-form.hbs';
import { FormInputProps } from '../../ui-form/form-input';
import { ProfileFormField } from '../profile-form-field';
import { Button} from '../../button';
import { Link } from '../../link';
import Block from '../../../utils/block'

type profileFormData =  {
  avatarSrc: string, 
  userName: string, 
  profileInputProps: FormInputProps[],
}
type inputsValidation = Record<string, boolean>

const inputsValidationStatus: inputsValidation = {};
let formIsValid = false; 

export class ProfileForm extends Block<profileFormData>{
  validateForm(inputName:string, isValid:boolean) {
    inputsValidationStatus[inputName] = isValid;
    formIsValid = Object.values(inputsValidationStatus).every(value => value);
    if (this.children.buttonChangeData instanceof Block) {
      if(formIsValid) {
        this.children.buttonChangeData.setProps({class: ""})
      } else {
        this.children.buttonChangeData.setProps({class: "disabled"})
      }
    }
  }

  activateInputs() {
    const inputs = Array.from(document.getElementsByTagName("input")); 
    inputs.forEach(input => input.disabled = false)
    if(this.children.link instanceof Block &&
      this.children.buttonChangePass instanceof Block
    ) {
      this.children.buttonChangeData.setProps({
        type: 'submit',
        title: 'Save data'
      })
      
      this.children.link.hide()
      this.children.buttonChangePass.hide()  
    }
    
  }

  
  initChildren(){
    // todo cancel button 
    this.children.buttonChangeData = new Button({
      class: 'button_is-small',
      type: 'button',
      title: 'Change data',
      events: {
        click: () => this.activateInputs()
      }
    })
    
    this.children.buttonChangePass = new Button({
      class: 'button_is-small',
      type: 'button',
      title: 'Change password',
    })
    
    this.children.link = new Link({
      class: 'link',
      href: '/login',
      title: 'Logout',
    });
    
    this.children.fields = this.props.profileInputProps
      .map(props => {
        inputsValidationStatus[props.name] = false; 
        return new ProfileFormField({
            id: props.id,
            label: props.label,
            inputProps: props, 
            validateForm: this.validateForm.bind(this)
          })
      } 
    ); 
  }
  
  render() {
    return this.compile(profileFormTmpl, {...this.props})
  }
}