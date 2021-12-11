import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'
import global from './en-US/global'

import menu from './en-US/menu'
import setting from './en-US/setting'
import user from './en-US/user'

import dashboard from './en-US/dashboard'
import form from './en-US/form'
import result from './en-US/result'
import account from './en-US/account'
// import HeyCafe from './en-US/HeyCafe'
import HeyCafe from './en-US/HeyCafe_English'

const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

export default {
  message: '-',
  'layouts.usermenu.dialog.title': 'Message',
  'layouts.usermenu.dialog.content': 'Are you sure you would like to logout?',
  'layouts.userLayout.title': 'HeyCafe Smart Restaurant Management System',
  ...components,
  ...global,
  ...menu,
  ...setting,
  ...user,
  ...dashboard,
  ...form,
  ...result,
  ...account,
  ...HeyCafe
}
