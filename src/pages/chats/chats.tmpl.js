import Handlebars from 'handlebars';
import chatsPageTmpl from './chats.hbs';
import { ChatSidebar } from '../../components/chat-sidebar';
import { chatList } from '../../helpers/chat-variables';

const chatsPageData = {
  chatList: chatList,
};

export const getChatsPageHTML = () => {
  Handlebars.registerPartial('sidebar', ChatSidebar(chatsPageData));

  return chatsPageTmpl();
};
