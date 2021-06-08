import { Component } from 'react';
import { Card, Tabs, List } from 'antd';
import { observer } from 'mobx-react';
import { InstuctorFeats } from '@/pages/Section/[sectionID]/type';
import styles from './style.less';
import type { SignIn } from '@/pages/Section/[sectionID]/model';
import type SectionStore from '@/pages/Section/[sectionID]/model';

const { TabPane } = Tabs;

interface InstructorProps {
  sectionStore: SectionStore;
}

const tabCallBack = (key: any) => {
  console.log(key);
};

@observer
export default class InstructorFeat extends Component<InstructorProps, any> {
  render() {
    const { sectionStore } = this.props;
    return (
      <>
        <Tabs defaultActiveKey={InstuctorFeats.Named} onChange={tabCallBack}>
          <TabPane tab={'点名'} key={0}>
            <Card className={styles.tabPane}>
              <List
                dataSource={sectionStore.signInList}
                renderItem={(item: SignIn) => (
                  <List.Item>
                    <span>{item.id}</span>
                    <span>{item.description}</span>
                    <span>{item.expireAt}</span>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>
          <TabPane tab={'批改作业'} key={1}>
            <Card className={styles.tabPane}>//TODO instructor pigaizuoye</Card>
          </TabPane>
          <TabPane tab={'讨论区'} key={2}>
            <Card className={styles.tabPane}>//TODO</Card>
          </TabPane>
        </Tabs>
      </>
    );
  }
}
