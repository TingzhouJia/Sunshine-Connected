


import { I18nPage ,includeDefaultNamespaces, useTranslation, withTranslation} from '../i18n'



export const Home:I18nPage = () => {
   const {t}=useTranslation()
  return(
    <div className="container">
    
    {t('index:zzzz')}
   
  </div>
  )
}
  
Home.getInitialProps=()=>{
  
  return {
    namespacesRequired: includeDefaultNamespaces(['index'])
  }
}



export default Home
