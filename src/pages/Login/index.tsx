import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { Component } from 'react';
import ProForm, {
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form';
import { FormattedMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import type { LoginParamsType } from '@/services/login';

import styles from './index.less';
import { inject, observer } from 'mobx-react';
import type LoginStore from './model';
import { RoleType } from './model';
import { formatMessage } from '@@/plugin-locale/localeExports';

export type LoginProps = {
  loginStore: LoginStore;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

@inject('loginStore')
@observer
export default class Login extends Component<LoginProps, any> {
  handleSubmit = (values: LoginParamsType) => {
    const { login, userLogin } = this.props.loginStore;
    login({ ...values, loginType: userLogin.loginType! });
  };

  setLoginType = (value: string) => {
    this.props.loginStore.setLoginType(value);
  };

  setType = (e: any) => {
    this.props.loginStore.baseStore.setType(e);
  };

  render() {
    const { userLogin = {}, inSubmitting } = this.props.loginStore;
    const { loginType } = userLogin;

    return (
      <div className={styles.main}>
        <ProForm
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: inSubmitting,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          onFinish={(values) => {
            this.setType(values.type);
            this.handleSubmit(values as LoginParamsType);
            return Promise.resolve();
          }}
        >
          <Tabs activeKey={loginType} onChange={this.setLoginType}>
            <Tabs.TabPane
              key="account"
              tab={formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账户密码登录',
              })}
            />
            <Tabs.TabPane
              key="mobile"
              tab={formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: '手机号登录',
              })}
            />
          </Tabs>

          {userLogin.message === 'error' && loginType === 'account' && !inSubmitting && (
            <LoginMessage
              content={formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误（admin/ant.design)',
              })}
            />
          )}
          {loginType === 'account' && (
            <>
              <ProFormText
                name="aid"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入id'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {userLogin.message === 'error' && loginType === 'mobile' && !inSubmitting && (
            <LoginMessage content="验证码错误" />
          )}
          {loginType === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: '手机号',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="请输入手机号！"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                        defaultMessage="手机号格式错误！"
                      />
                    ),
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: '请输入验证码',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: '获取验证码',
                    })}`;
                  }
                  return formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: '获取验证码',
                  });
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="请输入验证码！"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={async (mobile) => {
                  const result = await getFakeCaptcha(mobile);
                  if (result === false) {
                    return;
                  }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}

          <div className={styles.line}>
            <ProFormRadio.Group
              name={'type'}
              initialValue={this.props.loginStore.baseStore.type}
              radioType={'button'}
              options={[
                { label: '学生', value: RoleType.student },
                {
                  label: '老师',
                  value: RoleType.instructor,
                },
              ]}
            />
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </ProForm>
      </div>
    );
  }
}
