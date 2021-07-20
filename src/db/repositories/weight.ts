import {database} from './../database';
import {Collection, Model} from '@nozbe/watermelondb';

export type IWeight = {
  createdAt?: Date;
  weight: string | number;
  note: string | undefined;
};

class Weight {
  weights: Collection<IWeight & Model>;
  constructor() {
    this.weights = database.collections.get('weights');
  }
  observeWeights() {
    return this.weights.query().observe();
  }
  async save({weight, note}: IWeight) {
    return await database.action(async () => {
      await this.weights.create(entry => {
        entry.weight = Number(weight);
        entry.note = note;
      });
    });
  }
}
export const weightRepository = new Weight();
