/* eslint-disable no-case-declarations */
import modalTmpl from './modal.hbs';
import Block from '../../core/Block';
import { Button, ButtonProps } from '../button';
import { Link, LinkProps } from '../link';
import { FormInputProps } from '../ui-form/form-input';
import { ModalFormField } from '../ui-form/modal-form-field';
import ChatsController from '../../controllers/ChatsController';

type ModalProps = {
  title: string;
  buttonProps: ButtonProps;
  linkProps: LinkProps;
  inputProps: FormInputProps;
  isShown: boolean;
  action: string;
  modalNotification?: string;
  isNotififcationShown?: boolean;
  result?: string;
};

export class Modal extends Block<ModalProps> {
  inputValue = '';
  requestActionsDelay = 1100;

  constructor(props: ModalProps) {
    super(props);
    this.props.modalNotification = '';
    this.props.isNotififcationShown = false;
    this.props.result = '';
  }

  initChildren(): void {
    this.children.buttonSubmit = new Button({
      class: 'button button_is-small modal__button',
      disabled: true,
      type: 'submit',
      ...this.props.buttonProps,
      events: {
        click: () => {
          event?.preventDefault();
          this.handleClick(this.props.action);
        },
      },
    });

    this.children.linkCancel = new Link({
      class: 'link modal__link',
      ...this.props.linkProps,
      events: {
        click: () => this.cancel(),
      },
    });

    this.children.input = new ModalFormField({
      ...this.props.inputProps,
      events: {
        input: () => {
          const isInputValid = this.validateInputValue();
          if (!isInputValid) {
            this.disableSubmitButton();
            return;
          }
          this.activateSubmitButton();
          this.inputValue = this.getInputElement().value;
        },
        blur: () => {
          const isInputValid = this.validateInputValue();
          if (!isInputValid) {
            this.disableSubmitButton();
            return;
          }
          this.activateSubmitButton();
          this.inputValue = this.getInputElement().value;
        },
      },
    });
  }

  handleClick(action: string) {
    switch (action) {
      case 'create-chat':
        const createChatPromise = ChatsController.createChat({
          title: this.inputValue,
        });
        createChatPromise
          .then(() => {
            this.successRequstActions();
          })
          .catch(() => {
            this.failRequestActions();
          });
        break;
      case 'add-user':
        const addUserPromise = ChatsController.addUser(this.inputValue);
        addUserPromise
          .then(() => {
            this.successRequstActions();
          })
          .catch(() => {
            this.failRequestActions();
          });

        break;
      case 'delete-user':
        const deleteUserPromise = ChatsController.deleteUser(this.inputValue);
        deleteUserPromise
          .then(() => {
            this.successRequstActions();
          })
          .catch(() => {
            this.failRequestActions();
          });
        break;
    }
  }

  successRequstActions() {
    this.showSuccessNotification();
    if (this.children.buttonSubmit instanceof Block) {
      this.children.buttonSubmit.setProps({
        disabled: true,
      });
    }
    setTimeout(() => {
      this.props.isShown = false;
      this.resetInputValue();
      this.hideNotification();
    }, this.requestActionsDelay);
  }

  failRequestActions() {
    this.showFailNotification();
    setTimeout(() => {
      this.hideNotification();
    }, this.requestActionsDelay);
  }

  showSuccessNotification() {
    this.props.modalNotification = 'Success!';
    this.props.isNotififcationShown = true;
    this.props.result = 'success';
  }

  showFailNotification() {
    this.props.modalNotification = 'Fail!';
    this.props.isNotififcationShown = true;
    this.props.result = 'failure';
  }

  hideNotification() {
    this.props.isNotififcationShown = false;
  }

  validateInputValue() {
    const input = this.getInputElement();
    if (!input || !input.value.trim()) {
      return false;
    }
    return true;
  }

  disableSubmitButton() {
    if (this.children.buttonSubmit instanceof Block) {
      this.children.buttonSubmit.setProps({
        disabled: true,
      });
    }
  }

  activateSubmitButton() {
    if (this.children.buttonSubmit instanceof Block) {
      this.children.buttonSubmit.setProps({
        disabled: false,
      });
    }
  }

  getInputElement() {
    return document.querySelector(
      `input[name='${this.props.inputProps.name}'`
    ) as HTMLInputElement;
  }

  cancel() {
    this.props.isShown = false;
    this.disableSubmitButton();
    this.resetInputValue();
  }

  resetInputValue() {
    const input = this.getInputElement();
    input.value = '';
    this.inputValue = '';
  }

  render() {
    return this.compile(modalTmpl, { ...this.props });
  }
}
