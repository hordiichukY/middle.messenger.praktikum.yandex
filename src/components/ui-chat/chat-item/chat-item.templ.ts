import chatItemTmpl from './chat-item.hbs';
import Block from '../../../core/Block';
import { URLS } from '../../../variables/api';
import ChatsController from '../../../controllers/ChatsController';

export type ChatItemProps = {
  activeChatId?: number;
  resoursePath?: string;
  avatar: string;
  created_by?: number;
  id: number;
  title: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
  events?: {
    click?: (event: Event) => void;
  };
  class?: string;
};

export class ChatItemBlock extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props);
    this.props.resoursePath = `${URLS.RESOURCES_URL}`;
    this.props.events = {
      click: (event: Event) => {
        event.stopPropagation();
        if (this.props.activeChatId !== props.id) {
          ChatsController.setActiveChatId(props.id);
          this.props.class = 'is-active';
        }
      },
    };
    this.props.class = props.id === this.props.activeChatId ? 'is-active' : '';
  }
  render() {
    return this.compile(chatItemTmpl, { ...this.props });
  }
}
