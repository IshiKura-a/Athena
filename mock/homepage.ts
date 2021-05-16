import { Request, Response } from 'express';
import { Day } from '../src/pages/Home/type';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let lessonMock = {
  lessonData: [
    {
      name: '编译原理',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '15:00',
      endTime: '16:00',
      date: Day.Mon,
    },
    {
      name: '软件工程',
      instructor: '尹健伟',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '9:50',
      endTime: '11:00',
      date: Day.Mon,
    },
    {
      name: '软件工程',
      instructor: '尹健伟',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '00:50',
      endTime: '2:00',
      date: Day.Mon,
    },
    {
      name: '软件工程',
      instructor: '尹健伟',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '13:50',
      endTime: '14:00',
      date: Day.Mon,
    },
    {
      name: '自然语言处理',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '14:00',
      endTime: '16:00',
      date: Day.Tues,
    },
    {
      name: '编译原理',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '21:00',
      endTime: '22:00',
      date: Day.Wed,
    },
    {
      name: '编译原理',
      instructor: '李莹',
      address: '紫金港西一',
      department: '马克思主义教育学院',
      startTime: '15:00',
      endTime: '16:00',
      date: Day.Thu,
    },
    {
      name: '编译原理',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '15:00',
      endTime: '16:00',
      date: Day.Fri,
    },
    {
      name: 'wq',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '13:00',
      endTime: '13:00',
      date: Day.Sat,
    },
    {
      name: 'kjhk',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      startTime: '14:00',
      endTime: '15:00',
      date: Day.Sun,
    },
  ],
};

let todoMock = {
  count: 0,
  todoData: [
    {
      id: 0,
      title: '做作业',
      finished: false,
      start_time: null,
      end_time: null,
      description: null,
    },
  ],
};

export default {
  'GET /api/home/lessonFetch': (req: Request, res: Response) => {
    res.send({
      status: 'ok',
      lessonInfo: lessonMock.lessonData,
    });
  },

  'POST /api/home/todoadd': (req: Request, res: Response) => {
    waitTime(2000);
    const { title } = req.body;
    todoMock.count++;
    const item = {
      id: todoMock.count,
      title,
      finished: false,
      start_time: null,
      end_time: null,
      description: null,
    };
    todoMock.todoData.push(item);
    res.send({
      status: 'ok',
      id: todoMock.count,
    });
    return;
  },

  'POST /api/home/tododelete': (req: Request, res: Response) => {
    const { id } = req.body;
    todoMock.todoData = todoMock.todoData.filter((item) => item.id !== id);
    todoMock.count--;
    res.send({
      status: 'ok',
    });
  },

  'POST /api/home/todofinish': (req: Request, res: Response) => {
    const { id } = req.body;
    todoMock.todoData = todoMock.todoData.map((item) =>
      item.id === id ? { ...item, finished: !item.finished } : item,
    );
    res.send({
      status: 'ok',
    });
  },

  'GET /api/home/todofetch': (req: Request, res: Response) => {
    res.send({
      status: 'ok',
      todoData: todoMock.todoData,
    });
  },

  'POST /api/home/todoedit': (req: Request, res: Response) => {
    const { id, title, start_time, end_time, description } = req.body;

    todoMock.todoData.forEach((item) => {
      if (item.id == id) {
        item = { id, title, start_time, end_time, description, finished: item.finished };
      }
    });
    res.send({
      status: 'ok',
    });
  },
};
