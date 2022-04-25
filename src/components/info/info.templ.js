import Handlebars from 'handlebars';
import infoTmpl from './info.hbs';
import { Link } from '../link';

export const InfoPage = ({ title, text }) => {
  Handlebars.registerPartial(
    'link',
    Link({
      class: 'link link_is-white',
      href: '/chats',
      title: 'Back to chats',
    })
  );

  return infoTmpl({ title, text });
};
