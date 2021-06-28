import type { BaseStore } from '@/store';

export default class SignInStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }
}
