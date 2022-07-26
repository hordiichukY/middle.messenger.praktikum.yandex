import chatSidebarTmpl from './chat-sidebar.hbs';
import { ChatNav } from '../chat-nav';
import { ChatItem, ChatItemProps } from '../chat-item';
import Block from '../../../core/Block';
import ChatsController from '../../../controllers/ChatsController';

export type ChatSidebarProps = {
  chats?: ChatItemProps[];
  activeChatId?: number;
};

export class ChatSidebarBlock extends Block<ChatSidebarProps> {
  constructor(props: ChatSidebarProps) {
    super(props);
    ChatsController.init();
  }

  initChildren() {
    this.children.navigation = new ChatNav({});
  }

  render() {
    if (this.props.chats) {
      this.children.chats = this.props.chats.map(
        (props) =>
          new ChatItem({
            ...props,
            events: {
              click: (event: Event) => {
                event.stopPropagation();
                ChatsController.setActiveChatId(props.id);
              },
            },
            class: props.id === this.props.activeChatId ? 'is-active' : '',
          })
      );
    }
    return this.compile(chatSidebarTmpl, { ...this.props });
  }
}
