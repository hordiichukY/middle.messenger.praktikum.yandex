import Block from '../../../core/Block'
import { withStore } from '../../../core/Store'
import { ChatSidebarBlock } from './chat-sidebar.templ'

const ChatSidebar = withStore((state) => ({ ...state }))(
  ChatSidebarBlock as typeof Block
)
export default ChatSidebar
