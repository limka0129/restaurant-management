import router from './index'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
    next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
