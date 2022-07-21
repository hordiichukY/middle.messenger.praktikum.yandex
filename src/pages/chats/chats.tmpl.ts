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

  render() {
    const activeChatId = this.props.activeChatId
    if (activeChatId && this.props.chats) {
      const activeChatDetails = this.props.chats.find(
        (chat) => chat.id === activeChatId
      )
      if (activeChatDetails) {
        this.children.chatInfo = new ChatInfo({
          title: activeChatDetails.title,
        })
      }

      if (this.props.chatMessages) {
        const activeChatMessages = this.props.chatMessages[activeChatId]
        if (activeChatMessages.length) {
          ;(this.children.message as any) = activeChatMessages.map(
            (message) => {
              if (message.content) {
                this.props.hasMessages = true
                const isCurrentUserMessage =
                  this.props.currentUser?.id === message?.user_id

                return new ChatMessage({ message, isCurrentUserMessage })
              }
            }
          )
        } else {
          this.props.hasMessages = false
        }
      }
    }
    return this.compile(chatsPageTmpl, { ...this.props })
  }
}
