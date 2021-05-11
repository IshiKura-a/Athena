// useState 是改变状态的开关
import { Component } from 'react';
import type ProfileStore from '@/pages/Profile/model';
// import { Descriptions } from 'antd';
import { inject, observer } from 'mobx-react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Typography,
  Card,
  message,
  Avatar,
  Divider,
  Popover,
  Radio,
  Space,
  Row,
  Col,
  List,
  Tooltip,
} from 'antd';
import {
  ExperimentTwoTone,
  HomeTwoTone,
  GiftTwoTone,
  SmileTwoTone,
  HeartTwoTone,
  BookTwoTone,
  CustomerServiceTwoTone,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';

// import { action, computed, observable } from 'mobx';
// import styles from './profile.less';

const { Paragraph } = Typography;

const FemaleSvg = () => (
  <svg width="4em" height="4em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M712.8 548.8c53.6-53.6 83.2-125 83.2-200.8 0-75.9-29.5-147.2-83.2-200.8C659.2 93.6 587.8 64 512 64s-147.2 29.5-200.8 83.2C257.6 200.9 228 272.1 228 348c0 63.8 20.9 124.4 59.4 173.9 7.3 9.4 15.2 18.3 23.7 26.9 8.5 8.5 17.5 16.4 26.8 23.7 39.6 30.8 86.3 50.4 136.1 57V736H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h114v140c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V812h114c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H550V629.5c61.5-8.2 118.2-36.1 162.8-80.7zM512 556c-55.6 0-107.7-21.6-147.1-60.9C325.6 455.8 304 403.6 304 348s21.6-107.7 60.9-147.1C404.2 161.5 456.4 140 512 140s107.7 21.6 147.1 60.9C698.4 240.2 720 292.4 720 348s-21.6 107.7-60.9 147.1C619.7 534.4 567.6 556 512 556z"></path>
  </svg>
);

const MaleSvg = () => (
  <svg width="4em" height="4em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M895.547475 98.133333H585.50303c-16.678788 0-30.125253 13.446465-30.125252 30.125253s13.446465 30.125253 30.125252 30.125252h238.286869L680.662626 301.511111c-63.870707-54.30303-144.161616-84.040404-228.977778-84.040404-94.513131 0-183.466667 36.719192-250.311111 103.692929C134.4 388.137374 97.680808 476.961616 97.680808 571.474747s36.719192 183.337374 103.692929 250.311112 155.79798 103.692929 250.311111 103.692929 183.337374-36.719192 250.311112-103.692929c66.844444-66.973737 103.692929-155.79798 103.692929-250.311112 0-84.169697-29.090909-163.684848-82.618182-227.296969l142.351515-142.351515V438.30303c0 16.678788 13.446465 30.125253 30.125253 30.125253s30.125253-13.446465 30.125252-30.125253V128.258586c0-16.678788-13.575758-30.125253-30.125252-30.125253zM451.684848 865.228283C289.680808 865.228283 157.931313 733.478788 157.931313 571.474747s131.749495-293.753535 293.753535-293.753535c79.90303 0 152.307071 32.064646 205.187879 83.911111 0.905051 1.163636 1.810101 2.327273 2.844445 3.232323 1.034343 1.034343 2.19798 1.939394 3.10303 2.715152 50.941414 52.880808 82.488889 124.767677 82.488889 203.894949 0.129293 162.00404-131.749495 293.753535-293.624243 293.753536z m0 0"></path>
  </svg>
);

const FemaleIcon = (props) => <Icon component={FemaleSvg} {...props} />;
const MaleIcon = (props) => <Icon component={MaleSvg} {...props} />;

function GenderIcon(props) {
  const gender = props.gender.toString();
  if (gender === '男') {
    return (
      <p>
        <MaleIcon style={{ color: '#69c0ff' }} />
      </p>
    );
  }
  if (gender === '女') {
    return (
      <p>
        <FemaleIcon style={{ color: 'hotpink' }} />
      </p>
    );
  }
  return <p></p>;
}

interface ProfileProps {
  profileStore: ProfileStore;
}

const iconStyle = {
  fontSize: '50px',
};

const labelStyle = {
  fontSize: '15px',
  color: '#595959',
};

const itemStyle = {
  color: '#bfbfbf',
};

function StatusIcon(props) {
  const status = props.status.toString();
  if (status === 0) {
    return (
      <p>
        <BookTwoTone style={iconStyle} twoToneColor="#95de64" />
      </p>
    );
  }
  if (status === 1) {
    return (
      <p>
        <CustomerServiceTwoTone style={iconStyle} twoToneColor="#95de64" />
      </p>
    );
  }
  if (status === 2) {
    return (
      <p>
        <SmileTwoTone style={iconStyle} twoToneColor="#95de64" />
      </p>
    );
  }
  return <p></p>;
}

@inject('profileStore')
@observer
export default class Profile extends Component<ProfileProps, any> {
  checkValidPhone(phoneInput: string) {
    if (Number.isNaN(phoneInput)) {
      // 输入的不是数字
      return 0;
    }
    if (phoneInput.length !== 11) {
      // 输入的位数不对
      return -1;
    }
    return 1;
  }

  checkValidEmail(emailInput: string) {
    if (emailInput.indexOf('@') === -1) {
      // 没有输入@
      return 0;
    }
    return 1;
  }

  checkValidQQ(qqInput: string) {
    if (Number.isNaN(qqInput)) {
      return 0;
    }
    if (qqInput.length < 5 || qqInput.length > 11) {
      return -1;
    }
    return 1;
  }

  info = (msg: string) => {
    message.info(msg);
  };

  state = {
    value: this.props.profileStore.status,
  };

  render() {
    // 两个参数：当前状态，状态更新函数
    const { profileStore } = this.props;
    const {
      name,
      id,
      department,
      telephone,
      email,
      wechat,
      qq,
      gender,
      campus,
      birthday,
      blood,
      status,
    } = this.props.profileStore;
    // let telephoneVisible = telephone;

    let emailVisible = email;
    let telephoneVisible = telephone;
    let wechatVisible = wechat;
    let qqVisible = qq;
    // let statusVisible = status;

    const { value } = this.state;

    const data = [
      {
        title: '姓 名',
        content: name,
        editable: false,
        copyable: true,
      },
      {
        title: '学 号',
        content: id,
        editable: false,
        copyable: true,
      },
      {
        title: '手 机',
        content: telephoneVisible,
        editable: {
          onChange: (telephoneInput: string) => {
            const checkTelephone = this.checkValidPhone(telephoneInput);
            if (checkTelephone === 1) {
              telephoneVisible = telephoneInput;
              profileStore.editTelephone(telephoneInput);
              this.forceUpdate();
            } else if (checkTelephone === 0) {
              this.info('Input should be number.');
            } else if (checkTelephone === -1) {
              this.info('Input length is not valid.');
            }
          },
          // icon:<SmileTwoTone></SmileTwoTone>
        },
        copyable: false,
      },
      {
        title: '邮 箱',
        content: emailVisible,
        editable: {
          onChange: (emailInput: string) => {
            const checkEmail = this.checkValidEmail(emailInput);
            if (checkEmail === 1) {
              emailVisible = emailInput;
              profileStore.editEmail(emailInput);
              this.forceUpdate();
            } else if (checkEmail === 0) {
              this.info('Input format is not valid.');
            }
          },
        },
        copyable: false,
      },
      {
        title: '民 族',
        content: '汉族',
        editable: false,
        copyable: true,
      },
      {
        title: '政治面貌',
        content: '共青团员',
        editable: false,
        copyable: true,
      },
      {
        title: '生源地',
        content: '西安',
        editable: false,
        copyable: true,
      },
      {
        title: '寝室号',
        content: '八舍301',
        editable: false,
        copyable: true,
      },
      {
        title: '微信号码',
        content: wechatVisible,
        editable: {
          onChange: (wechatInput: string) => {
            wechatVisible = wechatInput;
            profileStore.editWechat(wechatInput);
            this.forceUpdate();
          },
        },
        copyable: false,
      },
      {
        title: 'QQ号码',
        content: qqVisible,
        editable: {
          onChange: (qqInput: string) => {
            const checkQQ = this.checkValidQQ(qqInput);
            if (checkQQ === 1) {
              qqVisible = qqInput;
              profileStore.editQQ(qqInput);
              this.forceUpdate();
            } else if (checkQQ === 0) {
              this.info('Input should be number.');
            } else if (checkQQ === -1) {
              this.info('Input length is not valid.');
            }
          },
        },
        copyable: false,
      },
    ];

    return (
      <PageContainer>
        <Row justify="center" align="top" gutter={[16, 16]}>
          <Col span={12}>
            <Card style={{ height: 750 }}>
              <Row justify="center">
                <Avatar
                  style={{ width: 340, height: 340 }}
                  // bordered={true}
                  src={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      width={240}
                      height={240}
                    />
                  }
                ></Avatar>
              </Row>
              <Divider></Divider>

              <Row justify="center">
                <Card bordered={true}>
                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={gender}>
                      <div>
                        <GenderIcon gender={gender} />
                      </div>
                    </Tooltip>
                    <p style={labelStyle}>性别</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={department}>
                      <div>
                        <p>
                          <ExperimentTwoTone style={iconStyle} twoToneColor="#fadb14" />
                        </p>
                      </div>
                    </Tooltip>
                    <p style={labelStyle}>专业</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={campus}>
                      <div>
                        <p>
                          <HomeTwoTone style={iconStyle} twoToneColor="#69c0ff" />
                        </p>
                      </div>
                    </Tooltip>
                    <p style={labelStyle}>校区</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={birthday}>
                      <div>
                        <p>
                          <GiftTwoTone style={iconStyle} twoToneColor="#69c0ff" />
                        </p>
                      </div>
                    </Tooltip>
                    <p style={labelStyle}>生日</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={`${blood}型`}>
                      <div>
                        <p>
                          <HeartTwoTone style={iconStyle} twoToneColor="#ff85c0" />
                        </p>
                      </div>
                    </Tooltip>
                    <p style={labelStyle}>血型</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Popover
                      placement="right"
                      content={
                        <Radio.Group
                          onChange={(inputStatus) => {
                            // console.log('radio checked', inputStatus.target.value);
                            this.setState({
                              value: inputStatus.target.value,
                            });
                            // 改变单选的状态
                            profileStore.editStatus(inputStatus.target.value);
                            // 改变本地的数据
                            this.forceUpdate();
                            // 强制页面更新
                          }}
                          value={value}
                        >
                          <Space direction="vertical">
                            <Radio value={0}>学习</Radio>
                            <Radio value={1}>摸鱼</Radio>
                            <Radio value={2}>睡觉</Radio>
                          </Space>
                        </Radio.Group>
                      }
                    >
                      <div>
                        <StatusIcon status={status} />
                      </div>
                    </Popover>

                    <p style={labelStyle}>状态</p>
                  </Card.Grid>
                </Card>
              </Row>
            </Card>
          </Col>

          <Col span={12}>
            <Card style={{ height: 750 }}>
              <List
                size="large"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Row gutter={[16, 0]}>
                      <Col flex={2}>
                        <Paragraph style={itemStyle}>{item.title}</Paragraph>
                      </Col>
                      <Col flex={8}>
                        <Paragraph editable={item.editable} copyable={item.copyable}>
                          {item.content}
                        </Paragraph>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </PageContainer>
    );
  }
}
