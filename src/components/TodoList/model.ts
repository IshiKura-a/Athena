import { cloneDeep } from 'lodash';
import { action, computed, observable } from 'mobx';
import services from './services';
import type { BaseStore } from '@/store';

export interface Todo {
  _id: string;
  start_time?: string;
  end_time?: string;
  title: string;
  description?: string;
  finished: boolean;
}

export class TodoListStore {
  @observable list = [] as Todo[];
  @observable editing = undefined as string | undefined;
  @observable inDeleting = false;
  @observable modalVisible = false;
  @observable confirmLoading = false;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @computed get dataToEdit() {
    return this.list ? this.list.filter((item: Todo) => item._id === this.editing)[0] : undefined;
  }

  @action setTodoList(list: Todo[]) {
    this.list = cloneDeep(list);
  }

  @action setEditing(editing: string | undefined) {
    this.editing = editing;
  }

  @action setModalVisible(modalVisible: boolean) {
    this.modalVisible = modalVisible;
  }

  @action setConfirmLoading(confirmLoading: boolean) {
    this.confirmLoading = confirmLoading;
  }

  @action setInDeleting(inDeleting: boolean) {
    this.inDeleting = inDeleting;
  }

  @action async createTodo(payload: Todo) {
    const { id } = this.baseStore;
    this.setConfirmLoading(true);
    await services.createTodo({ ...payload, id });
    this.setConfirmLoading(false);
    this.setTodoList(await services.listTodo({ id }));
  }

  @action async deleteTodo(payload: { _id: string }) {
    const response = await services.deleteTodo(payload);
  }

  @action async updateTodo(payload: Todo) {
    this.setConfirmLoading(true);
    await services.updateTodo({ ...payload, id: this.baseStore.id });
    this.setConfirmLoading(false);
    await this.fetchTodo();
  }

  @action async fetchTodo() {
    const response = await services.listTodo({ id: this.baseStore.id });
    this.setTodoList(response);
  }
}
