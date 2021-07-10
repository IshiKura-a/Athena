import React, { useState } from 'react';
import styles from '../style.less';
import { Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface IProps {
  handleSubmit: any;
}

const FileInput = (props: IProps) => {
  const [fileResult, setFile] = useState(undefined);

  const handleSubmitFile = (event: any) => {
    event.preventDefault();
    if (fileResult !== undefined) {
      props.handleSubmit(fileResult.name, fileResult.originFileObj);
    } else {
      message.error('还没有上传文件');
    }
  };

  const onUploadChange = ({ file }) => {
    if (file.status === 'done' || file.status === 'error') {
      message.success(`${file.name} uploaded successfully`);
      setFile(file);
    }
  };

  return (
    <>
      <h3>上传文件</h3>
      <Upload onChange={onUploadChange}>
        <Button icon={<UploadOutlined />}>添加附件</Button>
      </Upload>
      <Button type="primary" className={styles.submit} onClick={handleSubmitFile}>
        上传
      </Button>
    </>
  );
};

export default FileInput;
