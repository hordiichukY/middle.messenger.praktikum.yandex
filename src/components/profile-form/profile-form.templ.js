import Handlebars from 'handlebars';
import profileFormTmpl from './profile-form.hbs';
import { profileInput } from '../profile-input';
import { Button } from '../button';
import { Link } from '../link';

export const profileForm = ({
  avatarSrc,
  userName,
  changeDataBtnProps,
  changePasswordBtnProps,
  linkLogoutProps,
  profileInputProps,
}) => {
  Handlebars.registerPartial('buttonChangeData', Button(changeDataBtnProps));
  Handlebars.registerPartial(
    'buttonChangePass',
    Button(changePasswordBtnProps)
  );
  Handlebars.registerPartial('linkLogout', Link(linkLogoutProps));
  Handlebars.registerPartial('profileInput', profileInput);

  return profileFormTmpl({
    avatarSrc,
    userName,
    changeDataBtnProps,
    changePasswordBtnProps,
    linkLogoutProps,
    profileInputProps,
  });
};
