import { cloneDeep } from 'lodash';
import type { BaseStore } from '@/store';
import { action, computed, observable } from 'mobx';

export interface ReplyType {
  title: string;
  avatar: string;
  content: string;
}

export interface DiscussType {
  id: number;
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
  replyList: ReplyType[];
}

export class DiscussionStore {
  @observable list = [] as DiscussType[];
  @observable commentLength = 0;
  @observable replyListLength = [] as number[];

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action async setDiscuss(list: DiscussType[]) {
    this.list = cloneDeep(list);
  }

  @action async addReply(reply: string, id: number) {
    this.list[id].replyList.push({
      title: this.baseStore.getId(),
      avatar: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      content: reply,
    });
    this.replyListLength[id] += 1;
  }

  @action async addComment(comment: string) {
    this.list.unshift({
      id: 0,
      href: '',
      title: this.baseStore.getId(),
      avatar: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      description: 'this is description',
      content: comment,
      replyList: [] as ReplyType[],
    });
    this.replyListLength.unshift(0);
    this.updateID();
    this.getCommentLength;
  }

  @action async updateID() {
    const idList: number[] = [];
    idList[0] = 0;
    this.list.forEach(function (item, index) {
      if (index !== 0) {
        idList[index] = item.id + 1;
      }
    });
    for (let i = 0; i < idList.length; i) {
      this.list[i].id = idList[i];
    }
  }

  @action async fetchDiscuss() {
    const listData = [];
    for (let i = 0; i < 3; i += 1) {
      listData.unshift({
        id: 2 - i,
        href: 'https://ant.design',
        title: `三花和阿喵 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: '学生，这个人很神秘，什么也没有留下',
        content:
          '这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问 这里是一个提问',
        replyList: [
          {
            title: '我是评论1',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
            content: '我是评论1 我是评论1 我是评论1 我是评论1 我是评论1 我是评论1 我是评论1 ',
          },
          {
            title: '我是评论2',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
            content: '我是评论2 我是评论2 我是评论2 ',
          },
          {
            title: '我是品论3',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
            content: '我是评论3 我是评论3 我是评论3 我是评论3 ',
          },
        ],
      });

      this.replyListLength[i] = listData[i].replyList.length;
    }

    this.setDiscuss(listData);
  }

  @computed get getCommentLength() {
    this.commentLength = this.list.length;
    return this.commentLength;
  }
}
