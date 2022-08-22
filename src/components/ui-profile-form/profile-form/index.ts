import Block from '../../../core/Block';
import { withUser } from '../../../core/withUser';
import { ProfileFormBlock } from './profile-form.templ';

const ProfileForm = withUser(ProfileFormBlock as typeof Block);
export default ProfileForm;
