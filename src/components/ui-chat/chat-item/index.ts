import Block from '../../../core/Block';
import { withStore } from '../../../core/Store';
import { ChatItemBlock } from './chat-item.templ';
export { ChatItemProps } from './chat-item.templ';

const ChatItem = withStore((state) => ({
  activeChatId: state.activeChatId,
}))(ChatItemBlock as typeof Block);
export default ChatItem;
