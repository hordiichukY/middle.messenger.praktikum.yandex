import chatItemTmpl from './chat-item.hbs'
import Block from '../../../core/Block'

export type ChatItemProps = {
  chatAvatar?: URL | string
  name: string
  text: string
  datetime: string
  time: string
  unread?: number
}

export class ChatItem extends Block<ChatItemProps> {
  render() {
    return this.compile(chatItemTmpl, { ...this.props })
  }
}
