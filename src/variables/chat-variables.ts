import { nanoid } from 'nanoid';

export const createChatInputProps = {
  id: nanoid(6),
  type: 'text',
  name: 'chat_title',
  placeholder: 'Enter chat name',
  required: 'required',
  error: 'This field is required',
};

export const addUserInputProps = {
  id: nanoid(6),
  type: 'text',
  name: 'add_user',
  placeholder: 'Enter login',
  required: 'required',
  error: 'This field is required',
};

export const deleteUserInputProps = {
  id: nanoid(6),
  type: 'text',
  name: 'delete_user',
  placeholder: 'Enter login',
  required: 'required',
  error: 'This field is required',
};
