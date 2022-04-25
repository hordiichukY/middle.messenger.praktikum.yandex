import Handlebars from 'handlebars';
import profileTmpl from './profile.hbs';
import { profileForm } from '../../components/profile-form';
import { profileInputProps } from '../../helpers/form-variables';

const profileData = {
  avatarSrc: new URL(
    '../../../static/img/avatar.jpg?as=webp&width=260',
    import.meta.url
  ),
  userName: 'Ms Cat',
  changeDataBtnProps: {
    modifier: 'is-small',
    type: 'button',
    title: 'Change data',
  },
  changePasswordBtnProps: {
    modifier: 'is-small',
    type: 'button',
    title: 'Change password',
  },
  linkLogoutProps: {
    class: 'link',
    href: '/login',
    title: 'Logout',
  },
  profileInputProps: profileInputProps,
};

export const getProfilePageHTML = () => {
  Handlebars.registerPartial('profileForm', profileForm(profileData));

  return profileTmpl();
};
