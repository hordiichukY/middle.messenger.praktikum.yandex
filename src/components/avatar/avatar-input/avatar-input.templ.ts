import Block from '../../../core/Block'
import AvatarInputTmpl from './avatar-input.hbs'

export class AvatarInput extends Block {
  render() {
    return this.compile(AvatarInputTmpl, { ...this.props })
  }
}
