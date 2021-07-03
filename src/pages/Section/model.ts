import type { BaseStore } from '@/store';
import type SignInStore from '@/components/SignIn/model';
import type HomeworkStore from '@/components/HomeWork/model';
import type DiscussionStore from '@/components/Discussion/model';
import type ResourceStore from '@/components/Resource/model';
import { action, computed, observable } from 'mobx';
import type { LessonReq } from '@/pages/Home/type';
import { history } from 'umi';
import { fetchLesson } from '@/services/homepage';
import { cloneDeep } from 'lodash';

export default class SectionStore {
  @observable lessonList = [] as LessonReq[];
  @observable currentLesson = undefined as string | undefined;

  signInStore: SignInStore;
  hwStore: HomeworkStore;
  discussion: DiscussionStore;
  resourceStore: ResourceStore;
  baseStore: BaseStore;

  constructor(
    baseStore: BaseStore,
    signInStore: SignInStore,
    hwStore: HomeworkStore,
    discussionStore: DiscussionStore,
    resourceStore: ResourceStore,
  ) {
    this.baseStore = baseStore;
    this.signInStore = signInStore;
    this.hwStore = hwStore;
    this.discussion = discussionStore;
    this.resourceStore = resourceStore;
  }

  requestAgain = async () => {
    if (this.currentLesson) {
      this.signInStore.setCurrentLesson(this.currentLesson);
      this.hwStore.setCurrentLesson(this.currentLesson);
      await this.signInStore.listSign();
      await this.hwStore.listHw();
    }
  };

  redirectRoute = (sectionID: string) => {
    history.push({
      pathname: `/section/${sectionID}`,
    });
    this.setCurrentLesson(sectionID);
    this.requestAgain();
  };

  handleRoute = (section_id: string | undefined) => {
    if (section_id === undefined || section_id === ':id') {
      if (this.lessonList.length > 0) {
        const defaultID = this.lessonList[0].section_id;
        this.redirectRoute(defaultID);
      }
    } else {
      this.setCurrentLesson(section_id);
      this.requestAgain();
    }
  };

  @computed get lessonName() {
    return this.currentLesson
      ? this.lessonList.filter((item: LessonReq) => item.section_id === this.currentLesson)[0]
          ?.course_name
      : undefined;
  }

  @action setCurrentLesson(sectionID: string) {
    this.currentLesson = sectionID;
  }

  @action setLessonList(lessonList: LessonReq[]) {
    this.lessonList = cloneDeep(lessonList);
  }

  @action fectchLessonList = async () => {
    const response = await fetchLesson();
    this.setLessonList(response);
  };
}
