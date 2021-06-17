import type { BaseStore } from '@/store';
import { action, computed, observable } from 'mobx';

export class ResourceStore {
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }
}
