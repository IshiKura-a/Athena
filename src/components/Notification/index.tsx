import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { NotifyListStore } from './model';
import { List, Modal, Button } from 'antd';
import { FileTextTwoTone } from '@ant-design/icons';
import styles from './style.less';
import { action, observable } from 'mobx';
import { bold } from 'chalk';

interface NotifyProps {
  notifyListStore: NotifyListStore;
}

@inject('notifyListStore')
@observer
export default class NotifyList extends Component<NotifyProps> {
  componentDidMount() {
    this.props.notifyListStore.fetchNotify();
    console.log('component', this.props.notifyListStore.statuslist.length);
  }

  @observable isModalVisible = false;
  @observable showContent = '';
  @observable showTitle = '';

  @action showModal = (content: string, title: string) => {
    this.showContent = content;
    this.showTitle = title;
    this.isModalVisible = true;
  };

  @action handleOk = () => {
    this.isModalVisible = false;
  };

  @action handleCancel = () => {
    this.isModalVisible = false;
  };

  @action getColor = (id: number) => {
    const valid = '#b7eb8f';
    const urgent = '#ffccc7';
    const overdue = '#bfbfbf';
    let labelColor = '';
    switch (id) {
      case -1:
        labelColor = overdue;
        break;
      case 0:
        labelColor = urgent;
        break;
      case 1:
        labelColor = valid;
        break;
      default:
        labelColor = overdue;
        break;
    }
    return labelColor;
  };

  render() {
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={this.props.notifyListStore.statuslist}
          renderItem={(item) => (
            <List.Item extra={<p className={styles.date}>{item.time}</p>}>
              <Button
                type="text"
                onClick={() => {
                  this.showModal(item.description, item.title);
                }}
                className={styles.button}
              >
                <List.Item.Meta
                  avatar={
                    <>
                      <div className={styles.content}>
                        <div
                          id={styles.bar}
                          style={{ backgroundColor: this.getColor(item.status) }}
                        />
                        <FileTextTwoTone
                          className={styles.icon}
                          twoToneColor={this.getColor(item.status)}
                        />
                      </div>
                    </>
                  }
                  title={
                    <div
                      className={styles.describe}
                      style={{ fontSize: '17px', fontWeight: 'bold', color: '#434343' }}
                    >
                      {item.title}
                    </div>
                  }
                  description={<p className={styles.describe}>{item.description}</p>}
                />
              </Button>
            </List.Item>
          )}
        />
        <Modal
          title={this.showTitle}
          visible={this.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.showContent}</p>
        </Modal>
      </>
    );
  }
}
