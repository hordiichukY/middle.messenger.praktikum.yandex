import profileFormTmpl from './profile-form.hbs'
import ProfileFormField from '../profile-form-field'
import { Button } from '../../button'
import { Link } from '../../link'
import Block from '../../../core/Block'
import AuthController from '../../../controllers/AuthController'
import {
  profileInputProps,
  profilePasswordProps,
} from '../../../variables/form-variables'
import UserController from '../../../controllers/UserController'
import { ChangePasswordData, UserProfile } from '../../../utils/types/userData'
import { Avatar } from '../../avatar/avatar'

type profileFormData = {
  editMode: string
  changeDataFields: boolean
}
type inputsValidation = Record<string, boolean>

let inputsValidationStatus: inputsValidation = {}
let formIsValid = true

export class ProfileFormBlock extends Block<profileFormData> {
  private oldInputValues: Record<string, string> = {}
  constructor(props: profileFormData) {
    super(props)
    this.props.changeDataFields = true
  }

  initChildren() {
    this.children.buttonChangeData = new Button({
      class: 'button_is-small is-change-data',
      type: 'button',
      title: 'Change data',
      events: {
        click: () => {
          this.props.changeDataFields = true
          this.activateInputs()
        },
      },
    })

    this.children.buttonSaveData = new Button({
      class: 'button_is-small is-save-data',
      type: 'button',
      title: 'Save data',
      events: {
        click: () => {
          this.changeData()
        },
      },
    })

    this.children.buttonChangePass = new Button({
      class: 'button_is-small is-change-pass',
      type: 'button',
      title: 'Change password',
      events: {
        click: () => {
          this.props.changeDataFields = false
          this.activateInputs()
        },
      },
    })

    this.children.logoutLink = new Link({
      class: 'link is-logout',
      title: 'Logout',
      events: {
        click: () => this.logout(),
      },
    })

    this.children.cancelLink = new Link({
      class: 'link is-cancel',
      title: 'Cancel',
      events: {
        click: () => this.cancel(),
      },
    })

    this.children.fields = profileInputProps.map((props) => {
      return new ProfileFormField({
        id: props.id,
        label: props.label,
        inputProps: props,
        validateForm: this.validateForm.bind(this),
      })
    })

    this.children.changePassFields = profilePasswordProps.map((props) => {
      return new ProfileFormField({
        id: props.id,
        label: props.label,
        inputProps: props,
        validateForm: this.validateForm.bind(this),
      })
    })

    this.children.avatar = new Avatar({})
  }

  validateForm(inputName: string, isValid: boolean) {
    inputsValidationStatus[inputName] = isValid
    inputsValidationStatus['display_name'] = true
    inputsValidationStatus['oldPassword'] = true
    formIsValid = Object.values(inputsValidationStatus).every((value) => value)
    if (this.children.buttonSaveData instanceof Block) {
      if (formIsValid) {
        this.children.buttonSaveData.setProps({
          class: 'button_is-small is-save-data',
        })
      } else {
        this.children.buttonSaveData.setProps({
          class: 'button_is-small is-save-data disabled',
        })
      }
    }
  }

  activateInputs() {
    this.props.editMode = 'edit-mode'
    const inputClass = this.props.changeDataFields
      ? '.is-profile-inputs'
      : '.is-password-inputs'
    const inputs = Array.from(document.querySelectorAll(`${inputClass} input`))
    inputs.forEach((input) => {
      const inputName = (input as HTMLInputElement).name
      const inputValue = (input as HTMLInputElement).value
      this.oldInputValues[inputName] = inputValue
      inputsValidationStatus[inputName] = inputValue ? true : false
      this.validateForm(inputName, inputsValidationStatus[inputName])
      ;(input as HTMLInputElement).disabled = false
    })
  }

  deactivateInputs() {
    this.props.editMode = 'not-edit-mode'
    const inputClass = this.props.changeDataFields
      ? '.is-profile-inputs'
      : '.is-password-inputs'
    const inputs = Array.from(document.querySelectorAll(`${inputClass} input`))
    inputs.forEach((input) => ((input as HTMLInputElement).disabled = true))
    inputsValidationStatus = {}
  }

  logout() {
    AuthController.logout()
  }

  changeData() {
    const formData: Record<string, string> = {}
    const form = this.getContent()
    const inputClass = this.props.changeDataFields
      ? '.is-profile-inputs'
      : '.is-password-inputs'
    const inputs = form?.querySelectorAll(`${inputClass} input`)
    inputs.forEach((input) => {
      formData[(input as HTMLInputElement).name] = (
        input as HTMLInputElement
      ).value
    })
    if ('email' in formData) {
      const promise = UserController.changeProfileData(formData as UserProfile)
      promise
        .then(() => {
          this.deactivateInputs()
        })
        .catch(() => {
          throw new Error('sth went wrong')
        })
      return
    }
    if ('oldPassword' in formData) {
      delete formData.retype
      const promise = UserController.changePassword(
        formData as ChangePasswordData
      )
      promise
        .then(() => this.deactivateInputs())
        .catch(() => {
          throw new Error('sth went wrong')
        })
    }
  }

  cancel() {
    const form = this.getContent()
    const inputClass = this.props.changeDataFields
      ? '.is-profile-inputs'
      : '.is-password-inputs'
    const inputs = form?.querySelectorAll(`${inputClass} input`)
    inputs.forEach((input) => {
      const inputName = (input as HTMLInputElement).name
      ;(input as HTMLInputElement).value = this.oldInputValues[inputName]
    })
    this.deactivateInputs()
  }

  render() {
    return this.compile(profileFormTmpl, { ...this.props })
  }
}
