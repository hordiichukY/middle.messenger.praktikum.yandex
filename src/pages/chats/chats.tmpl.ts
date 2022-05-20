import chatsPageTmpl from './chats.hbs';
import { ChatSidebar } from '../../components/ui-chat/chat-sidebar';
import { chatList } from '../../helpers/chat-variables';
import Block from '../../utils/block';

export class ChatsPage extends Block {
  initChildren(){
    this.children.sidebar = new ChatSidebar({
      chatProps: chatList
    })
  }

  render() {
    return this.compile(chatsPageTmpl, {})
  }
}

