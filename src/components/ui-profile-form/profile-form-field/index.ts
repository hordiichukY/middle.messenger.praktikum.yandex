import { WithUser } from '../../../core/withUser'
import { ProfileFormFieldBlock } from './profile-form-field.templ'

const ProfileFormField = WithUser(ProfileFormFieldBlock)
export default ProfileFormField
