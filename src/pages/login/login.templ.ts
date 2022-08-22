import { Form } from '../../components/ui-form/form';
import { LoginInputsProps } from '../../variables/form-variables';
import Block from '../../core/Block';
import loginPageTmpl from './login.hbs';
import AuthController from '../../controllers/AuthController';
import { SignInData } from '../../utils/types/authData';
import { withRouter } from '../../core/withRouter';
import { navigation } from '../../variables/navigation';
import { Router } from '../../core/Router';

type LoginPageProps = {
  router: Router;
  inputsValidationStatus: Record<string, boolean>;
};

class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }
  initChildren() {
    this.children.loginForm = new Form({
      title: 'Login',
      buttonProps: {
        title: 'Sign in',
        events: {
          click: (event: Event) => {
            event.preventDefault();
            this.onSignIn();
          },
        },
      },

      linkProps: {
        title: 'Create account',
        events: {
          click: () => {
            this.props.router.go(navigation.signUp.pathname);
          },
        },
      },
      inputFieldProps: LoginInputsProps,
      inputsValidationStatus: this.props.inputsValidationStatus,
    });
  }

  onSignIn() {
    const formData: Record<string, string> = {};
    const form = this.getContent();
    const inputs = form?.querySelectorAll('input');
    inputs.forEach((input) => {
      formData[input.name] = input.value;
    });

    AuthController.signIn(formData as SignInData);
  }

  render() {
    return this.compile(loginPageTmpl, {});
  }
}

export default withRouter(LoginPage);
