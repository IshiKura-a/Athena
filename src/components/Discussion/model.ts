import { cloneDeep } from 'lodash';
import type { BaseStore } from '@/store';
import { action, computed, observable, reaction } from 'mobx';
import services from './services';

// store中的存储形式
export interface DiscussType {
  id: string;
  name: string;
  avatar: string;
  title: string;
  content: string;
  replyList: CommentType[];
}

// 根据section id获取topic列表
export interface ResponseType {
  creator: {
    id: string;
    name: string;
  };
  id: string;
  title: string;
  description: string;
  create_time: string;
}

// 根据topic id获取comment列表
export interface CommentType {
  topic_id: string;
  user: {
    id: string;
    name: string;
  }; // 可省略 如不填则从 token 拿 id
  content: string;
}

export default class DiscussionStore {
  @observable list = [] as DiscussType[];
  @observable commentLength = 0;
  @observable replyListLength = [] as number[];
  @observable currentLesson = '';
  @observable isLoading = false;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
    reaction(
      () => this.currentLesson,
      (data: any) => {
        this.listDiscussion();
      },
      { fireImmediately: false },
    );
  }

  @action setCurrentLesson(lesson_id: string) {
    this.currentLesson = lesson_id;
  }

  @computed get getReplyListLength() {
    return this.list.map((item, index) => {
      return item.replyList.length;
    });
  }

  @action async setDiscuss(list: DiscussType[]) {
    this.list = cloneDeep(list);
  }

  @action async addComment(reply: string, id: string) {
    await services.createComment({ topic_id: id, user_id: this.baseStore.getId(), content: reply });
    await this.listDiscussion();
  }

  @action async addTopic(comment: string) {
    services.createTopic({
      section_id: this.currentLesson,
      title: '新的讨论',
      description: comment,
    });
    this.listDiscussion();
  }

  @action async listDiscussion() {
    this.setLoading(true);
    let listData: DiscussType[] = [];
    const sectionID = this.currentLesson;
    const data: ResponseType[] = await services.getTopic({ section_id: sectionID });
    listData = await Promise.all(
      data.map(async (item, index) => {
        const commentData: CommentType[] = await services.getComment({ topic_id: item.id });

        return {
          id: item.id,
          name: item.creator.name,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: item.title,
          content: item.description,
          replyList: commentData,
        };
      }),
    );
    this.setDiscuss(listData);
    this.setLoading(false);
  }

  @action setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
