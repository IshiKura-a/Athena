import { action, observable, reaction } from 'mobx';
import { Day, Lesson } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import { BaseStore } from '@/store';

const todoData = [
  {
    title: 'xxx作业',
    endDate: '2020-04-06',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-07',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-08',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-09',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-10',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-11',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-12',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-13',
  },
  {
    title: 'xxx作业',
    endDate: '2020-04-14',
  },
];
const lessonData: Lesson[] = [
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: Day.Mon,
  },
  {
    name: '编译原理',
    startTime: '17:00',
    endTime: '18:00',
    date: Day.Mon,
  },
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: Day.Tues,
  },
  {
    name: '编译ww原理',
    startTime: '15:00',
    endTime: '16:00',
    date: Day.Wed,
  },
  {
    name: '编译原zz理',
    startTime: '15:00',
    endTime: '16:00',
    date: Day.Thu,
  },
  {
    name: '编译原理',
    startTime: '15:00',
    endTime: '16:00',
    date: Day.Fri,
  },
  {
    name: 'wq',
    startTime: '13:00',
    endTime: '13:00',
    date: Day.Sat,
  },
  {
    name: 'kjhk',
    startTime: '14:00',
    endTime: '15:00',
    date: Day.Sun,
  },
];

export default class HomePageStore {
  @observable todoList = todoData;
  @observable msg = [];
  @observable lessonInfo = lessonData;
  @observable todoPage = 1;

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action setToDoList(todoList: any) {
    this.todoList = cloneDeep(todoList);
  }

  @action setLessonInfo(lessonInfo: Lesson[]) {
    this.lessonInfo = cloneDeep(lessonInfo);
  }

  @action setToDoPage(todoPage: number) {
    this.todoPage = todoPage;
  }

  @action fetchToDoList = async () => {
    // TODO
  };

  @action fetchLessonInfo = async () => {
    // TODO
  };
}
