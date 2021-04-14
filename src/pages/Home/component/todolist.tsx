import React, { Component } from 'react';
import type { ToDo } from '@/pages/Home/type';
import {
  Alert,
  Button,
  Card,
  Col,
  Input,
  List,
  Popover,
  DatePicker,
  Row,
  Switch,
  Tooltip,
  Form,
  FormInstance,
} from 'antd';
import styles from './style.less';
import HomePageStore from '../model';
import { event } from '@/.umi/plugin-locale/locale';
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment';
import { range } from 'lodash';
import ProForm from '@ant-design/pro-form';
import { visible } from 'chalk';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface TodoProps {
  homePageStore: HomePageStore;
}

@observer
export default class TodoList extends Component<TodoProps> {
  @observable inputValue = '';
  @observable tmpEditValue = '';
  @observable isEditing = false;
  @observable atEditing = -2;
  hasDelete = false;
  state = {
    popVisible: false,
    atPop: -1,
  };

  constructor(props: TodoProps | Readonly<TodoProps>) {
    super(props);
    this.init();
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  @computed get todoList() {
    return this.props.homePageStore.todoList;
  }

  @computed get token() {
    return this.props.homePageStore.baseStore.token;
  }

  @action async init() {
    await this.props.homePageStore.fetchToDoList();
  }

  @action handleFocus = (index: number) => {
    if (index >= 0) {
      this.atEditing = index;
      this.tmpEditValue = this.props.homePageStore.todoList[index].title;
    }
  };

  @action handleBlur = () => {
    this.inputValue = '';
    this.tmpEditValue = '';
    this.isEditing = false;
    this.atEditing = -2;
  };

  @action handleVisibleChange = (index: number, visible) => {
    this.setState({
      popVisible: visible,
      atPop: index,
    });
  };

  @action handleChangeContent = (index: number, event) => {
    if (index === -1) this.inputValue = event.target.value;
    else {
      this.setState({
        atEditing: index,
      });
      this.isEditing = true;
      this.tmpEditValue = event.target.value;
    }
  };

  @action handlePressEnter = (index: number, event) => {
    this.isEditing = false;
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
    this.inputValue = '';
    this.props.homePageStore.addToDo({ token: this.token, title });
  };

  @action finishToDo = (index: number) => {
    this.props.homePageStore.finishToTo(index);
  };

  @action editToDoTitle = (index: number) => {
    const title = this.tmpEditValue;
    this.props.homePageStore.editToDo(index, {
      title,
      token: this.token,
      id: this.todoList[index].id,
    });
    this.tmpEditValue = '';
  };

  @action editToDoContent = (index: number, values) => {
    if (Object.keys(values).length > 0) {
      this.props.homePageStore.editToDo(index, {
        token: this.token,
        id: this.todoList[index].id,
        start_time: values.timePicker[0],
        end_time: values.timePicker[1],
        description: values.description,
      });
    }
  };

  @action deleteToDo = (index: number) => {
    this.props.homePageStore.deleteToDo(index, { token: this.token, id: this.todoList[index].id });
  };

  render() {
    return (
      <Card title={<Alert message={'待办事项'} type="info" showIcon banner />}>
        <Input
          maxLength={20}
          name="todoInput"
          bordered={false}
          style={{
            marginBottom: 10,
            borderBottomColor: '#AECCF2',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
          }}
          className={styles.todoInput}
          placeholder="回车添加事项"
          value={this.inputValue}
          onChange={this.handleChangeContent.bind(this, -1)}
          onPressEnter={this.handlePressEnter.bind(this, -1)}
          onBlur={this.handleBlur.bind(this)}
        />
        <List
          size="small"
          bordered
          className={styles.todoList}
          dataSource={this.props.homePageStore.todoList}
          renderItem={(item, index) => (
            <List.Item key={index} role={undefined} className="todoItem">
              <Row gutter={3}>
                <Col span={24}>
                  <Checkbox
                    style={{ marginTop: 5, marginRight: 5 }}
                    checked={item.finished}
                    onClick={this.finishToDo.bind(this, index)}
                  />
                  <Input
                    style={{ width: 245, marginRight: 5 }}
                    suffix={
                      <Tooltip
                        title={
                          item.description === undefined || item.description === ''
                            ? '暂无描述'
                            : item.description
                        }
                        style={{ position: 'absolute', right: 0 }}
                      >
                        <Popover
                          title="请选择"
                          trigger="click"
                          visible={this.state.atPop === index && this.state.popVisible}
                          onVisibleChange={this.handleVisibleChange.bind(this, index)}
                          content={
                            <ProForm
                              labelCol={{ span: 4 }}
                              layout="horizontal"
                              onFinish={async (values) => {
                                this.editToDoContent(index, values);
                                this.setState({
                                  popVisible: false,
                                  atPop: -1,
                                });
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
                                  format="YYYY/MM/DD HH:mm:ss"
                                  showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment(), moment()],
                                  }}
                                  defaultPickerValue={[
                                    moment(item.start_time),
                                    moment(item.end_time),
                                  ]}
                                />
                              </Form.Item>
                              <Form.Item name="description">
                                <TextArea
                                  showCount
                                  maxLength={100}
                                  rows={4}
                                  placeholder="请输入描述"
                                >
                                  {item.description}
                                </TextArea>
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
                      this.isEditing && this.atEditing === index ? this.tmpEditValue : item.title
                    }
                    onChange={this.handleChangeContent.bind(this, index)}
                    onPressEnter={this.handlePressEnter.bind(this, index)}
                    onFocus={this.handleFocus.bind(this, index)}
                    onBlur={this.handleBlur.bind(this)}
                  />
                  <Button
                    shape="circle"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={this.deleteToDo.bind(this, index)}
                  />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
