import buttonTmpl from './button.hbs';
import Block from '../../utils/block';

type ButtonProps = {
  class?: string
  type?: string, 
  title?: string,
  events?: {
    click?: (event?: Event) => void, 
    submit?: (event?: Event) => void,
  } 
}

export class Button extends Block<ButtonProps> {
  render() {
    return this.compile(buttonTmpl, {...this.props})
  }
}