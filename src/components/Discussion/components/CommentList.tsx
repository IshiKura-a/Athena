// import React from 'react';
import { List, Avatar } from 'antd';
// import { commentType } from '../model';

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
              avatar={
                <Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
              }
              description={item.content}
              title={<p>{item.user.name}</p>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CommentList;
