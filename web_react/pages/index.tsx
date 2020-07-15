import {AppLayout} from '../layout/app_layout'


import { I18nPage ,includeDefaultNamespaces} from '../i18n'
export const Home: I18nPage = () => {
  return(
    <div className="container">
    
   <AppLayout>
   
   </AppLayout>
   
  </div>
  )
}
  
Home.getInitialProps=()=>{
  return {
    namespacesRequired: includeDefaultNamespaces(['index'])
  }
}



export default Home
