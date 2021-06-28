import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { BaseStore } from '@/store';
import { observable } from 'mobx';
import { history } from 'umi';
import { Card, Col, Row, Tabs } from 'antd';
import styles from '../style.less';
import { TabKey, TabName } from '@/pages/Section/type';

const { TabPane } = Tabs;

interface IProps {
  sectionStore: BaseStore;
}

@inject('sectionStore')
@observer
export default class Section extends Component<IProps, any> {
  @observable sectionID = undefined as string | undefined;

  componentDidMount() {
    const { sectionID } = this.props.match.params;
    console.log('pa', history.location.pathname);
    this.sectionID = sectionID;
  }

  tabCallBack = (key: any) => {};

  render() {
    const { sectionStore } = this.props;

    return (
      <>
        <Row gutter={2}>
          <Col span={16}>
            <Card>
              <Tabs onChange={this.tabCallBack}>
                <TabPane tab={TabName.SignIn} key={TabKey.SignIn}>
                  <Card className={styles.tabPane}></Card>
                </TabPane>
                <TabPane tab={TabName.Hw} key={TabKey.Hw}>
                  <Card className={styles.tabPane}></Card>
                </TabPane>
                <TabPane tab={TabName.Discuss} key={TabKey.Discuss}>
                  <Card className={styles.tabPane}>//TODO</Card>
                </TabPane>

                <TabPane tab={TabName.Resource} key={TabKey.Resource}>
                  <Card className={styles.tabPane}>//TODO</Card>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col span={8}>
            <Card></Card>
          </Col>
        </Row>
      </>
    );
  }
}
