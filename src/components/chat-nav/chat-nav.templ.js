import Handlebars from 'handlebars';
import chatNavTmpl from './chat-nav.hbs';
import { Link } from '../link';

export const ChatNav = () => {
  Handlebars.registerPartial(
    'link',
    Link({
      class: 'link chat-nav__link',
      href: '/profile',
      title: 'Profile',
    })
  );

  return chatNavTmpl();
};
