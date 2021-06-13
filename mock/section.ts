import { Request, Response } from 'express';
// import {isStudent} from "../src/pages/Login/model";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let signInList = {
  count: 2,
  data: [
    {
      sectionID: '0',
      id: '0',
      description: '不重要',
      expireAt: '2021-6-20 20:00:00',
    },
    {
      sectionID: '0',
      id: '1',
      description: '不重要',
      expireAt: '2021-6-1 21:00:00',
    },
    {
      sectionID: '0',
      id: '2',
      description: '这是一个签到',
      expireAt: '2021-6-2 22:30:00',
    },
    {
      sectionID: '1',
      id: '3',
      description: '不重要',
      expireAt: '2021-6-2 23:30:00',
    },
    {
      sectionID: '2',
      id: '4',
      description: '不重要',
      expireAt: '2021-6-2 20:30:00',
    },
  ],
};

let signInStu = [
  {
    id: '0',
    sectionID: '0',
    stuID: '0',
    name: 'wzl',
    status: 1,
  },
  {
    id: '0',
    stuID: '1',
    sectionID: '0',
    name: 'stq',
    status: 2,
  },
  {
    id: '0',
    stuID: '2',
    sectionID: '0',
    name: 'fjy',
    status: 0,
  },
  {
    id: '1',
    stuID: '0',
    sectionID: '0',
    name: 'wzl',
    status: 2,
  },
  {
    id: '1',
    stuID: '1',
    sectionID: '1',
    name: 'stq',
    status: 2,
  },
  {
    id: '2',
    stuID: '0',
    sectionID: '0',
    name: 'wzl',
    status: 1,
  },
  {
    id: '2',
    stuID: '1',
    sectionID: '1',
    name: 'stq',
    status: 2,
  },
];

let stuSignInData = [
  {
    sectionID: '0',
    id: '0',
    description: '不重要',
    expireAt: '2021-6-20 20:00:00',
    extra: 1,
  },
  {
    sectionID: '0',
    id: '1',
    description: '不重要',
    expireAt: '2021-6-1 21:00:00',
    extra: 2,
  },
  {
    sectionID: '0',
    id: '2',
    description: '不重要',
    expireAt: '2021-6-2 22:30:00',
    extra: 2,
  },
  {
    sectionID: '1',
    id: '3',
    description: '不重要',
    expireAt: '2021-6-2 23:30:00',
    extra: 2,
  },
  {
    sectionID: '2',
    id: '4',
    description: '不重要',
    expireAt: '2021-6-2 20:30:00',
    extra: 0,
  },
];

let homeworkList = {
  count: 4,
  data: [
    {
      id: '0',
      sectionID: '0',
      description: 'xxxxx',
      expireAt: '2021-6-2 8:00:00',
    },
    {
      id: '1',
      sectionID: '0',
      description: 'yyyyyy',
      expireAt: '2021-6-30 8:00:00',
    },
    {
      id: '2',
      sectionID: '1',
      description: 'hhhhhhhhh',
      expireAt: '2021-6-1 8:00:00',
    },
    {
      id: '3',
      sectionID: '1',
      description: 'sssss',
      expireAt: '2021-6-30 8:00:00',
    },
  ],
};

let homeworkStu = [
  {
    id: '0',
    sectionID: '0',
    stuID: '0',
    name: 'wzl',
    status: 0,
    isExpire: true,
    score: undefined,
    records: [
      {
        content: '这是content1',
        accessory: ['附件1', '附件2'],
      },
      {
        content: '这是content2',
        accessory: ['附件1', '附件2'],
      },
    ],
  },
  {
    id: '0',
    sectionID: '0',
    stuID: '1',
    name: 'xx',
    status: 0,
    isExpire: false,
    score: undefined,
    records: [
      {
        content: '这是content1',
        accessory: ['附件1', '附件2'],
      },
      {
        content: '这是content2',
        accessory: ['附件1', '附件2'],
      },
    ],
  },
  {
    id: '1',
    sectionID: '0',
    stuID: '0',
    name: 'wzl',
    status: 1,
    isExpire: false,
    score: 100,
    records: [
      {
        content: '这是content1',
        accessory: ['附件1', '附件2'],
      },
      {
        content: '这是content2',
        accessory: ['附件1', '附件2'],
      },
    ],
  },
  {
    id: '2',
    sectionID: '0',
    stuID: '0',
    name: 'wzl',
    status: 2,
    isExpire: true,
    score: undefined,
    records: [
      {
        content: '这是content1',
        accessory: ['附件1', '附件2'],
      },
      {
        content: '这是content2',
        accessory: ['附件1', '附件2'],
      },
    ],
  },
  {
    id: '3',
    sectionID: '1',
    stuID: '0',
    name: 'wzl',
    status: 1,
    isExpire: false,
    score: 100,
    records: [
      {
        content: '这是content1',
        accessory: ['附件1', '附件2'],
      },
      {
        content: '这是content2',
        accessory: ['附件1', '附件2'],
      },
    ],
  },
];

