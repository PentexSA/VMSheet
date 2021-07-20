import {tableSchema} from '@nozbe/watermelondb';

export const sheetsSchema = tableSchema({
  name: 'sheets',
  columns: [
    {name: 'name', type: 'string'},
    {name: 'created_at', type: 'number'},
    // {name: 'sheet', type: 'string'},
  ],
});
