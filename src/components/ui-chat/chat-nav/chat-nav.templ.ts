import chatNavTmpl from './chat-nav.hbs';
import { Link } from '../../link';
import Block from '../../../utils/block';

export class ChatNav extends Block {
  initChildren(): void {
    this.children.link = new Link({
      class: 'link chat-nav__link',
      href: '/settings',
      title: 'Profile',
    })
  }

  render() {
    return this.compile(chatNavTmpl, {})
  }
}

