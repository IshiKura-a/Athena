import { action, observable, runInAction } from 'mobx';
import { Day, Lesson , ToDo } from '@/pages/Home/type';
import { cloneDeep } from 'lodash';
import { BaseStore } from '@/store';
import { addToDo, addToDoParams, deleteToDo, deleteToDoParams, editToDo, editToDoParams, fetchToDo, finishToDo, queryToDo } from '@/services/homepage';
import _ from 'lodash';
import { response } from 'express';

export type respToDo = {
  count: number;
  todoData: ToDo[];
}

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
  @observable todoList: ToDo[] = [];
  @observable msg = [];
  @observable lessonInfo = lessonData;

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


  @action fetchToDoList = async () => {
    // TODO
    const response = await fetchToDo({token: this.baseStore.token,key:'key'});
    if(response.status === 'ok')
    {
      this.setToDoList(response.todoData);
    }
    else
    {
      console.log('fetch todo error');
    }
  };

  @action addToDo = async (payload: addToDoParams)=>{
    // service add todo job  
    const response = await addToDo(payload);
    if(response.status === 'ok')
    {
      const newItem: ToDo = {...payload,id:response.id,finished: false};
      this.todoList = _.concat(this.todoList,newItem);
    }
  }

  @action deleteToDo  = async (index: number, payload: deleteToDoParams) => {
      const response1 = await deleteToDo(payload);
      if(response1.status !== 'ok')
      {
        console.log('delete todo error');
      }
      const response2 = await fetchToDo({token: this.baseStore.token, key: 'key'});
      
      if(response2.status == 'ok')
      {
        console.log('refetch todo error');
        this.setToDoList(response2.todoData);
      }
  }

  @action finishToTo = async(index: number) => {
    const response = await finishToDo({token: this.baseStore.token, id:this.todoList[index].id, key: 'key'})
    if(response.status === 'ok')
    {
      this.todoList = this.todoList.map((item, i: number)=>(i === index)?{...item, finished:!item.finished}:item);
    }
    else
    {
      console.log('finish todo error');
    }
  }

  @action editToDo = async (index: number,payload: editToDoParams) => {
    console.log('pass parmas',payload);
    const response = await editToDo({...payload,token:this.baseStore.token});
    if(response.status === 'ok')
    {
      const {title,start_time,end_time,description} = payload;
      const itemTitle = (title===undefined)?this.todoList[index].title:title;
      const itemStart_time = (start_time===undefined)?this.todoList[index].start_time:start_time;
      const itemEnd_time = (end_time===undefined)?this.todoList[index].end_time:end_time;
      const itemDescription = (description===undefined)?this.todoList[index].description:description;
      const newItem = {id:this.todoList[index].id, finished:this.todoList[index].finished, title: itemTitle, start_time: itemStart_time,end_time:itemEnd_time,description:itemDescription}
      this.todoList = this.todoList.map((item, i: number)=>(i === index)?{...newItem}:item);
      console.log('after edit',this.todoList[index]);
    }

  }


  @action fetchLessonInfo = async () => {
    // TODO
  };
}
