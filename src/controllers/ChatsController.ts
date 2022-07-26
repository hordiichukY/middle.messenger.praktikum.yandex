import { ChatsAPI } from '../api/ChatsAPI'
import Store, { StoreEvents } from '../core/Store'
import { WS, WSEvents, WS_READY_STATE } from '../core/WS'
import {
  ChatCreationRequest,
  ChatMessageProps,
  WsMessage,
} from '../utils/types/chatData'
import { URLS } from '../variables/api'
import UserController from './UserController'

class ChatsController {
  private api: ChatsAPI
  private chatsWS: Record<number, WS>
  constructor() {
    this.api = new ChatsAPI()
    this.chatsWS = {}
  }

  async init() {
    Store.set('chatMessages', {})

    const chats = await this.getChats()
    if (Array.isArray(chats)) {
      this.chatsWS = {}
      await Promise.all(
        chats.map((chat) => {
          this.openSocket(chat.id)
        })
      )
    }
  }

  async openSocket(chatId: number) {
    const token = await this.getChatToken(chatId)
    if (!chatId || chatId in this.chatsWS || !token) {
      return
    }
    const userId = await this.getCurrentUserId()
    if (!userId || !token) {
      return
    }
    try {
      const wsURL = `${URLS.WS_CHATS}/${userId}/${chatId}/${token}`
      const chatWS = new WS(wsURL, chatId)
      this.chatsWS[chatId] = chatWS
      const pingInterval = 59000
      const interval = setInterval(async () => {
        if (chatWS.getReadyState === WS_READY_STATE.OPEN) {
          chatWS.sendPingMessage()
        } else {
          clearInterval(interval)
          await this.openSocket(chatId)
        }
      }, pingInterval)
      chatWS.on(WSEvents.OPEN, this.onOpenChatWS.bind(this, chatId))
      chatWS.on(WSEvents.MESSAGE, this.onMessageChatWS.bind(this))
      chatWS.on(WSEvents.CLOSED, this.onCloseChatWS.bind(this, chatId))
    } catch (e) {
      console.error(e.message)
    }
  }

  async onOpenChatWS(chatId: number) {
    Store.set('chatMessages', {})
    await this.chatsWS[chatId].getOldMessages()
  }

  onCloseChatWS(chatId: number) {
    delete this.chatsWS[chatId]
    const timer = setTimeout(async () => {
      await this.openSocket(chatId)
      clearTimeout(timer)
    }, 5000)
  }

  onMessageChatWS(data: WsMessage) {
    console.log('WS next message', data)
    if (
      !data.chatId ||
      !data.message ||
      (data.message &&
        ['pong', 'user connected'].includes(
          (data.message as ChatMessageProps).type
        ))
    )
      return

    if (Array.isArray(data.message) && data.message.length) {
      data.message.reverse().forEach((message: ChatMessageProps) => {
        if (message.content) {
          this.addMessageToChat(message, data.chatId)
        }
      })
    }

    if ('content' in data.message && data.message.content) {
      this.addMessageToChat(data.message, data.chatId)
    }
  }

  addMessageToChat(message: ChatMessageProps, chatId: number) {
    const state = Store.getState()

    if (!state.chatMessages) {
      state.chatMessages = {}
    }

    if (!state.chatMessages[chatId]) {
      state.chatMessages[chatId] = []
    }

    const currentMessages = state.chatMessages[chatId]
    const newMessages = [...currentMessages, message]

    state.chatMessages = {
      ...state.chatMessages,
      ...{ [chatId]: newMessages },
    }
    Store.emit(StoreEvents.Updated)
  }

  async getChats() {
    let chats
    try {
      chats = await this.api.getChats()
      if (Array.isArray(chats)) {
        Store.set('chats', chats)
        chats.forEach((chat: any) => {
          Store.set(`chatMessages.${chat?.id}`, [])
        })
      }
    } catch (e) {
      throw new Error(e?.reason)
    }

    return chats
  }

  async createChat(data: ChatCreationRequest) {
    try {
      const response = await this.api.createChat(data)
      if (response) {
        this.init()
      }
    } catch (e) {
      throw new Error(e?.reason)
    }
  }

  async addUser(login: string) {
    const userId = await UserController.searchUser(login)
    const activeChatId = Store.getState().activeChatId
    try {
      if (!userId || !activeChatId) {
        return
      }
      await this.api.addUser({
        users: [userId],
        chatId: activeChatId,
      })
    } catch (e) {
      throw new Error(e?.reason)
    }
  }

  async deleteUser(login: string) {
    const userId = await UserController.searchUser(login)
    const activeChatId = Store.getState().activeChatId
    try {
      if (!userId || !activeChatId) {
        return
      }
      await this.api.deleteUser({
        users: [userId],
        chatId: activeChatId,
      })
    } catch (e) {
      throw new Error(e?.reason)
    }
  }

  async getChatToken(id: number) {
    let token
    try {
      const response = await this.api.getChatToken(id)

      if (typeof response !== 'string') {
        token = response?.token
      }
    } catch (e) {
      throw new Error(e?.reason)
    }

    return token
  }

  setActiveChatId(id: number) {
    Store.set('activeChatId', id)
  }

  getActiveChatId() {
    return Store.getState().activeChatId
  }

  getCurrentUserId() {
    return Store.getState().currentUser?.id
  }

  sendMessage(content: string) {
    const activeChatId = this.getActiveChatId()
    if (activeChatId) {
      this.chatsWS[activeChatId].sendMessage(content)
    }
  }
}

export default new ChatsController()
