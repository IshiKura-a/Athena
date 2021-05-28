import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { Todo, TodoListStore } from './model';
import { Button, Checkbox, List, Popconfirm } from 'antd';
import styles from './style.less';
import { FormOutlined, PlusOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import moment from 'moment';
import CustomModal from '@/components/TodoList/components/CustomModal';

interface IProps {
  todoListStore: TodoListStore;
}

@inject('todoListStore')
@observer
export default class TodoList extends Component<IProps> {
  ref: React.RefObject<any>;

  constructor(props: IProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.todoListStore.fetchTodo();
  }

  updateTodoStatus = (_id: string) => {
    return (e: any) => {
      const { list } = this.props.todoListStore;
      this.props.todoListStore.updateTodo({
        ...list.filter((item) => item._id === _id)[0],
        finished: e.target.checked,
      });
    };
  };

  getStatus = (time: string) => {
    const diff = moment(new Date()).diff(moment(time));
    if (diff > 0) return styles.expired;
    if (diff >= -7200000) return styles.near;
    return styles.free;
  };

  changeInDeleting = () => {
    const { inDeleting } = this.props.todoListStore;
    this.props.todoListStore.setInDeleting(!inDeleting);
  };

  deleteTodo = (_id: string) => {
    return async (e: any) => {
      await this.props.todoListStore.deleteTodo({ _id });
      await this.props.todoListStore.fetchTodo();
    };
  };

  handleOk = async (e: any) => {
    const { todoListStore } = this.props;
    todoListStore.setModalVisible(false);
    todoListStore.setEditing(undefined);
    e._id ? await todoListStore.updateTodo(e) : await todoListStore.createTodo(e);
  };

  handleCancel = (e: any) => {
    const { todoListStore } = this.props;
    todoListStore.setModalVisible(false);
    todoListStore.setEditing(undefined);
  };

  handleEdit = (_id: string | undefined) => {
    return (e: any) => {
      const { todoListStore } = this.props;
      this.ref.current.blur();
      todoListStore.setEditing(_id);
      todoListStore.setModalVisible(true);
    };
  };

  render() {
    const {
      list,
      inDeleting,
      modalVisible,
      confirmLoading,
      editing,
      dataToEdit,
    } = this.props.todoListStore;

    return (
      <>
        <List
          className={styles.list}
          dataSource={list}
          bordered
          renderItem={(item: Todo) => (
            <List.Item className={styles.list__item}>
              <Checkbox checked={item.finished} onChange={this.updateTodoStatus(item._id)} />
              <div onClick={this.handleEdit(item._id)} className={styles.todo__body}>
                <div
                  className={item.finished ? styles.todo__title__done : styles.todo__title__todo}
                >
                  {item.title}
                </div>
                <div className={styles.todo__ddl}>
                  {item.end_time ? (
                    <div className={this.getStatus(item.end_time)}>
                      {moment(item.end_time).format('MM-DD HH:mm')}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              {inDeleting ? (
                <Popconfirm title={'确认删除?'} onConfirm={this.deleteTodo(item._id)}>
                  <Button type={'primary'} danger size={'small'}>
                    Delete
                  </Button>
                </Popconfirm>
              ) : null}
            </List.Item>
          )}
        />
        <div className={styles.edit}>
          <Button
            icon={inDeleting ? <EyeInvisibleOutlined /> : <FormOutlined />}
            onClick={this.changeInDeleting}
            style={{ marginRight: 3 }}
          />
          <Button icon={<PlusOutlined />} onClick={this.handleEdit(undefined)} ref={this.ref}>
            新增Todo
          </Button>
        </div>
        <CustomModal
          modalVisible={modalVisible}
          confirmLoading={confirmLoading}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          dataToEdit={{ ...dataToEdit }}
          _id={editing}
        />
      </>
    );
  }
}