export default {
  'GET /api/signIn/list1': (req: Request, res: Response) => {
    res.status(200).send({
      message: 'ok',
      data: stuSignInData,
    });
  },

  'GET /api/signIn/list': (req: Request, res: Response) => {
    const role = 'student';
    const stuID = '0';
    const sectionID = '0';
    const ret: any = [];
    if (role === 'student') {
      const stuData =
        sectionID === undefined
          ? signInStu.filter((item) => item.stuID === stuID)
          : signInStu.filter((item) => item.stuID === stuID && item.sectionID === sectionID);

      stuData.map((item, index) => {
        const { id, description, expireAt } = signInList.data.filter((it) => it.id === item.id)[0];
        const data = { id, description, expireAt, extra: item.status };
        ret.push(data);
      });
    } else {
      const unsignedData =
        sectionID === undefined
          ? signInStu.filter((item) => item.status === 0 || item.status === 1)
          : signInStu.filter(
              (item) => (item.status === 0 || item.status === 1) && item.sectionID === sectionID,
            );
      signInList.data.map((item, index) => {
        const unsignStu = unsignedData.filter((it) => it.id === item.id);
        let data = { id: item.id, description: item.description, expireAt: item.expireAt };
        let extra: any = [];
        unsignStu.map((it, index) => {
          const stu = { id: it.stuID, name: it.name };
          extra.push(stu);
        });
        ret.push({ ...data, extra });
      });
    }
    res.status(200).send({
      message: 'ok',
      data: ret,
    });
  },

  'POST /api/signIn/create': (req: Request, res: Response) => {
    waitTime(1000);
    const { sectionID, description, expireAt } = req.body;
    signInList.count++;
    const item = {
      id: signInList.count.toString(),
      sectionID,
      description,
      expireAt,
    };
    signInList.data.push(item);
    signInStu.push({ id: item.id, stuID: '0', name: 'wzl', sectionID: item.sectionID, status: 1 });
    res.send({
      message: 'ok',
    });
    return;
  },

  'POST /api/signIn/update': (req: Request, res: Response) => {
    const { stuID, id } = req.body;
    signInStu.map((item) => {
      if (item.stuID === stuID && item.id === id) {
        item.status = 2; //全部更新成2
      }
    });
    res.send({
      message: 'ok',
    });
  },

  'GET /api/homework/list': (req: Request, res: Response) => {
    const ret: any = [];
    const role = 'instrutor';
    const stuID = '0';
    const sectionID = '0';
    if (role === 'student') {
      const stuData =
        sectionID === undefined
          ? homeworkStu.filter((item) => item.stuID === stuID)
          : homeworkStu.filter((item) => item.stuID === stuID && item.sectionID === sectionID);

      stuData.map((item, index) => {
        const { id, description, expireAt } = homeworkList.data.filter(
          (it) => it.id === item.id,
        )[0];
        const data = {
          id,
          description,
          expireAt,
          extra: {
            status: item.status,
            isExpire: item.isExpire,
            records: item.records,
            score: item.score,
          },
        };
        ret.push(data);
      });
    } else {
      const homework =
        sectionID === undefined
          ? homeworkStu
          : homeworkStu.filter((item) => item.sectionID === sectionID);
      homeworkList.data.map((item) => {
        const hw = homework.filter((it) => it.id === item.id);
        let data = { id: item.id, description: item.description, expireAt: item.expireAt };
        let extra: any = [];
        hw.map((it) => {
          const stu = { id: it.stuID, name: it.name, record: it.records[it.records.length - 1] };
          extra.push(stu);
        });
        ret.push({ ...data, extra });
      });
    }
    res.status(200).send({
      message: 'ok',
      data: ret,
    });
  },
};
