// useState 是改变状态的开关
import { Component } from 'react';
import type ProfileStore from '@/pages/Profile/model';
import type { ProfileParamsType } from '@/services/profile';
// import { Descriptions } from 'antd';
import { inject, observer } from 'mobx-react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './profile.less';
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
import { ExperimentTwoTone, HomeTwoTone, GiftTwoTone, HeartTwoTone } from '@ant-design/icons';
import { GenderIcon, StatusIcon, iconStyle } from '@/components/Profile/index';
import {
  dataTitle,
  checkValidPhone,
  checkValidEmail,
  checkValidQQ,
} from '@/components/Profile/data';

export interface ProfileProps {
  profileStore: ProfileStore;
}

const { Paragraph } = Typography;

@inject('profileStore')
@observer
export default class Profile extends Component<ProfileProps, any> {
  constructor(props: any) {
    super(props);
    const input_id: ProfileParamsType = { id: '3180100000' };
    this.props.profileStore.fetchData(input_id);
  }

  info(msg: string) {
    message.info(msg);
  }

  state = {
    value: this.props.profileStore.profileInfo.basic_person.status,
  };

  render() {
    const { profileStore } = this.props;
    const {
      name,
      id,
      major,
      phone,
      email,
      wechat,
      qq,
      gender,
      campus,
      birthday,
      blood_type,
      status,
      politics,
      hometown,
      nation,
      dormitory,
    } = profileStore.profileInfo.basic_person;

    let emailVisible = email;
    let telephoneVisible = phone;
    let wechatVisible = wechat;
    let qqVisible = qq;

    const { value } = this.state;

    const dataContent = [
      {
        content: name,
        editable: false,
      },
      {
        content: id,
        editable: false,
      },
      {
        content: telephoneVisible,
        editable: {
          onChange: (telephoneInput: string) => {
            const checkTelephone = checkValidPhone(telephoneInput);
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
        },
      },
      {
        content: emailVisible,
        editable: {
          onChange: (emailInput: string) => {
            const checkEmail = checkValidEmail(emailInput);
            if (checkEmail === 1) {
              emailVisible = emailInput;
              profileStore.editEmail(emailInput);
              this.forceUpdate();
            } else if (checkEmail === 0) {
              this.info('Input format is not valid.');
            }
          },
        },
      },
      {
        content: nation,
        editable: false,
      },
      {
        content: politics,
        editable: false,
      },
      {
        content: hometown,
        editable: false,
      },
      {
        content: dormitory,
        editable: false,
      },
      {
        content: wechatVisible,
        editable: {
          onChange: (wechatInput: string) => {
            wechatVisible = wechatInput;
            profileStore.editWechat(wechatInput);
            this.forceUpdate();
          },
        },
      },
      {
        content: qqVisible,
        editable: {
          onChange: (qqInput: string) => {
            const checkQQ = checkValidQQ(qqInput);
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
      },
    ];

    const data = dataTitle.map((item, index) =>
      Object.assign(
        item,
        { content: dataContent[index].content },
        { editable: dataContent[index].editable },
      ),
    );

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
                    <p className={styles.labelStyle}>性别</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={major}>
                      <div>
                        <p>
                          <ExperimentTwoTone style={iconStyle} twoToneColor="#fadb14" />
                        </p>
                      </div>
                    </Tooltip>
                    <p className={styles.labelStyle}>专业</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={campus}>
                      <div>
                        <p>
                          <HomeTwoTone style={iconStyle} twoToneColor="#69c0ff" />
                        </p>
                      </div>
                    </Tooltip>
                    <p className={styles.labelStyle}>校区</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={birthday}>
                      <div>
                        <p>
                          <GiftTwoTone style={iconStyle} twoToneColor="#69c0ff" />
                        </p>
                      </div>
                    </Tooltip>
                    <p className={styles.labelStyle}>生日</p>
                  </Card.Grid>

                  <Card.Grid style={{ textAlign: 'center', height: 150 }}>
                    <Tooltip placement="top" title={`${blood_type}型`}>
                      <div>
                        <p>
                          <HeartTwoTone style={iconStyle} twoToneColor="#ff85c0" />
                        </p>
                      </div>
                    </Tooltip>
                    <p className={styles.labelStyle}>血型</p>
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

                    <p className={styles.labelStyle}>状态</p>
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
                        <Paragraph className={styles.itemStyle}>{item.title}</Paragraph>
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

//
