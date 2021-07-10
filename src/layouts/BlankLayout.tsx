import React, { useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import { inject, observer } from 'mobx-react';
import { history } from 'umi';
import { stringify } from 'querystring';
import { validate } from '@/services/user';
import { getCookie } from '@/utils/utils';
import { getProfileInfo } from '@/services/profile';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout: React.FC = inject('baseStore')(
  observer((component) => {
    useEffect(() => {
      const jwt = getCookie('JWT-Token');
      const { pathname, search } = window.location;
      if (jwt) {
        validate().then(async (r) => {
          if (!r.aid) {
            if (pathname !== '/user/login' || (pathname === '/user/login' && !search)) {
              history.replace({
                pathname: '/user/login',
                search: stringify({
                  redirect: window.location.href,
                }),
              });
            }
          } else {
            const profile = await getProfileInfo();
            if (!profile.status || `${profile.status}`.indexOf('2') === 0) {
              component.baseStore.setName(profile.basic_person.name);
            } else {
              component.baseStore.setName('');
            }
            component.baseStore.setId(r.aid);
            component.baseStore.setType(r.type);
          }
        });
      } else if (pathname !== '/user/login' || (pathname === '/user/login' && !search)) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    }, []);

    return <InspectorWrapper>{component.children}</InspectorWrapper>;
  }),
);

export default Layout;
