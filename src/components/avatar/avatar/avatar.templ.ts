import AvatarTmpl from './avatar.hbs';
import Block from '../../../core/Block';
import { Button } from '../../button';
import { Link } from '../../link';
import { AvatarInput } from '../avatar-input';
import UserController from '../../../controllers/UserController';
import { URLS } from '../../../variables/api';

type AvatarProps = {
  isEditMode: boolean;
  resoursePath: string;
};

export class AvatarBlock extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props);
    this.props.isEditMode = false;
    this.props.resoursePath = `${URLS.RESOURCES_URL}`;
  }

  initChildren(): void {
    this.children.changeAvatarBtn = new Button({
      class: 'button button_is-small is-change-avatar',
      type: 'button',
      title: 'Change avatar',
      events: {
        click: () => {
          this.props.isEditMode = true;
        },
      },
    });
    this.children.changeAvatarSubmitBtn = new Button({
      class: 'button button_is-small is-submit-change-avatar',
      type: 'submit',
      title: 'Save',
      disabled: true,
      events: {
        click: () => {
          event?.preventDefault();
          this.changeAvatar();
        },
      },
    });
    this.children.changeAvatarCancel = new Link({
      class: 'link avatar__cancel',
      title: 'Cancel',
      events: {
        click: () => {
          this.props.isEditMode = false;
          this.disableSubmitButton();
        },
      },
    });

    this.children.avatarInput = new AvatarInput({
      value: '',
      events: {
        change: async (event: Event) => {
          const isFormValid = this.validateForm(
            (event?.target as HTMLInputElement).files as FileList
          );
          if (isFormValid) {
            this.activateSubmitButton();
          } else {
            this.disableSubmitButton();
          }
        },
      },
    });
  }

  changeAvatar() {
    const fileElement = document.getElementById('avatar') as HTMLInputElement;
    if (!fileElement) {
      return;
    }
    if (fileElement.files?.length === 0) {
      alert('please choose a file');
      return;
    }

    const file = (fileElement.files as FileList)[0];

    const formData = new FormData();
    formData.append('avatar', file);

    const promise = UserController.changeAvatar(formData);

    promise
      .then(() => {
        this.props.isEditMode = false;
        this.disableSubmitButton();
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  validateForm(fileList: FileList) {
    return fileList && fileList.length > 0 ? true : false;
  }

  disableSubmitButton() {
    if (this.children.changeAvatarSubmitBtn instanceof Block) {
      this.children.changeAvatarSubmitBtn.setProps({
        disabled: true,
      });
    }
  }

  activateSubmitButton() {
    if (this.children.changeAvatarSubmitBtn instanceof Block) {
      this.children.changeAvatarSubmitBtn.setProps({
        disabled: false,
      });
    }
  }

  render() {
    return this.compile(AvatarTmpl, { ...this.props });
  }
}
