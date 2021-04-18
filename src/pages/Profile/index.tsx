// useState 是改变状态的开关
import { Component, useState } from 'react';
import ProfileStore from '@/pages/Profile/model';
// import { Descriptions } from 'antd';
import { inject, observer } from 'mobx-react';
import { PageContainer } from '@ant-design/pro-layout';
import { Typography, Card, message, Alert} from 'antd';
import { Row, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
// import { action, computed, observable } from 'mobx';

const { Paragraph } = Typography;

const Name = (props:any) => {
  return (
      <Paragraph copyable>
        {props.name}
      </Paragraph>
  );
};

const StuId = (props:any) => {
  return (
      <Paragraph copyable>
        {props.id}
      </Paragraph>
  );
};

const Department = (props:any) => {
  return (
      <Paragraph copyable>
        {props.department}
      </Paragraph>
  );
};

const Motto = () => {
  const [editableStr, setEditableStr] = useState('mbox so hard');
 
  return (
      <Paragraph editable={{ onChange: setEditableStr, icon: [<SmileOutlined key="copy-icon" />] }}>
        {editableStr}
      </Paragraph>
  );
};

interface ProfileProps {
  profileStore: ProfileStore;
}

@inject('profileStore')
@observer
export default class Profile extends Component<ProfileProps, any> {
  
  checkValidPhone(phoneInput:string){
    if(isNaN(phoneInput)){
      return 0;
    }
    else if((phoneInput + '').length != 11){
      return -1;
    }
    return 1;
  }

  checkValidEmail(emailInput:string){
    if(emailInput.indexOf("@") === -1 ){
      return 0;
    }
    return 1;
  }

  info = (msg:string) => {
    message.info(msg);
  };

  render() {
    // 两个参数：当前状态，状态更新函数
    // const { profileStore } = this.props;
    const { name, id, department, telephone, email } = this.props.profileStore;
    let telephoneVisible = telephone;
    let emailVisible = email;

    return (
      <PageContainer> 
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="姓名"> <Name name = {name} /> </Card>
          </Col>
          <Col span={8}>
            <Card title="学号"> <StuId id = {id}/>  </Card>
          </Col>
          <Col span={8}>
            <Card title="专业"> <Department department = {department}/>  </Card>
          </Col>
          <Col span={8}>
            <Card title="手机号码"> 
              <Paragraph editable = {{
                          onChange:(telephoneInput:string)=>{
                            // console.log('edit telephone:',s), 
                            if( this.checkValidPhone(telephoneInput) === 1){
                              telephoneVisible = telephoneInput,
                              this.props.profileStore.editTelephone(telephoneInput),
                              this.forceUpdate()
                            }
                            else if( this.checkValidPhone(telephoneInput) === 0){
                              this.info("Only numbers are valid")
                            }
                            else{
                              this.info("The length is not valid");
                            };
                          },
                          maxLength: 11,
                }}
              >
              {telephoneVisible}
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="邮箱" > 
              <Paragraph editable = {{
                          onChange:(emailInput:string)=>{
                            if( this.checkValidEmail(emailInput) === 1 ){
                              emailVisible = emailInput,
                              this.props.profileStore.editEmail(emailInput),
                              this.forceUpdate();
                            }
                            else{
                              this.info("Email format is not valid");
                            }
                          },
                }}
              >
              {emailVisible}
              </Paragraph>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="个性签名"> <Motto/> </Card>
          </Col>
        </Row>

      </PageContainer>
    );
  }
}
