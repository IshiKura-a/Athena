import { cloneDeep } from 'lodash';
import { action, observable } from 'mobx';
import services from './services';
import type { BaseStore } from '@/store';
import moment from 'moment';

export interface Notify {
  id: string;
  title: string;
  description: string;
  type: string; // 目前只有homework
  time: string; // homework理解为ddl
  extra: {
    section_id: string; // 对于homework而言
  };
}

export interface Status {
  title: string;
  description: string;
  time: string;
  status: number; // overdue, urgent, valid
}

export class NotifyListStore {
  @observable list = [] as Notify[];
  @observable statuslist = [] as Status[];

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action async fetchNotify() {
    const response = await services.listNotify({ id: this.baseStore.getId() });
    this.setNotify(response);
    const statusList = await this.getStatus();
    this.setStatus(statusList);
  }

  @action async setNotify(list: Notify[]) {
    this.list = cloneDeep(list);
  }

  @action async setStatus(list: Status[]) {
    this.statuslist = cloneDeep(list);
  }

  @action async getStatus() {
    const currentMoment = moment().format();
    const weekMoment = moment().add(7, 'days').format(); // one week ago
    const statusList = [] as Status[];

    const current = new Date(currentMoment);
    const week_later = new Date(weekMoment);

    this.list.forEach((value, key) => {
      const date = new Date(value.time);
      // get status
      let status = -1;
      if (date >= current) {
        status = 0;
        if (date >= week_later) {
          status = 1;
        }
      }
      // get time in the correct form
      const time = value.time
        .replace('T', ' ')
        .replaceAll('-', '.')
        .replaceAll(':', '.')
        .substring(0, 16);
      statusList.push({
        time,
        status,
        description: value.description,
        title: value.title,
      });
    });

    return statusList;
  }
}