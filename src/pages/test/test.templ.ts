import Block from '../../core/Block'
import tmpl from './test.hbs'

export class Test extends Block<T> {
  constructor(props) {
    super(props)
    debugger
  }
  render() {
    return this.compile(tmpl, { ...this.props })
  }
}
