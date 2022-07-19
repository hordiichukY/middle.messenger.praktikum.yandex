import { WithUser } from '../../../core/withUser'
import { ProfileFormBlock } from './profile-form.templ'

const ProfileForm = WithUser(ProfileFormBlock)
export default ProfileForm
