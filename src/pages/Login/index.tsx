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
                defaultMessage: '??????????????????',
              })}
            />
            <Tabs.TabPane
              key="mobile"
              tab={formatMessage({
                id: 'pages.login.phoneLogin.tab',
                defaultMessage: '???????????????',
              })}
            />
          </Tabs>

          {userLogin.message === 'error' && loginType === 'account' && !inSubmitting && (
            <LoginMessage
              content={formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '????????????????????????admin/ant.design)',
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
                placeholder={'?????????id'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="??????????????????!"
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
                placeholder={'???????????????'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="??????????????????"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {userLogin.message === 'error' && loginType === 'mobile' && !inSubmitting && (
            <LoginMessage content="???????????????" />
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
                  defaultMessage: '?????????',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="?????????????????????"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                        defaultMessage="????????????????????????"
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
                  defaultMessage: '??????????????????',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: '???????????????',
                    })}`;
                  }
                  return formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: '???????????????',
                  });
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="?????????????????????"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={async (mobile) => {
                  const result = await getFakeCaptcha(mobile);
                  if (result === false) {
                    return;
                  }
                  message.success('???????????????????????????????????????1234');
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
                { label: '??????', value: RoleType.student },
                {
                  label: '??????',
                  value: RoleType.instructor,
                },
              ]}
            />
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="????????????" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="????????????" />
            </a>
          </div>
        </ProForm>
      </div>
    );
  }
}
