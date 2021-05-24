import { Component } from 'react';
import { Alert, Button, Card, Input, List, Popover, DatePicker, Row, Tooltip, Form } from 'antd';
import styles from './style.less';
import HomePageStore from '../model';
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { action, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment';
import ProForm from '@ant-design/pro-form';
import type { additionToDo } from '@/services/homepage';
import ToDoListStore from '../component/todoModel';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface TodoProps {
  todoListStore: ToDoListStore;
  homePageStore: HomePageStore;
}

@inject('todoListStore')
@observer
export default class TodoList extends Component<TodoProps, any> {
  // state = {
  //   popVisible: false,
  //   atPop: -1,
  // };

  constructor(props: TodoProps | Readonly<TodoProps>) {
    super(props);
    this.init();
  }

  disabledDate = (current: any) => {
    // Can not select days before today
    return current && current < moment().endOf('day');
  };

  async init() {
    await this.props.todoListStore.fetchToDoList();
  }

  @computed get todoList() {
    return this.props.todoListStore.todoList;
  }

  @computed get token() {
    return this.props.homePageStore.baseStore.token;
  }

  @computed get popVisible() {
    return this.props.todoListStore.popVisible;
  }

  @computed get atPop() {
    return this.props.todoListStore.atPop;
  }

  @computed get inputValue() {
    return this.props.todoListStore.inputValue;
  }

  @computed get tmpEditValue() {
    return this.props.todoListStore.tmpEditValue;
  }

  @computed get isEditing() {
    return this.props.todoListStore.isEditing;
  }

  @computed get atEditing() {
    return this.props.todoListStore.atEditing;
  }

  @action handleFocus = (index: number) => {
    if (index >= 0) {
      this.props.todoListStore.setAtEditing(index);
      this.props.todoListStore.setTmpEditValue(this.todoList[index].title);
    }
  };

  @action handleBlur = () => {
    this.props.todoListStore.handleBlur();
  };

  @action handleVisibleChange = (index: number, visible: any) => {
    // this.popVisible = visible;
    // this.atPop = index;
    // this.setState({
    //   popVisible: visible,
    //   atPop: index,
    // });
    this.props.todoListStore.visibleChange(index, visible);
  };

  @action closePopUp = () => {
    this.props.todoListStore.closePopUp();
  };

  @action handleChangeContent = (index: number, event: any) => {
    if (index === -1) this.props.todoListStore.inputValue = event.target.value;
    else {
      // this.setState({
      //   atEditing: index,
      // });
      this.props.todoListStore.setAtEditing(index);
      this.props.todoListStore.setIsEditing(true);
      this.props.todoListStore.setTmpEditValue(event.target.value);
    }
  };

  @action handlePressEnter = (index: number, event: any) => {
    this.props.todoListStore.isEditing = false;
    // this.isEditing = false;
    if (index === -1 && this.inputValue !== '') {
      this.addToDo();
    } else if (index !== -1) {
      if (this.tmpEditValue !== '') {
        this.editToDoTitle(index);
      }
    }
    event.target.blur();
  };

  @action addToDo = () => {
    const title = this.inputValue;
    this.props.todoListStore.setInputValue('');
    // this.inputValue = '';
    this.props.todoListStore.addToDo({ title, finished: false, addition: null });
  };

  @action finishToDo = (index: number) => {
    this.todoList[index].finished = !this.todoList[index].finished;
    const { _id, title, finished, start_time, end_time, description } = this.todoList[index];
    const addition: additionToDo = { start_time, end_time, description };
    this.props.todoListStore.editToDo(index, {
      _id,
      title,
      finished,
      addition,
    });
  };

  @action editToDoTitle = (index: number) => {
    const newTitle = this.tmpEditValue;
    const { _id, finished, start_time, end_time, description } = this.todoList[index];
    const addition: additionToDo = { start_time, end_time, description };
    this.props.todoListStore.editToDo(index, {
      _id,
      title: newTitle,
      finished,
      addition,
    });
    this.props.todoListStore.setTmpEditValue('');
    // this.tmpEditValue = '';
  };

  @action editToDoContent = (index: number, values: any) => {
    const { _id, title, finished } = this.todoList[index];
    const addition: additionToDo = {
      start_time: values.timePicker[0],
      end_time: values.timePicker[1],
      description: values.description,
    };
    if (Object.keys(values).length > 0) {
      this.props.todoListStore.editToDo(index, {
        _id,
        title,
        finished,
        addition,
      });
    }
  };

  @action deleteToDo = (index: number) => {
    const { _id } = this.todoList[index];
    this.props.todoListStore.deleteToDo(index, { _id });
  };

  render() {
    const { todoListStore } = this.props;
    return (
      <Card title={<Alert message={'待办事项'} type="info" showIcon banner />}>
        <Input
          maxLength={20}
          name="todoInput"
          bordered={false}
          style={{
            marginTop: 15,
            marginBottom: 10,
            borderBottom: '3px solid rgba(83, 167, 232, 0.65)',
          }}
          placeholder="回车添加事项"
          value={todoListStore.inputValue}
          onChange={this.handleChangeContent.bind(this, -1)}
          onPressEnter={this.handlePressEnter.bind(this, -1)}
          onBlur={this.handleBlur.bind(this)}
        />
        <List
          size="small"
          bordered
          className={styles.todoList}
          dataSource={this.props.todoListStore.todoList}
          renderItem={(item, index) => (
            <List.Item key={index} role={undefined} className="todoItem">
              <Row style={{ width: '100%' }}>
                <Checkbox
                  style={{ marginTop: 5, marginRight: 5 }}
                  checked={item.finished}
                  onClick={this.finishToDo.bind(this, index)}
                />
                <Input
                  style={{ width: '80%', marginRight: 5 }}
                  suffix={
                    <Tooltip
                      title={
                        item.description === undefined ||
                        item.description === '' ||
                        item.description === null
                          ? '暂无描述'
                          : item.description
                      }
                      style={{ position: 'absolute', right: 0 }}
                    >
                      <Popover
                        title="请选择"
                        trigger="click"
                        visible={todoListStore.atPop === index && todoListStore.popVisible}
                        onVisibleChange={this.handleVisibleChange.bind(this, index)}
                        content={
                          <ProForm
                            labelCol={{ span: 4 }}
                            layout="horizontal"
                            onFinish={async (values) => {
                              this.editToDoContent(index, values);
                              this.closePopUp();
                              // this.setState({
                              //   popVisible: false,
                              //   atPop: -1,
                              // });
                            }}
                            submitter={{
                              searchConfig: {
                                submitText: '保存',
                              },
                              render: (_, dom) => dom.pop(),
                              submitButtonProps: {
                                size: 'middle',
                              },
                            }}
                          >
                            <Form.Item name="timePicker">
                              <RangePicker
                                size="small"
                                disabledDate={this.disabledDate}
                                format="YYYY/MM/DD HH:mm"
                                showTime={{
                                  defaultValue: [moment(), moment()],
                                }}
                                defaultValue={
                                  item.start_time === undefined || item.end_time === undefined
                                    ? null
                                    : [moment(item.start_time), moment(item.end_time)]
                                }
                              />
                            </Form.Item>
                            <Form.Item name="description">
                              <TextArea
                                showCount
                                maxLength={100}
                                rows={4}
                                placeholder={'暂无描述'}
                                defaultValue={item.description}
                              />
                            </Form.Item>
                          </ProForm>
                        }
                      >
                        <Button
                          shape="circle"
                          size="small"
                          icon={<EllipsisOutlined />}
                          disabled={item.finished}
                        />
                      </Popover>
                    </Tooltip>
                  }
                  disabled={item.finished}
                  value={
                    todoListStore.isEditing && todoListStore.atEditing === index
                      ? todoListStore.tmpEditValue
                      : item.title
                  }
                  onChange={this.handleChangeContent.bind(this, index)}
                  onPressEnter={this.handlePressEnter.bind(this, index)}
                  onFocus={this.handleFocus.bind(this, index)}
                  onBlur={this.handleBlur.bind(this)}
                />
                <span style={{ display: 'flex', marginTop: 4, marginLeft: 0 }}>
                  <Button
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={this.deleteToDo.bind(this, index)}
                  />
                </span>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
