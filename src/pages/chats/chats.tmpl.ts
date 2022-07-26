import chatsPageTmpl from './chats.hbs'
import ChatSidebar from '../../components/ui-chat/chat-sidebar'
import Block from '../../core/Block'
import { ChatInfo } from '../../components/ui-chat/chat-info/chat-info.templ'
import { ChatItemProps } from '../../components/ui-chat/chat-item'
import { ChatForm } from '../../components/ui-chat/chat-form'
import { ChatMessage } from '../../components/ui-chat/chat-message'
import { User } from '../../utils/types/userData'
import { ChatMessageProps } from '../../utils/types/chatData'

type ChatsPageProps = {
  activeChatId?: number
  chats?: ChatItemProps[]
  chatMessages?: Record<number, ChatMessageProps[]>
  hasMessages: boolean
  currentUser?: User
}

export class ChatsPageBlock extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super(props)
    this.props.hasMessages = false
  }

  initChildren() {
    this.children.sidebar = new ChatSidebar({})
    this.children.sendMessageForm = new ChatForm({})
  }

  renderChatInfo(chats: ChatItemProps[]) {
    const activeChat = chats.find(
      (chat) => chat.id === this.props.activeChatId
    ) as ChatItemProps

    this.children.chatInfo = new ChatInfo({
      title: activeChat.title,
    })
  }

  renderMessages(messages: ChatMessageProps[]) {
    this.children.messages = messages
      .filter(({ content }) => content)
      .map((message) => {
        const isCurrentUserMessage =
          this.props.currentUser?.id === message?.user_id

        return new ChatMessage({ message, isCurrentUserMessage })
      })
  }

  render() {
    const activeChatId = this.props.activeChatId

    if (!activeChatId || !this.props.chats) {
      return this.compile(chatsPageTmpl, { ...this.props })
    }

    this.renderChatInfo(this.props.chats)

    if (!this.props.chatMessages?.[activeChatId]?.length) {
      this.props.hasMessages = false
      return this.compile(chatsPageTmpl, { ...this.props })
    }

    this.props.hasMessages = true

    this.renderMessages(this.props.chatMessages[activeChatId])

    return this.compile(chatsPageTmpl, { ...this.props })
  }
}
