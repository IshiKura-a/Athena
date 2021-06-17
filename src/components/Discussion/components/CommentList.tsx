import React from 'react';
import { List, Avatar } from 'antd';
import styles from '../style.less';

const CommentList = (props: any) => {
  return (
    <>
      <List
        style={{ backgroundColor: '#fafafa', marginBottom: '30px' }}
        dataSource={props.list}
        renderItem={(item) => (
          <List.Item style={{ marginLeft: '20px' }}>
            <List.Item.Meta
              style={{ margin: '0' }}
              avatar={<Avatar src={item.avatar} />}
              description={item.content}
              title={<p>{item.title}</p>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CommentList;
