import infoTmpl from './info.hbs'
import Block from '../../core/Block'

type InfoPageProps = {
  title: string
  text: string
}
export class InfoPage extends Block<InfoPageProps> {
  render() {
    return this.compile(infoTmpl, { ...this.props })
  }
}
