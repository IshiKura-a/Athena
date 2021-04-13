import { Request, Response } from 'express';
import { forEach } from 'lodash';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

let todoMock = {
    count:0,
    todoData: [
        {
            id: 0,
            title: '做作业',
            finished: false,
            start_time: null,
            end_time: null,
            description: null
        }
    ]
}

export default {
    'POST /api/home/todoadd': (req: Request, res: Response) => {
      const {title} = req.body
      todoMock.count++;
      const item = {id:todoMock.count,title,finished:false,start_time:null,end_time:null,description:null}
      todoMock.todoData.push(item);
      res.send({
        status: 'ok',
        id: todoMock.count
      });
      return;
    },

    'POST /api/home/tododelete':(req: Request,res: Response) => {
        const {id} = req.body
        todoMock.todoData = todoMock.todoData.filter(item=> item.id!==id)
        todoMock.count--;
        res.send({
            status: 'ok'
        })
    },

    'POST /api/home/todofinish':(req:Request,res:Response) =>{
        const {id} = req.body
        todoMock.todoData = todoMock.todoData.map((item)=>(item.id === id)?{...item, finished:!item.finished}:item);
        res.send({
            status: 'ok',
        })
    },

    'GET /api/home/todofetch':(req: Request,res:Response) => {
        res.send({
            status: 'ok',
            todoData: todoMock.todoData
        })
    },

    'POST /api/home/todoedit':(req:Request,res:Response)=>{
        const {id,title,start_time,end_time,description} = req.body
        
        todoMock.todoData.forEach((item)=>{
            if(item.id == id){
                item = {id,title,start_time,end_time,description,finished:item.finished}
            }
        })
        res.send({
            status: 'ok',
        })
    }
  
  };
  