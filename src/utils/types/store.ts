import { User } from '../../utils/types/userData'
import { Chat } from '../../utils/types/chatData'

interface CurrentUser extends User {
  isLoading?: boolean
}

export interface StoreData {
  currentUser?: CurrentUser
  chats?: Chat[]
}
