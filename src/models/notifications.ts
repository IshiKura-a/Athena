import { queryNotification } from '@/services/query';
import type { Effect, Reducer } from 'umi';

// attribute
export interface notificationProps {
  avatar: string;
  class: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface notificationModelState {
  data: notificationProps[];
}

export interface notificationModelType {
  namespace: 'notification';
  state: notificationModelState;
  effects: {
    getRemote: Effect;
  };

  reducers: {
    getList: Reducer<notificationModelState>;
  };
}

const notificationModel: notificationModelType = {
  namespace: 'notification',
  state: {
    data: [],
  },
  effects: {
    // _表示不需要参数,支持call put select等方法
    *getRemote(_, { call, put }) {
      const response = yield call(queryNotification); // 用call调用service层的方法
      yield put({
        type: 'getList', // 调用reducer中的show，put用来除法该方法，payload是传递的参数
        payload: response,
      });
    },
  },
  reducers: {
    getList(state, action) {
      return { data: action.payload };
    },
  },
};

export default notificationModel;
