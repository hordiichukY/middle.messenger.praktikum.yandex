import { LoginPage } from '../src/pages/login'
import { RegistrationPage } from '../src/pages/registration'
import { ProfilePage } from '../src/pages/profile'
import { ChatsPage } from '../src/pages/chats'
import { NotFoundPage } from '../src/pages/not-found'
import { ServerError } from '../src/pages/server-error'
import { Router } from './utils/router'

const router = new Router('root')
router
  .use('/', LoginPage)
  .use('/sign-up', RegistrationPage)
  .use('/settings', ProfilePage)
  .use('/messenger', ChatsPage)
  .use('/404', NotFoundPage)
  .use('/500', ServerError)
  .start()
