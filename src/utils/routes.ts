import { LoginPage } from '../pages/login'; 
import { RegistrationPage } from '../pages/registration'
import { ProfilePage } from '../pages/profile'
import { ChatsPage } from '../pages/chats'
import { NotFoundPage } from '../pages/not-found'
import { ServerError } from '../pages/server-error'

export const routes = [
  {
    url: '/',
    renderFunc: () => new LoginPage(),
  },
  {
    url: '/login',
    renderFunc: () => new LoginPage(),
  },
  {
    url: '/registration',
    renderFunc: () => new RegistrationPage(),
  },
  {
    url: '/profile',
    renderFunc: () => new ProfilePage(),
  },
  {
    url: '/chats',
    renderFunc: () => new ChatsPage(),
  },
  {
    url: '/404',
    renderFunc: () => new NotFoundPage(),
  },
  {
    url: '/500',
    renderFunc: () => new ServerError(),
  },
];

export const notFoundPageRoute = {
  url: '/404',
  renderFunc: () => new NotFoundPage(),
}
