import React, { Component } from 'react';
import ProfileStore from '@/pages/Profile/model';
import { Descriptions } from 'antd';
import { inject, observer } from 'mobx-react';

interface ProfileProps {
  profileSore: ProfileStore;
}

const { Item } = Descriptions;

@inject('profileStore')
@observer
export default class Profile extends Component<ProfileProps, any> {
  render() {
    const { profileStore } = this.props;
    return (
      <Descriptions title={'个人信息'} bordered>
        <Item label={'姓名'}>{profileStore.name}</Item>
        <Item label={'学号'}>{profileStore.id}</Item>
        <Item label={'专业'}>{profileStore.department}</Item>
      </Descriptions>
    );
  }
}

//
