import {AppLayout} from '../layout/app_layout'


import { I18nPage ,includeDefaultNamespaces} from '../i18n'
export const Home: I18nPage = () => {
  return(
    <div className="container">
    
   <AppLayout>
     <div style={{background:'red',height:500,width:500}}></div>
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
