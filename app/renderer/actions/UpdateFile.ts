import { Action } from './AbstractAction';

export const UpdateFile: Action = {
  title: 'Update a file',
  icon: 'edit',
  description: 'Updates the contents of a file across multiple repositories',
  requiresClone: false
};
