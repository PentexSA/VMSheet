import {appSchema} from '@nozbe/watermelondb';

import {weightsSchema} from './weights';
import {sheetsSchema} from './sheets';

export default appSchema({
  version: 2,
  tables: [weightsSchema, sheetsSchema],
});
