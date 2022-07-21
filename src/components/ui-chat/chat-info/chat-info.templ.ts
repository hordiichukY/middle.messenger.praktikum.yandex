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
  menuIsOpen?: string
}

export class ChatInfo extends Block<ChatInfoProps> {
  constructor(props: ChatInfoProps) {
    super(props)
    this.props.menuIsOpen = ''
  }

  initChildren(): void {
    this.children.openMenuBtn = new Button({
      class: 'chat-menu__button',
      events: {
        click: () => {
          this.props.menuIsOpen = this.props.menuIsOpen ? '' : 'open'
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
          this.children.addUserModal.setProps({ shown: 'shown' })
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
          this.children.deleteUserModal.setProps({ shown: 'shown' })
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
      shown: '',
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
      shown: '',
      action: 'delete-user',
    })
  }

  closeMenu = () => (this.props.menuIsOpen = '')

  render() {
    return this.compile(chatInfoTmpl, { ...this.props })
  }
}
