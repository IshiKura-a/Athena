import { Request, Response } from 'express';
import { RoleType } from '../src/pages/Login/model';

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
      sectionID: 0,
      id: 0,
      description: '不重要',
      expireAt: '2021-5-30T20:00:00.000Z',
    },
    {
      sectionID: 0,
      id: 1,
      description: '不重要',
      expireAt: '2021-6-1T21:00:00.000Z',
    },
    {
      sectionID: 0,
      id: 2,
      description: '不重要',
      expireAt: '2021-6-2T22:30:00.000Z',
    },
    {
      sectionID: 1,
      id: 3,
      description: '不重要',
      expireAt: '2021-6-2T23:30:00.000Z',
    },
    {
      sectionID: 2,
      id: 4,
      description: '不重要',
      expireAt: '2021-6-2T20:30:00.000Z',
    },
  ],
};

let signInStu = [
  {
    id: 0,
    sectionID: 0,
    stuID: 0,
    name: 'wzl',
    status: 2,
  },
  {
    id: 0,
    stuID: 1,
    sectionID: 0,
    name: 'stq',
    status: 2,
  },
  {
    id: 0,
    stuID: 2,
    sectionID: 0,
    name: 'fjy',
    status: 0,
  },
  {
    id: 1,
    stuID: 0,
    sectionID: 0,
    name: 'wzl',
    status: 2,
  },
  {
    id: 1,
    stuID: 1,
    sectionID: 1,
    name: 'stq',
    status: 2,
  },
  {
    id: 2,
    stuID: 2,
    sectionID: 1,
    name: 'fjy',
    status: 1,
  },
  {
    id: 2,
    stuID: 1,
    sectionID: 1,
    name: 'stq',
    status: 2,
  },
];

export default {
  'GET /api/signIn/list': (req: Request, res: Response) => {
    const { role, sectionID, stuID } = req.body; //id 暂时自己传一下
    const ret: any = [];
    if (role === RoleType.student) {
      const stuData =
        sectionID === undefined
          ? signInStu.filter((item) => item.stuID === stuID)
          : signInStu.filter((item) => item.stuID === stuID && item.sectionID === sectionID);

      stuData.map((item, index) => {
        const { id, description, expireAt } = signInList.data.filter((it) => it.id === item.id)[0];
        const data = { id, description, expireAt, extra: item.status };
        ret.push(data);
      });
    } else if (role === RoleType.instructor) {
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

    res.send({
      statusCode: 0,
      message: 'ok',
      data: ret,
    });
  },

  'POST /api/signIn/create': (req: Request, res: Response) => {
    waitTime(1000);
    const { sectionID, description, expireAt } = req.body;
    signInList.count++;
    const item = {
      id: signInList.count,
      sectionID,
      description,
      expireAt,
    };
    signInList.data.push(item);
    signInStu.push({ id: item.id, stuID: 0, name: 'wzl', sectionID: item.sectionID, status: 1 });
    res.send({
      message: 'ok',
    });
    return;
  },

  // update在第一次访问的时候根据时间都及逆行update一下
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
};
