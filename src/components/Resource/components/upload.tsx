import React from 'react';
import { message } from 'antd';
import styles from '../style.less';
import request from '@/utils/request';

class FileInput extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  fileInput: any;

  handleSubmit(event: any) {
    if (this.fileInput.current.files[0]) {
      event.preventDefault();
      message.success(`Selected file - ${this.fileInput.current.files[0].name}`);
      const formData = new FormData();
      formData.append('section_id', 'cs229_2021_0_03');
      formData.append('title', 'title_test');
      formData.append('filename', 'name_test');
      formData.append('type', 0);
      formData.append('content', this.fileInput.current.files[0]);

      request(`/api/resource/create`, {
        method: 'post',
        requestType: 'form',
        data: formData,
      });
    } else {
      message.error('还没有上传文件');
    }
  }

  render() {
    return (
      <>
        <h3>上传文件</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="file" ref={this.fileInput} className={styles.input} />
          <button type="submit" className={styles.submit}>
            上 传
          </button>
        </form>
      </>
    );
  }
}

export default FileInput;
