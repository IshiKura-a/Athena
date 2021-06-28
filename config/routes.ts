import { menuRoutes } from './routes/menuRoutes';

export default [
  {
    path: '/',
    component: '../index',
    routes: [
      {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
          {
            path: '/user',
            component: '../layouts/UserLayout',
            routes: [
              {
                name: 'login',
                path: '/user/login',
                component: './Login',
              },
            ],
          },
          {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
              {
                path: '/',
                component: '../layouts/BasicLayout',
                authority: ['admin', 'user'],
                routes: menuRoutes,
              },
              {
                component: './404',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
