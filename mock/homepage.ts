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
      _id: '60a8e47684f3743b0ca9ad32',
      start_time: '2021-05-24T09:28:28.000Z',
      end_time: '2021-05-26T23:28:28.000Z',
      title: 'test update todo3dddsdksdjksjflsfjslfj',
      description: 'test description333hhh',
      finished: true,
    },
    {
      _id: '60a917af685c1060ae93e823',
      title: '跑步',
      finished: false,
      description: 'sss',
      end_time: '2021-05-23T15:00:00.000Z',
      start_time: '2021-05-23T14:59:03.000Z',
    },
    {
      _id: '60a9c4983999a863614b5ec7',
      title: '吃饭',
      finished: false,
      end_time: '2021-05-26T16:15:12.534Z',
    },
    { _id: '60a9c4983999a863614b5ec0', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5ec1', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5ec2', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5ec3', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5ec4', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5ec5', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5ec6', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5e07', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5e17', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5e27', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5e37', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5e47', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5e57', title: '吃饭', finished: false },
    { _id: '60a9c4983999a863614b5e67', title: '吃饭', finished: false },
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

  'POST /api/todo/update': (req: Request, res: Response) => {
    const { _id } = req.body;
    todoMock.todoData.map((item) =>
      item._id === _id
        ? item
        : {
            ...item,
            ...req.body,
          },
    );
    res.send({
      message: 'ok',
    });
  },
};
