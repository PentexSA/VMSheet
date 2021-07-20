import {database} from './../database';
import {Collection, Model} from '@nozbe/watermelondb';

export type ISheet = {
  createdAt?: Date;
  name: string;
  sheet: string;
};

class Sheet {
  sheets: Collection<ISheet & Model>;
  constructor() {
    this.sheets = database.collections.get('sheets');
  }
  observeSheets() {
    return this.sheets.query().observe();
  }
  async save({name, sheet}: ISheet) {
    return await database.action(async () => {
      await this.sheets.create(entry => {
        entry.name = name;
        // entry.sheet = sheet;
      });
    });
  }
}
export const sheetRepository = new Sheet();
