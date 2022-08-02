import chatSidebarTmpl from './chat-sidebar.hbs';
import { ChatNav } from '../chat-nav';
import { ChatItemProps } from '../chat-item';
import ChatItem from '../chat-item';
import Block from '../../../core/Block';
import ChatsController from '../../../controllers/ChatsController';
import { StoreEvents } from '../../../core/Store';
import Store from '../../../core/Store';

export type ChatSidebarProps = {
  chats?: ChatItemProps[];
};

export class ChatSidebarBlock extends Block<ChatSidebarProps> {
  constructor(props: ChatSidebarProps) {
    super(props);
    ChatsController.init();
    Store.on(StoreEvents.Updated, () => {
      this.setChats();
    });
  }

  initChildren() {
    this.children.navigation = new ChatNav({}) as Block;
    this.setChats();
  }

  setChats() {
    if (this.props.chats?.length) {
      this.children.chats = this.props.chats.map(
        (props) =>
          new ChatItem({
            ...props,
          })
      );
    }
  }

  render() {
    return this.compile(chatSidebarTmpl, { ...this.props });
  }
}
