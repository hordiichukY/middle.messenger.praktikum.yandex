import infoTmpl from './info.hbs';
import { Link } from '../link';
import Block from '../../utils/block';

type InfoPageProps  = {
  title: string, 
  text: string
}

export class InfoPage extends Block<InfoPageProps> {
  constructor(props: InfoPageProps) {
    super(props)
  }

  initChildren(): void {
    this.children.link = new Link({
      class: 'link link_is-white',
      href: '/chats',
      title: 'Back to chats',
    })
  }

  render() {
    return this.compile(infoTmpl, {...this.props})
  }
};
