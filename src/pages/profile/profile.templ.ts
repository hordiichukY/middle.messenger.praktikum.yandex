import profileTmpl from './profile.hbs'
import ProfileForm from '../../components/ui-profile-form/profile-form'
import Block from '../../core/Block'
import { withRouter } from '../../core/withRouter'
import { Link } from '../../components/link'
import { Router } from '../../core/Router'

type ProfilePageProps = { router: Router }
export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super(props)
  }
  initChildren() {
    this.children.profileForm = new ProfileForm({})

    this.children.linkBack = new Link({
      class: 'link-back',
      events: {
        click: () => this.props.router.back(),
      },
    })
  }

  render() {
    return this.compile(profileTmpl, {})
  }
}
export default withRouter(ProfilePage)
