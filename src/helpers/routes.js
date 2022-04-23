import { getLoginPageHTML } from '../pages/login';
import { getRegistrationPageHTML } from '../pages/registration';
import { getProfilePageHTML } from '../pages/profile';
import { getChatsPageHTML } from '../pages/chats';
import { getNotFoundPageHTML } from '../pages/not-found';
import { getServerErrorPageHTML } from '../pages/server-error';

export const routes = [
  {
    url: '/',
    renderFunc: getLoginPageHTML,
  },
  {
    url: '/login',
    renderFunc: getLoginPageHTML,
  },
  {
    url: '/registration',
    renderFunc: getRegistrationPageHTML,
  },
  {
    url: '/profile',
    renderFunc: getProfilePageHTML,
  },
  {
    url: '/chats',
    renderFunc: getChatsPageHTML,
  },
  {
    url: '/404',
    renderFunc: getNotFoundPageHTML,
  },
  {
    url: '/500',
    renderFunc: getServerErrorPageHTML,
  },
];
