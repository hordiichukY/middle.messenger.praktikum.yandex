import Block from '../../../core/Block';
import { withUser } from '../../../core/withUser';
import { AvatarBlock } from './avatar.templ';

export const Avatar = withUser(AvatarBlock as typeof Block);
