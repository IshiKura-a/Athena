import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import type { DiscussionStore } from './model';
import { message, List, Space, Avatar, Modal, Input, Button } from 'antd';
import { StarOutlined, MessageOutlined } from '@ant-design/icons';
import { action, observable } from 'mobx';
import CommentList from './components/CommentList';

interface DisProps {
  discussionStore: DiscussionStore;
}

@inject('discussionStore')
@observer
export default class Discussion extends Component<DisProps> {
  ref: React.RefObject<any>;

  constructor(props: DisProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.discussionStore.fetchDiscuss();
    this.props.discussionStore.getCommentLength;
  }

  @observable isModalVisible = false;
  @observable replyContent = '';
  @observable replyId = 0;
  @observable commentContent = '';

  @action showModal = (id: number) => {
    return () => {
      this.replyId = id;
      this.isModalVisible = true;
    };
  };

  @action handleOk = () => {
    return () => {
      if (this.replyContent !== '') {
        this.isModalVisible = false;
        this.props.discussionStore.addReply(this.replyContent, this.replyId);
        message.info('发布回复成功');
      } else {
        message.info('还没有写任何回复内容');
      }
    };
  };

  @action handleCancel = () => {
    this.isModalVisible = false;
  };

  @action updateReply = (event: any) => {
    const evt = window.event || event;
    this.replyContent = evt.target.value;
  };

  @action updateComment = (event: any) => {
    const evt = window.event || event;
    this.commentContent = evt.target.value;
  };

  @action postComment = () => {
    return () => {
      if (this.commentContent !== '') {
        this.props.discussionStore.addComment(this.commentContent);
        this.forceUpdate();
        message.info('发布讨论成功');
      } else {
        message.info('还没有写任何讨论内容');
      }
    };
  };

  render() {
    const IconText = ({ id, icon, text, onClick }) => (
      <div id={id}>
        <Space
          onClick={onClick}
          onMouseEnter={() => {
            document.getElementById(id).style.color = '#1890ff';
          }}
          onMouseLeave={() => {
            document.getElementById(id).style.color = '#8c8c8c';
          }}
        >
          {React.createElement(icon)}
          {text}
        </Space>
      </div>
    );

    return (
      <>
        <div style={{ marginBottom: '50px' }}>
          <Input.TextArea
            allowClear={true}
            id="input"
            rows={4}
            placeholder="在讨论区发表你的看法吧..."
            onChange={this.updateComment}
          ></Input.TextArea>
          <Button type="primary" onClick={this.postComment()} style={{ marginTop: '10px' }}>
            确认
          </Button>
        </div>

        <List
          itemLayout="vertical"
          dataSource={this.props.discussionStore.list}
          renderItem={(item) => (
            <>
              <List.Item
                key={item.title}
                actions={[
                  <IconText id={`star${item.id}`} icon={StarOutlined} text="0" />,
                  <IconText
                    id={`message${item.id}`}
                    icon={MessageOutlined}
                    text={this.props.discussionStore.replyListLength[item.id]}
                    onClick={this.showModal(item.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <a href={item.href} style={{ fontWeight: 'bold' }}>
                      {item.title}
                    </a>
                  }
                />
                {item.content}
              </List.Item>
              <CommentList list={item.replyList} />
            </>
          )}
        />
        <Modal
          title="回复"
          visible={this.isModalVisible}
          onOk={this.handleOk()}
          onCancel={this.handleCancel}
        >
          <Input.TextArea
            allowClear={true}
            id="input"
            rows={4}
            placeholder="留下你的评论吧..."
            onChange={this.updateReply}
          ></Input.TextArea>
        </Modal>
      </>
    );
  }
}
