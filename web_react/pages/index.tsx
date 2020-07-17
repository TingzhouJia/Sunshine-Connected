


import { I18nPage ,includeDefaultNamespaces, useTranslation} from '../i18n'
import { withTranslation } from 'react-i18next'
export const Home = () => {
  const {t}=useTranslation()
  return(
    <div className="container">
    
    {t('zzzz')}
   
  </div>
  )
}
  
Home.getInitialProps=()=>{
  return {
    namespacesRequired: includeDefaultNamespaces(['index'])
  }
}



export default Home
