import Block from '../../../core/Block';
import { withUser } from '../../../core/withUser';
import { ProfileFormFieldBlock } from './profile-form-field.templ';

const ProfileFormField = withUser(ProfileFormFieldBlock as typeof Block);
export default ProfileFormField;
