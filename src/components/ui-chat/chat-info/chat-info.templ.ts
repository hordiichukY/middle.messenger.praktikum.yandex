import Block from '../../../core/Block'
import {
  addUserInputProps,
  deleteUserInputProps,
} from '../../../variables/chat-variables'
import { Button } from '../../button'
import { Modal } from '../../modal'
import chatInfoTmpl from './chat-info.hbs'

type ChatInfoProps = {
  title: string
  isMenuOpen?: boolean
}

export class ChatInfo extends Block<ChatInfoProps> {
  constructor(props: ChatInfoProps) {
    super(props)
    this.props.isMenuOpen = false
  }

  initChildren(): void {
    this.children.openMenuBtn = new Button({
      class: 'chat-menu__button',
      events: {
        click: () => {
          this.props.isMenuOpen = this.props.isMenuOpen ? false : true
        },
      },
    })

    this.children.addUserBtn = new Button({
      class: 'chat-menu__user-btn is-add',
      title: 'Add user',
      events: {
        click: () => {
          if (!(this.children.addUserModal instanceof Block)) {
            return
          }
          this.children.addUserModal.setProps({ isShown: true })
          this.closeMenu()
        },
      },
    })

    this.children.deleteUserBtn = new Button({
      class: 'chat-menu__user-btn is-delete',
      title: 'Delete user',
      events: {
        click: () => {
          if (!(this.children.deleteUserModal instanceof Block)) {
            return
          }
          this.children.deleteUserModal.setProps({ isShown: true })
          this.closeMenu()
        },
      },
    })

    this.children.addUserModal = new Modal({
      title: 'Add user',
      buttonProps: {
        title: 'Submit',
      },
      linkProps: {
        title: 'Cancel',
      },
      inputProps: {
        ...addUserInputProps,
      },
      isShown: false,
      action: 'add-user',
    })

    this.children.deleteUserModal = new Modal({
      title: 'Delete user',
      buttonProps: {
        title: 'Submit',
      },
      linkProps: {
        title: 'Cancel',
      },
      inputProps: {
        ...deleteUserInputProps,
      },
      isShown: false,
      action: 'delete-user',
    })
  }

  closeMenu = () => (this.props.isMenuOpen = false)

  render() {
    return this.compile(chatInfoTmpl, { ...this.props })
  }
}
