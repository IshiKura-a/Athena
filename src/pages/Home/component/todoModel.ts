import { action, observable } from 'mobx';
import { ToDo } from '@/pages/Home/type';
import { BaseStore } from '@/store';
import { cloneDeep } from 'lodash';
import { deleteToDoParams, fetchToDo, editToDo, deleteToDo, addToDo } from '@/services/homepage';

export default class ToDoListStore {
  @observable todoList: ToDo[] = [];
  @observable popVisible = false;
  @observable atPop = -1;
  @observable inputValue = '';
  @observable tmpEditValue = '';
  @observable isEditing = false;
  @observable atEditing = -2;

  baseStore: BaseStore;

  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action setInputValue = (value: string) => {
    this.inputValue = value;
  };

  @action setTmpEditValue = (value: string) => {
    this.tmpEditValue = value;
    console.log('edit atEditing:model', this.atEditing);
    // console.log("edit isEditing:model",this.isEditing);
    console.log('edit tmpEditingValue:model', this.tmpEditValue);
  };

  @action setIsEditing = (value: boolean) => {
    this.isEditing = value;
    console.log('edit isEditing:model', this.isEditing);
  };

  @action setAtEditing = (value: number) => {
    this.atEditing = value;
  };

  @action handleBlur = () => {
    this.inputValue = '';
    this.tmpEditValue = '';
    this.isEditing = false;
    this.atEditing = -2;
  };

  @action visibleChange(index: number, visible: any) {
    console.log('at model before', this.popVisible, this.atPop);
    this.popVisible = visible;
    this.atPop = index;
    console.log('at model after', this.popVisible, this.atPop);
  }

  @action closePopUp() {
    this.popVisible = false;
    this.atPop = -1;
  }

  @action setToDoList(todoList: any) {
    this.todoList = cloneDeep(todoList);
  }

  @action fetchToDoList = async () => {
    const response = await fetchToDo({ id: this.baseStore.getId() }, this.baseStore.token);
    this.setToDoList(response);
  };

  @action addToDo = async (payload: any) => {
    const response = await addToDo(
      { ...payload, id: this.baseStore.getId() },
      this.baseStore.token,
    );
    if (response.message === 'ok') {
      await this.fetchToDoList();
    }
  };

  @action deleteToDo = async (index: number, payload: deleteToDoParams) => {
    const response = await deleteToDo(payload, this.baseStore.token);
    if (response.message !== 'ok') {
      console.log('delete todo error');
    } else {
      await this.fetchToDoList();
    }
  };

  @action editToDo = async (index: number, payload: any) => {
    const response = await editToDo({ ...payload }, this.baseStore.token);
    if (response.message === 'ok') {
      await this.fetchToDoList();
    }
  };
}
