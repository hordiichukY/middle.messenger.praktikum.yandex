import chatsPageTmpl from './chats.hbs'
import { ChatSidebar } from '../../components/ui-chat/chat-sidebar'
import { chatList } from '../../variables/chat-variables'
import Block from '../../core/Block'

export class ChatsPage extends Block {
  initChildren() {
    this.children.sidebar = new ChatSidebar({
      chatProps: chatList,
    })
  }

  render() {
    return this.compile(chatsPageTmpl, {})
  }
}
