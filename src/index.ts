import { default as LoginPage } from '../src/pages/login'
import { default as RegistrationPage } from '../src/pages/registration'
import { default as ProfilePage } from '../src/pages/profile'
import ChatsPage from '../src/pages/chats'
import { NotFoundPage } from '../src/pages/not-found'
import { ServerError } from '../src/pages/server-error'
import Router from './core/Router'
import AuthController from './controllers/AuthController'
import { navigation } from './variables/navigation'
import store from './core/Store'

const { signIn, signUp, settings, messenger, notFound, serverError, other } =
  navigation

document.addEventListener('DOMContentLoaded', async () => {
  Router.use(signIn, LoginPage)
    .use(signUp, RegistrationPage)
    .use(settings, ProfilePage)
    .use(messenger, ChatsPage)
    .use(notFound, NotFoundPage)
    .use(serverError, ServerError)
    .use(other, NotFoundPage)
    .start()

  try {
    await AuthController.getUser()
    console.log(store.getState().currentUser)
    // Router.go(messenger)
  } catch (e) {
    // Router.go(signIn)
    console.log('Error fetching user')
  }
})
