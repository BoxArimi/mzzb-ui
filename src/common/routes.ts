export type RouteInfo = HasRoutes | NotRoutes

interface RouteCommon {
  icon: string
  title: string
  isAdmin: boolean
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
    isAdmin: true,
    hasRoutes: true,
    routes: [
      {
        icon: 'icon-yinghua',
        title: 'Sakura管理',
        isAdmin: true,
        hasRoutes: false,
        matchPath: '/admin/sakura',
        component: () => import('../components/admin-sakura')
      },
    ]
  }
]

export default routes
