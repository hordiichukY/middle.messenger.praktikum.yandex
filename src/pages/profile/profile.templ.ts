import profileTmpl from './profile.hbs';
import { ProfileForm } from '../../components/ui-profile-form/profile-form';
import { profileInputProps } from '../../helpers/form-variables';
import avatarSrc from '../../../static/img/avatar.jpg'
import Block from '../../utils/block';

export class ProfilePage extends Block {
  initChildren() {
    this.children.profileForm = new ProfileForm({
      avatarSrc: avatarSrc, 
      userName: 'Ms Cat', 
      profileInputProps: profileInputProps,
    })
  }

  render() {
    return this.compile( profileTmpl, {})
  }
}
