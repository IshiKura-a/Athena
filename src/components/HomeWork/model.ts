import type { BaseStore } from '@/store';

export default class HomeworkStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }
}
