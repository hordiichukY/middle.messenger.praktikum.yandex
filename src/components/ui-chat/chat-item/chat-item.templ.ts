import chatItemTmpl from './chat-item.hbs';
import Block from '../../../utils/block'

export type ChatItemProps = {
  chatAvatar?: URL | string,
  name: string, 
  text: string, 
  datetime: string, 
  time: string,
  unread?: number
}

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props)
  }

  render() {
    return this.compile(chatItemTmpl, {...this.props})
  }
}
