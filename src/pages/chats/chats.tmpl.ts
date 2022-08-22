import chatsPageTmpl from './chats.hbs';
import ChatSidebar from '../../components/ui-chat/chat-sidebar';
import Block from '../../core/Block';
import { ChatInfo } from '../../components/ui-chat/chat-info/chat-info.templ';
import { ChatItemProps } from '../../components/ui-chat/chat-item';
import { ChatForm } from '../../components/ui-chat/chat-form';
import { ChatMessage } from '../../components/ui-chat/chat-message';
import { User } from '../../utils/types/userData';
import { ChatMessageProps } from '../../utils/types/chatData';
import Store, { StoreEvents } from '../../core/Store';

type ChatsPageProps = {
  activeChatId?: number;
  chats?: ChatItemProps[];
  chatMessages?: Record<number, ChatMessageProps[]>;
  hasMessages: boolean;
  currentUser?: User;
};

export class ChatsPageBlock extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super(props);
    this.props.hasMessages = false;
    Store.on(StoreEvents.Updated, () => {
      this.handleStoreUpdate();
    });
  }

  initChildren() {
    this.children.sidebar = new ChatSidebar({});
    this.children.sendMessageForm = new ChatForm({});
    this.children.chatInfo = new ChatInfo({
      title: '',
    });
  }

  updateChatTitle(chats: ChatItemProps[], activeChatId: number) {
    const activeChat = chats.find(
      (chat) => chat.id === activeChatId
    ) as ChatItemProps;

    (this.children.chatInfo as Block).setProps({ title: activeChat.title });
  }

  renderMessages(messages: ChatMessageProps[]) {
    this.children.messages = messages
      .filter(({ content }) => content)
      .map((message) => {
        const isCurrentUserMessage =
          this.props.currentUser?.id === message?.user_id;

        return new ChatMessage({ message, isCurrentUserMessage });
      });
  }

  handleStoreUpdate() {
    const activeChatId = Store.getState().activeChatId;

    if (!activeChatId || !this.props.chats) {
      return;
    }

    this.updateChatTitle(this.props.chats, activeChatId);

    const activeChatMessages = Store.getState().chatMessages?.[activeChatId];

    if (!activeChatMessages?.length) {
      this.props.hasMessages = false;
      return;
    }

    this.props.hasMessages = true;
    this.renderMessages(activeChatMessages);
  }

  render() {
    return this.compile(chatsPageTmpl, { ...this.props });
  }
}
