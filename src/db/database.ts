import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import Weight from './entities/weight';
import Sheet from './entities/sheet';
import schema from './schemas/schemas';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'test',
});

export const database = new Database({
  adapter,
  modelClasses: [Weight, Sheet],
  actionsEnabled: true,
});
