export type RouteInfo = HasRoutes | NotRoutes

interface RouteCommon {
  icon: string
  title: string
  role: 'ROLE_ADMIN' | 'ROLE_BASIC' | undefined
}

interface HasRoutes extends RouteCommon {
  hasRoutes: true
  routes: RouteInfo[]
}

interface NotRoutes extends RouteCommon {
  hasRoutes: false
  matchPath: string
  component: () => any
}

const routes: RouteInfo[] = [
  {
    icon: 'profile',
    title: '后台管理',
    role: 'ROLE_BASIC',
    hasRoutes: true,
    routes: [
      {
        icon: 'icon-user',
        title: '用户管理',
        role: 'ROLE_ADMIN',
        hasRoutes: false,
        matchPath: '/admin/user',
        component: () => import('../components/admin-user')
      },
      {
        icon: 'icon-yinghua',
        title: 'Sakura管理',
        role: 'ROLE_BASIC',
        hasRoutes: false,
        matchPath: '/basic/sakura',
        component: () => import('../components/basic-sakura')
      },
    ]
  }
]

export default routes
