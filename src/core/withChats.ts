import { withStore } from './Store'
export const withChats = withStore((state) => ({
  chats: { ...state.chats },
}))
