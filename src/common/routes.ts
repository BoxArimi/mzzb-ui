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
        icon: 'icon-yinghua',
        title: 'Sakura管理',
        role: 'ROLE_BASIC',
        hasRoutes: false,
        matchPath: '/admin/sakura',
        component: () => import('../components/admin-sakura')
      },
    ]
  }
]

export default routes
