import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type ResourceStore from './model';
import { List, Result } from 'antd';
import { FileTextTwoTone } from '@ant-design/icons';
import styles from './style.less';
import FileInput from './components/upload';
import type { ResourceType } from './model';

interface ResourceProps {
  resourceStore: ResourceStore;
  currentLessonName: string | undefined;
}

@inject('resourceStore')
@observer
export default class Resource extends Component<ResourceProps> {
  ref: React.RefObject<any>;

  constructor(props: ResourceProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    // this.props.resourceStore.fetchResourceList('cs229_2021_0_03');
  }

  render() {
    const { currentLessonName } = this.props;

    return (
      <>
        <FileInput />

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
                <List.Item.Meta
                  avatar={<FileTextTwoTone className={styles.icon} />}
                  title={<div className={styles.title}>{item.title}</div>}
                  description={<div className={styles.description}>{item.filename}</div>}
                />
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
