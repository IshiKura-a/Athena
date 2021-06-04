import { Component } from 'react';
import { Card, List, Tabs } from 'antd';
import { observer } from 'mobx-react';
import { StudentFeat } from '@/pages/Section/type';
import styles from '@/pages/Section/component/style.less';
import type { SignIn } from '@/pages/Section/model';
import type SectionStore from '@/pages/Section/model';

const { TabPane } = Tabs;

interface StudentProps {
  sectionStore: SectionStore;
}

const tabCallBack = (key: any) => {
  console.log(key);
};

@observer
export default class StudentFeatList extends Component<StudentProps, any> {
  componentDidMount() {
    this.props.sectionStore.listSign();
  }

  render() {
    const { sectionStore } = this.props;
    return (
      <>
        <Tabs defaultActiveKey={StudentFeat.SignIn} onChange={tabCallBack}>
          <TabPane tab={'签到'} key={0}>
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
          <TabPane tab={'作业'} key={1}>
            <Card className={styles.tabPane}>student zuoye</Card>
          </TabPane>
        </Tabs>
      </>
    );
  }
}
