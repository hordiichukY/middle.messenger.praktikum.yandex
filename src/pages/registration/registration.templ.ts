import { Form } from '../../components/ui-form/form'
import registrationPageTmpl from './registration.hbs'
import { RegistrtationInputProps } from '../../variables/form-variables'
import Block from '../../core/Block'
import { SignUpData } from '../../utils/types/authData'
import AuthController from '../../controllers/AuthController'
import { withRouter } from '../../core/withRouter'
import { navigation } from '../../variables/navigation'
import { Router } from '../../core/Router'

type RegistrationPageProps = {
  router: Router
  inputsValidationStatus: Record<string, boolean>
}
class RegistrationPage extends Block<RegistrationPageProps> {
  constructor(props: RegistrationPageProps) {
    super(props)
  }
  initChildren() {
    this.children.registrationForm = new Form({
      title: 'Registration',
      buttonProps: {
        title: 'Sign up',
        events: {
          click: (event: Event) => {
            event.preventDefault()
            this.onSignUp()
          },
        },
      },

      linkProps: {
        title: 'Login',
        events: {
          click: () => {
            this.props.router.go(navigation.signIn)
          },
        },
      },
      inputFieldProps: RegistrtationInputProps,
      inputsValidationStatus: this.props.inputsValidationStatus,
    })
  }

  onSignUp() {
    const formData: Record<string, string> = {}
    const form = this.getContent()
    const inputs = form?.querySelectorAll('input')
    inputs.forEach((input) => {
      formData[input.name] = input.value
    })

    AuthController.signUp(formData as SignUpData)
  }

  render() {
    return this.compile(registrationPageTmpl, {})
  }
}

export default withRouter(RegistrationPage)
