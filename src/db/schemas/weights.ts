import {tableSchema} from '@nozbe/watermelondb';

export const weightsSchema = tableSchema({
  name: 'weights',
  columns: [
    {name: 'weight', type: 'number'},
    {name: 'created_at', type: 'number'},
    {name: 'note', type: 'string', isOptional: true},
  ],
});
