import Block from '../../../core/Block'
import { Button } from '../../button'
import FormInput from '../../ui-form/form-input'
import chatFormTmpl from './chat-form.hbs'
import ChatsController from '../../../controllers/ChatsController'

type ChatFormProps = {}

export class ChatForm extends Block<ChatFormProps> {
  constructor(props: ChatFormProps) {
    super(props)
  }

  initChildren(): void {
    this.children.input = new FormInput({
      id: 'message',
      type: 'text',
      name: 'message',
      placeholder: 'Send message',
      required: 'required',
      events: {
        input: () => {
          const isFormValid = this.validateForm()
          if (!(this.children.submitBtn instanceof Block)) {
            return
          }
          if (isFormValid) {
            this.children.submitBtn.setProps({ class: 'chat-form__button' })
          } else {
            this.children.submitBtn.setProps({
              class: 'chat-form__button disabled',
            })
          }
        },
      },
    })

    this.children.submitBtn = new Button({
      type: 'submit',
      class: 'chat-form__button disabled',
      events: {
        click: (event: Event) => {
          event.preventDefault()
          const input = document.querySelector(
            'input[name="message"]'
          ) as HTMLInputElement

          ChatsController.sendMessage(input.value)
          input.value = ''
        },
      },
    })
  }

  validateForm() {
    const input = document.querySelector(
      'input[name="message"]'
    ) as HTMLInputElement
    if (input && input.value.trim()) {
      return true
    }
    return false
  }

  render() {
    return this.compile(chatFormTmpl, { ...this.props })
  }
}
