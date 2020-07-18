
import App from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NProgress from 'nprogress'
import 'antd/dist/antd.less'
import '../style/gloabl.less'
import { appWithTranslation } from '../i18n'
import { Router } from 'next/router'
import 'react-virtualized/styles.css';
import Head from 'next/head'
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
        {/* Import CSS for nprogress */}
        {/* <link rel="stylesheet" type="text/css" href="/gloabl.css" /> */}
      </Head>
    <Provider store={store}>
       
        <Component {...pageProps} />
      
    </Provider></>
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
