import { pageInfo as discPage } from '../components/disc/reducer'
import { pageInfo as sakuraPage } from '../components/sakura/reducer'
import { pageInfo as adminUserPage } from '../components/admin-user/reducer'
import { pageInfo as adminSakuraPage } from '../components/admin-sakura/reducer'

type Role = 'ROLE_ADMIN' | 'ROLE_BASIC'

export interface PageInfo {
  pageTitle: string // 用户管理
  matchPath: string // /admin/user
  pageModel: string // AdminUser
  modelName: string // 用户
  searchFor: string // key
  component: () => any
}

export interface MenuInfo {
  icon?: string
  text: string
  path: string
  role?: Role
  subMenus?: MenuInfo[]
}

export const pageInfos: PageInfo[] = [
  discPage
]

const fromPage = (pageInfo: PageInfo, icon: string, role?: Role) => {
  pageInfos.push(pageInfo)
  return {
    icon, role, path: pageInfo.matchPath, text: pageInfo.pageTitle
  }
}

export const menuInfos: MenuInfo[] = [
  fromPage(sakuraPage, 'icon-yinghua'),
  {
    icon: 'profile',
    text: '后台管理',
    path: '/admin',
    role: 'ROLE_BASIC',
    subMenus: [
      fromPage(adminUserPage, 'icon-user', 'ROLE_ADMIN'),
      fromPage(adminSakuraPage, 'icon-yinghua', 'ROLE_BASIC'),
    ]
  },
  {
    icon: 'icon-social-tieba',
    text: '推荐专贴',
    path: '/zhuantie',
    subMenus: [
      {
        text: '2018春-PT排名走势',
        path: 'https://tieba.baidu.com/p/5627916964?pn=9999',
      },
      {
        text: '2018春-B站数据统计',
        path: 'https://tieba.baidu.com/p/5615545349?pn=9999',
      },
      {
        text: '2018春-长期追踪贴',
        path: 'https://tieba.baidu.com/p/5627461603?pn=9999',
      },
      {
        text: '2018冬-PT排名走势',
        path: 'https://tieba.baidu.com/p/5500417708?pn=9999',
      },
      {
        text: '2018冬-B站数据统计',
        path: 'https://tieba.baidu.com/p/5490501406?pn=9999',
      },
      {
        text: '2018冬-长期追踪贴',
        path: 'https://tieba.baidu.com/p/5533369671?pn=9999',
      },
      {
        text: '2017秋-PT排名走势',
        path: 'https://tieba.baidu.com/p/5350894353?pn=9999',
      },
      {
        text: '2017秋-长期追踪贴',
        path: 'https://tieba.baidu.com/p/5369087987?pn=9999',
      },
    ]
  },
  {
    icon: 'icon-social-tieba',
    text: '票房专楼',
    path: '/piaofang',
    subMenus: [
      {
        text: '日本票房综合讨论楼V3',
        path: 'https://tieba.baidu.com/p/4803602533?pn=9999',
      },
      {
        text: '超时空要塞Δ 激情的ワルキ',
        path: 'https://tieba.baidu.com/p/5544251789?pn=9999',
      },
      {
        text: 'FSN Heavens Feel',
        path: 'https://tieba.baidu.com/p/5360321349?pn=9999',
      },
      {
        text: 'NO GAME NO LIFE : ZERO',
        path: 'https://tieba.baidu.com/p/5209590919?pn=9999',
      },
    ]
  },
  {
    icon: 'icon-social-tieba',
    text: '2018春专楼',
    path: '/zl-201804',
    subMenus: [
      {
        text: '命运石之门0',
        path: 'https://tieba.baidu.com/p/5627694697?pn=9999',
      },
      {
        text: '女神异闻录5',
        path: 'https://tieba.baidu.com/p/5627689510?pn=9999',
      },
      {
        text: '刀剑神域外传GGO',
        path: 'https://tieba.baidu.com/p/5617733420?pn=9999',
      },
      {
        text: '马娘',
        path: 'https://tieba.baidu.com/p/5617629946?pn=9999',
      },
    ]
  },
  {
    icon: 'icon-social-tieba',
    text: '2018冬专楼',
    path: '/zl-201801',
    subMenus: [
      {
        text: 'DitF(国家队)',
        path: 'https://tieba.baidu.com/p/5500270781?pn=9999',
      },
      {
        text: '紫罗兰永恒花园1.0',
        path: 'https://tieba.baidu.com/p/5500266707?pn=9999',
      },
      {
        text: '摇曳露营(黑马楼)',
        path: 'https://tieba.baidu.com/p/5563728799?pn=9999',
      },
      {
        text: '摇曳露营(专楼吧)',
        path: 'https://tieba.baidu.com/p/5493148682?pn=9999',
      },
      {
        text: '比宇宙更远的地方',
        path: 'https://tieba.baidu.com/p/5493097898?pn=9999',
      },
      {
        text: 'Fate/Extra 卫宫饭',
        path: 'https://tieba.baidu.com/p/5503857640?pn=9999',
      },
      {
        text: '魔卡少女樱 CC篇2.0',
        path: 'https://tieba.baidu.com/p/5589343312?pn=9999',
      },
    ]
  },
  {
    icon: 'icon-social-tieba',
    text: '往季专楼',
    path: '/zl-wangji',
    subMenus: [
      {
        text: 'Princess Principal',
        path: 'https://tieba.baidu.com/p/5202234378?pn=9999',
      },
      {
        text: '末日时在做什么？有没有空？可以来拯救吗？',
        path: 'https://tieba.baidu.com/p/5040597877?pn=9999',
      },
      {
        text: 'Re:从零开始的异世界生活',
        path: 'https://tieba.baidu.com/p/4773136352?pn=9999',
      },
      {
        text: '甲铁城的卡巴内利',
        path: 'https://tieba.baidu.com/p/4652025583?pn=9999',
      },
    ]
  },
  {
    icon: 'icon-social-tieba',
    text: '名作之壁吧',
    path: 'https://tieba.baidu.com/f?kw=%E5%90%8D%E4%BD%9C%E4%B9%8B%E5%A3%81',
  },
  {
    icon: 'icon-social-tieba',
    text: '壁吧专楼吧',
    path: 'https://tieba.baidu.com/f?kw=%E5%A3%81%E5%90%A7%E4%B8%93%E6%A5%BC',
  },
  {
    icon: 'icon-buoumaotubiao31',
    text: '日本PT站(Sakura)',
    path: 'http://rankstker.net/index_news.cgi',
  },
  {
    icon: 'github',
    text: 'Github - UI',
    path: 'https://github.com/mingzuozhibi/mzzb-ui',
  }, {
    icon: 'github',
    text: 'Github - Server',
    path: 'https://github.com/mingzuozhibi/mzzb-server',
  },
]
