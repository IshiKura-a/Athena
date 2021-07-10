import { cloneDeep } from 'lodash';
import type { BaseStore } from '@/store';
import { action, observable, reaction } from 'mobx';
import services from './services';
import { message } from 'antd';

export interface ResourceType {
  id: string;
  title: string;
  filename: string;
  type: number; // 0: txt, 暂不支持其他
  create_time: string;
}

export default class ResourceStore {
  @observable resourceList = [] as ResourceType[];
  @observable currentLesson = '';
  @observable isLoading = false;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
    reaction(
      () => this.currentLesson,
      (data: any) => {
        this.listResource();
      },
      { fireImmediately: false },
    );
  }

  @action setCurrentLesson(lesson_id: string) {
    this.currentLesson = lesson_id;
  }

  @action setResourceList(list: ResourceType[]) {
    const resourceList = list.map((item) => {
      return {
        id: item.id,
        title: item.title,
        filename: item.filename,
        type: item.type,
        create_time: item.create_time.slice(0, 10),
      };
    });
    this.resourceList = cloneDeep(resourceList);
  }

  @action async listResource() {
    this.setLoading(true);
    const listData: ResourceType[] = await services.getResourceList({
      section_id: this.currentLesson,
    });
    this.setResourceList(listData);
    this.setLoading(false);
  }

  @action async fetchResource(filename: string, id: string) {
    services.getResource({ id }).then((res) => {
      // 处理返回的文件流
      const content = res;
      if (res.type === 'basic') {
        message.error('文件类型不正确，下载失败');
      } else {
        console.log(res.type);
        const blob = new Blob([content]);
        const fileName = filename;
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      }
    });
  }

  @action async uploadFile(name: string, content: File) {
    const formData = new FormData();
    formData.append('section_id', this.currentLesson);
    formData.append('title', name.split('.')[0]);
    formData.append('filename', name);
    formData.append('type', 0);
    formData.append('content', content);
    await services.uploadResource(formData);
    await services.getResourceList({ section_id: this.currentLesson });
  }

  @action setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
