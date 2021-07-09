// 菜单栏显示内容
export const menuRoutes = [
  {
    path: '/',
    redirect: './home',
  },
  {
    path: '/home',
    name: 'home',
    icon: 'smile',
    component: './Home',
  },
  {
    path: '/profile',
    name: 'profile',
    icon: 'UserOutlined',
    component: './Profile',
  },

  {
    path: '/section/:id',
    name: 'section',
    icon: 'ExclamationCircleOutlined',
    component: './Section/[id]',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    component: './Admin',
    authority: ['admin'],
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Home',
        authority: ['admin'],
      },
    ],
  },

  {
    component: './404',
  },
];
