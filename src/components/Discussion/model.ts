import type { BaseStore } from '@/store';

export default class DiscussionStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }
}
