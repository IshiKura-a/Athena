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
      course_id: '0',
      course_name: '编译原理',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      time: [
        {
          startTime: '15:00',
          endTime: '16:00',
          day: Day.Mon,
        },
        {
          startTime: '21:00',
          endTime: '22:00',
          day: Day.Wed,
        },
        {
          startTime: '15:00',
          endTime: '16:00',
          day: Day.Thu,
        },
      ],
    },
    {
      course_id: '1',
      course_name: '软件工程',
      instructor: '尹健伟',
      address: '曹光彪二期',
      department: '计算机学院',
      time: [
        {
          startTime: '9:50',
          endTime: '11:00',
          day: Day.Mon,
        },
        {
          startTime: '00:50',
          endTime: '2:00',
          day: Day.Tues,
        },
        {
          startTime: '13:50',
          endTime: '14:00',
          day: Day.Wed,
        },
      ],
    },
    {
      course_id: '2',
      course_name: '自然语言处理',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      time: [
        {
          start_time: '14:00',
          end_time: '16:00',
          day: Day.Tues,
        },
      ],
    },
    {
      course_id: '3',
      course_name: 'll',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      time: [
        {
          start_time: '15:00',
          end_time: '16:00',
          day: Day.Fri,
        },
      ],
    },
    {
      course_id: '4',
      course_name: 'wq',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      time: [
        {
          start_time: '13:00',
          end_time: '13:00',
          day: Day.Sat,
        },
      ],
    },
    {
      course_id: '5',
      course_name: 'kjhk',
      instructor: '李莹',
      address: '曹光彪二期',
      department: '计算机学院',
      time: [
        {
          start_time: '14:00',
          end_time: '15:00',
          day: Day.Sun,
        },
      ],
    },
  ],
};

let todoMock = {
  count: 0,
  todoData: [
    {
      _id: 0,
      title: '做作业',
      finished: false,
      start_time: null,
      end_time: null,
      description: null,
    },
  ],
};

export default {
  'GET /api/section/all': (req: Request, res: Response) => {
    res.send({
      message: 'ok',
      lessonInfo: lessonMock.lessonData,
    });
  },

  'POST /api/todo/create': (req: Request, res: Response) => {
    waitTime(2000);
    const { title } = req.body;
    todoMock.count++;
    const item = {
      _id: todoMock.count,
      title,
      finished: false,
      start_time: null,
      end_time: null,
      description: null,
    };
    todoMock.todoData.push(item);
    res.send({
      message: 'ok',
      _id: todoMock.count,
    });
    return;
  },

  'POST /api/todo/delete': (req: Request, res: Response) => {
    const { _id } = req.body;
    todoMock.todoData = todoMock.todoData.filter((item) => item._id !== _id);
    todoMock.count--;
    res.send({
      message: 'ok',
    });
  },

  'GET /api/todo': (req: Request, res: Response) => {
    res.send(todoMock.todoData);
  },

  'POST /api/todo/edit': (req: Request, res: Response) => {
    const { _id, finished, title, addition } = req.body;
    const { start_time, end_time, description } = addition;
    todoMock.todoData.forEach((item) => {
      if (item._id == _id) {
        item = { _id, title, start_time, end_time, description, finished };
      }
    });
    res.send({
      message: 'ok',
    });
  },
};
