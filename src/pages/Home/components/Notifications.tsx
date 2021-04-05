/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { connect, ConnectProps, Dispatch } from 'umi';
import React, { Component } from 'react';
import { Avatar, List } from 'antd';
import type { notificationModelState } from 'src/models/notifications';
import { render } from 'react-dom';

export interface NotificationProps extends ConnectProps {
  data: notificationModelState;
  dispatch: Dispatch;
}

class Notifications extends Component<NotificationProps> {
  getNotifications = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'notification/getRemote',
      payload: {},
    });
  };
  render() {
    return {
      // const {data} = this.props.data;
      // <List
      //       dataSource={data}
      //       renderItem={
      //         item=>(
      //           <List.Item>
      //             <List.Item.Meta
      //               avatar={<Avatar src={item.avatar}/>}
      //               title={item.class}
      //               description={(item.endDate==="")?item.startDate:`${item.startDate}~${item.endDate}`}/>
      //               <br/>
      //               {item.content}
      //           </List.Item>
      //         )
      //       }/>
    };
  }
}

const mapStateToProps = (state: NotificationProps) => {
  return {
    data: state.data,
    dispatch: state.dispatch,
  };
};
export default Notification;
// connect(mapStateToProps)(Notifications);
