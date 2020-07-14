import { Fabric, createTheme, Customizations } from '@fluentui/react'
import App from 'next/app'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NProgress from 'nprogress'
import { appWithTranslation } from '../i18n'
import '../style/global.css'
NProgress.configure({ showSpinner: false })
const myTheme = createTheme({
  defaultFontStyle: { fontFamily: 'Helvetica', fontWeight: 'normal' },

  fonts: {
    small: {
      fontSize: '11px',
    },
  },
  palette: {
    themePrimary: '#f1c331',
    themeLighterAlt: '#fefdf6',
    accent: '#7A0D0E',
    themeLighter: '#fdf5dd',
    themeLight: '#fbedbf',
    themeTertiary: '#f7dc81',
    themeSecondary: '#f4cc48',
    themeDarkAlt: '#dab12c',
    themeDark: '#b89625',
    themeDarker: '#886e1b',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#595959',
    neutralSecondary: '#373737',
    neutralPrimaryAlt: '#2f2f2f',
    neutralPrimary: '#000000',
    neutralDark: '#151515',
    black: '#0b0b0b',
    white: '#ffffff',
  },
})

const Layout = ({ children }) => {
  Customizations.applySettings({ theme: myTheme })
  return <Fabric applyThemeToBody>{children}</Fabric>
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
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
