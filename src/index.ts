import { default as LoginPage } from '../src/pages/login';
import { default as RegistrationPage } from '../src/pages/registration';
import { default as ProfilePage } from '../src/pages/profile';
import ChatsPage from '../src/pages/chats';
import { NotFoundPage } from '../src/pages/not-found';
import { ServerError } from '../src/pages/server-error';
import { Router } from './core/Router';
import AuthController from './controllers/AuthController';
import { navigation } from './variables/navigation';

const { signIn, signUp, settings, messenger, notFound, serverError, other } =
  navigation;

const router = new Router();

document.addEventListener('DOMContentLoaded', async () => {
  router
    .use(signIn, LoginPage)
    .use(signUp, RegistrationPage)
    .use(settings, ProfilePage)
    .use(messenger, ChatsPage)
    .use(notFound, NotFoundPage)
    .use(serverError, ServerError)
    .use(other, NotFoundPage);

  try {
    await AuthController.getUser();
  } catch (e) {
    console.log('Error fetching user');
  }

  router.start();
});
