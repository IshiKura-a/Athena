import type { BaseStore } from '@/store';

export default class ResourceStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }
}
