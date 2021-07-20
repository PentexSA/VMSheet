import {Model} from '@nozbe/watermelondb';
import {field, readonly, date, json} from '@nozbe/watermelondb/decorators';

export default class Sheet extends Model {
  static table = 'sheets';

  @field('name') note: string | undefined;
  @readonly @date('created_at') createdAt: Date | undefined;
  // @json('sheet', sheetJson => sheetJson) sheet: string | undefined;
}
