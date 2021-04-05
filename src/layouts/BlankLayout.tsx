import React, { useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import { inject, observer } from 'mobx-react';
import { history } from 'umi';
import { stringify } from 'querystring';
import { getCookie } from '@/utils/utils';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout: React.FC = inject('baseStore')(
  observer((component) => {
    useEffect(() => {
      const { token } = component.baseStore;
      console.log('test', token, window.location);
      if (!token || token.length === 0) {
        const { pathname, search } = window.location;
        if (pathname !== '/user/login' || (pathname === '/user/login' && !search)) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      }
    }, []);

    return <InspectorWrapper>{component.children}</InspectorWrapper>;
  }),
);

export default Layout;
