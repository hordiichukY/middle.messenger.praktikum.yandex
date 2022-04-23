import Handlebars from 'handlebars';
import chatSidebarTmpl from './chat-sidebar.hbs';
import { ChatNav } from '../chat-nav';
import { ChatItem } from '../chat-item';

export const ChatSidebar = ({ chatList }) => {
  Handlebars.registerPartial('navigation', ChatNav);
  Handlebars.registerPartial('chat', ChatItem);

  return chatSidebarTmpl({ chatList });
};
