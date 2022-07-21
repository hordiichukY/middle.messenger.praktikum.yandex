/* eslint-disable no-case-declarations */
import modalTmpl from './modal.hbs'
import Block from '../../core/Block'
import { Button, ButtonProps } from '../button'
import { Link, LinkProps } from '../link'
import { FormInputProps } from '../ui-form/form-input'
import { ModalFormField } from '../ui-form/modal-form-field'
import ChatsController from '../../controllers/ChatsController'

type ModalProps = {
  title: string
  buttonProps: ButtonProps
  linkProps: LinkProps
  inputProps: FormInputProps
  shown: string
  action: string
  modalNotification?: string
  notififcationShown?: string
  result?: string
}

export class Modal extends Block<ModalProps> {
  inputValue = ''

  constructor(props: ModalProps) {
    super(props)
    this.props.modalNotification = ''
    this.props.notififcationShown = ''
    this.props.result = ''
  }

  initChildren(): void {
    this.children.buttonSubmit = new Button({
      class: 'button button_is-small modal__button disabled',
      type: 'submit',
      ...this.props.buttonProps,
      events: {
        click: () => {
          event?.preventDefault()
          this.handleClick(this.props.action)
        },
      },
    })

    this.children.linkCancel = new Link({
      class: 'link modal__link',
      ...this.props.linkProps,
      events: {
        click: () => this.cancel(),
      },
    })

    this.children.input = new ModalFormField({
      ...this.props.inputProps,
      events: {
        input: () => this.validateForm(),
        blur: () => this.validateForm(),
      },
    })
  }

  handleClick(action: string) {
    switch (action) {
      case 'create-chat':
        const createChaatPromise = ChatsController.createChat({
          title: this.inputValue,
        })
        createChaatPromise
          .then(() => {
            this.successRequstActions()
          })
          .catch(() => {
            this.failRequestActions()
          })
        break
      case 'add-user':
        const addUserPromise = ChatsController.addUser(this.inputValue)
        addUserPromise
          .then(() => {
            this.successRequstActions()
          })
          .catch(() => {
            this.failRequestActions()
          })

        break
      case 'delete-user':
        const deleteUserPromise = ChatsController.deleteUser(this.inputValue)
        deleteUserPromise
          .then(() => {
            this.successRequstActions()
          })
          .catch(() => {
            this.failRequestActions()
          })
        break
    }
  }

  successRequstActions() {
    this.showSuccessNotification()
    if (this.children.buttonSubmit instanceof Block) {
      this.children.buttonSubmit.setProps({
        class: 'button button_is-small disabled',
      })
    }
    setTimeout(() => {
      this.props.shown = ''
      this.resetInputValue()
      this.hideNotification()
    }, 1100)
  }

  failRequestActions() {
    this.showFailNotification()
    setTimeout(() => {
      this.hideNotification()
    }, 1100)
  }

  showSuccessNotification() {
    this.props.modalNotification = 'Success!'
    this.props.notififcationShown = 'shown'
    this.props.result = 'success'
  }

  showFailNotification() {
    this.props.modalNotification = 'Fail!'
    this.props.notififcationShown = 'shown'
    this.props.result = 'failure'
  }

  hideNotification() {
    this.props.notififcationShown = ''
  }

  validateForm() {
    const input = this.getInputElement()
    if (!input || !input.value.trim()) {
      if (this.children.buttonSubmit instanceof Block) {
        this.children.buttonSubmit.setProps({
          class: 'button button_is-small disabled',
        })
      }
      return
    }
    if (this.children.buttonSubmit instanceof Block) {
      this.children.buttonSubmit.setProps({
        class: 'button button_is-small',
      })
    }
    this.inputValue = input.value
  }

  getInputElement() {
    return document.querySelector(
      `input[name='${this.props.inputProps.name}'`
    ) as HTMLInputElement
  }

  cancel() {
    this.props.shown = ''
    if (this.children.buttonSubmit instanceof Block) {
      this.children.buttonSubmit.setProps({
        class: 'button button_is-small disabled',
      })
    }

    this.resetInputValue()
  }

  resetInputValue() {
    const input = this.getInputElement()
    input.value = ''
    this.inputValue = ''
  }

  render() {
    return this.compile(modalTmpl, { ...this.props })
  }
}
