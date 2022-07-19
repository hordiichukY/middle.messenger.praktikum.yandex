import AvatarTmpl from './avatar.hbs'
import Block from '../../../core/Block'
import { Button } from '../../button'
import { Link } from '../../link'
import { AvatarInput } from '../avatar-input'
import UserController from '../../../controllers/UserController'
import { URLS } from '../../../variables/api'

type AvatarProps = {
  editMode: string
  resoursePath: string
}

export class AvatarBlock extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props)
    this.props.editMode = 'not-edit-mode'
  }

  validateForm(fileList: FileList) {
    if (fileList && fileList.length > 0) {
      this.children.changeAvatarSubmitBtn.setProps({
        class: 'button_is-small is-submit-change-avatar',
      })
    }
  }

  initChildren(): void {
    this.children.changeAvatarBtn = new Button({
      class: 'button_is-small is-change-avatar',
      type: 'button',
      title: 'Change avatar',
      events: {
        click: () => {
          this.props.editMode = 'edit-mode'
        },
      },
    })
    this.children.changeAvatarSubmitBtn = new Button({
      class: 'button_is-small is-submit-change-avatar disabled',
      type: 'submit',
      title: 'Save',
      events: {
        click: () => {
          event?.preventDefault()
          this.changeAvatar()
        },
      },
    })
    this.children.changeAvatarCancel = new Link({
      class: 'link avatar__cancel',
      title: 'Cancel',
      events: {
        click: () => {
          this.props.editMode = 'not-edit-mode'
          this.children.changeAvatarSubmitBtn.setProps({
            class: 'button_is-small is-submit-change-avatar disabled',
          })
        },
      },
    })

    this.children.avatarInput = new AvatarInput({
      value: '',
      events: {
        change: async (event: Event) => {
          this.validateForm(
            (event?.target as HTMLInputElement).files as FileList
          )
        },
      },
    })
  }

  changeAvatar() {
    const fileElement = document.getElementById('avatar') as HTMLInputElement
    if (!fileElement) {
      return
    }
    if (fileElement.files?.length === 0) {
      alert('please choose a file')
      return
    }

    const file = (fileElement.files as FileList)[0]

    const formData = new FormData()
    formData.append('avatar', file)

    const promise = UserController.changeAvatar(formData)

    promise
      .then(() => {
        this.props.editMode = 'not-edit-mode'
        this.children.changeAvatarSubmitBtn.setProps({
          class: 'button_is-small is-submit-change-avatar disabled',
        })
      })
      .catch((e) => {
        throw new Error(e)
      })
  }

  render() {
    this.props.resoursePath = `${URLS.RESOURCES_URL}`
    return this.compile(AvatarTmpl, { ...this.props })
  }
}
