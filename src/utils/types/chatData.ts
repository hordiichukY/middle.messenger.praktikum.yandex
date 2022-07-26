export interface Chat {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: {
      first_name: string
      second_name: string
      avatar: string
      email: string
      login: string
      phone: string
    }
    time: string
    content: string
  }
}

type RequestFailure = {
  reason: string
}

type ChatToken = {
  token: 'string'
}

export type ChatAccessRequestBody = {
  users: number[]
  chatId: number
}

export type ChatsResponse = Chat[] | string
export type ChatCreationRequest = {
  title: string
}

export type ChatTokenRequestBody = {
  id: number
}

export type ChatCreationResponse = string | RequestFailure
export type ChatAccessResponse = string | RequestFailure
export type ChatTokenResponse = string | ChatToken

export type ChatMessageProps = {
  chat_id: number
  content: string
  file: null | string
  id: number
  is_read: boolean
  time: string
  type: string
  user_id: number
}

export type WsMessage = {
  chatId: number
  message: ChatMessageProps | ChatMessageProps[]
}
