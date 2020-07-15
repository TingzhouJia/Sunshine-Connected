
import App from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NProgress from 'nprogress'

import 'antd/dist/antd.css'
import { appWithTranslation } from '../i18n'
import '../style/global.css'
import { Router } from 'next/router'
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      
        <Component {...pageProps} />
      
    </Provider>
  )
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}
// const makeStore: MakeStore<RootState> = (context: Context) => store;
// const wrapper = createWrapper<RootState>(makeStore, {debug: true});
// export default wrapper.withRedux(MyApp)
export default appWithTranslation(MyApp)
