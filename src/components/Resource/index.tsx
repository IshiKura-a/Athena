import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type ResourceStore from '@/components/Resource/model';
import { List, message, Result } from 'antd';
import { FileTextTwoTone } from '@ant-design/icons';
import styles from './style.less';
import FileInput from './components/upload';
import type { ResourceType } from './model';
import { RoleType } from '@/pages/login/model';

interface ResourceProps {
  resourceStore: ResourceStore;
  currentLessonName: string | undefined;
}

@inject('resourceStore')
@observer
export default class Resource extends Component<ResourceProps, any> {
  ref: React.RefObject<any> = React.createRef();

  async componentDidMount() {
    const { resourceStore } = this.props;
  }

  handleSubmit = (name: string, content: File) => {
    if (name !== '') {
      message.success(`Selected file - ${name}`);
      this.props.resourceStore.uploadFile(name, content);
    } else {
      message.error('还没有上传文件');
    }
  };

  render() {
    const { currentLessonName } = this.props;

    return (
      <>
        {this.props.resourceStore.baseStore.type === RoleType.instructor ? (
          <FileInput handleSubmit={this.handleSubmit} />
        ) : (
          <></>
        )}

        {this.props.resourceStore.resourceList.length ? (
          <List
            header={<h3>{`${currentLessonName}文件列表`}</h3>}
            itemLayout="horizontal"
            dataSource={this.props.resourceStore.resourceList}
            renderItem={(item: ResourceType) => (
              <List.Item
                actions={[
                  <p>{item.create_time}</p>,
                  <a
                    onClick={() => {
                      this.props.resourceStore.fetchResource(item.filename, item.id);
                    }}
                  >
                    download
                  </a>,
                ]}
              >
                <div>
                  <span>
                    <FileTextTwoTone className={styles.icon} />
                  </span>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.description}>{item.filename}</div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Result status="404" title="404" subTitle="抱歉，当前文件列表为空" />
        )}
      </>
    );
  }
}
