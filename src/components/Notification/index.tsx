import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { NotifyListStore } from './model';
import { List, Modal, Button } from 'antd';
import { FileTextTwoTone, NotificationTwoTone } from '@ant-design/icons';
import styles from './style.less';
import { action, observable } from 'mobx';

interface NotifyProps {
  notifyListStore: NotifyListStore;
}

function NotifyIcon(props: { type: string; twoToneColor: string }) {
  return props.type === 'homework' ? (
    <FileTextTwoTone className={styles.icon} twoToneColor={props.twoToneColor} />
  ) : (
    <NotificationTwoTone className={styles.icon} twoToneColor={props.twoToneColor} />
  );
}

@inject('notifyListStore')
@observer
export default class NotifyList extends Component<NotifyProps> {
  componentDidMount() {
    this.props.notifyListStore.fetchNotify();
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

  @action getColor = (id: number, type: string) => {
    const valid = '#b7eb8f';
    const urgent = '#ffccc7';
    const overdue = '#bfbfbf';
    if (type !== 'homework') return valid;
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
    const { statusList } = this.props.notifyListStore;

    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={statusList}
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
                          style={{ backgroundColor: this.getColor(item.status, item.type) }}
                        />
                        <NotifyIcon
                          type={item.type}
                          twoToneColor={this.getColor(item.status, item.type)}
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
