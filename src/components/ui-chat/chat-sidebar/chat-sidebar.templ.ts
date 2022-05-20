import chatSidebarTmpl from './chat-sidebar.hbs';
import { ChatNav } from '../chat-nav';
import { ChatItem, ChatItemProps } from '../chat-item';
import Block from '../../../utils/block';

export type ChatSidebarProps =  {
  chatProps: ChatItemProps[]
}

export class ChatSidebar extends Block<ChatSidebarProps> {
  constructor(props: ChatSidebarProps) {
    super(props)
  }
  initChildren() {
    this.children.navigation = new ChatNav({}); 
    this.children.chats = this.props.chatProps
      .map(props => new ChatItem({
        ...props
      }))
  }

  render() {
    return this.compile(chatSidebarTmpl, {...this.props})
  }
}

