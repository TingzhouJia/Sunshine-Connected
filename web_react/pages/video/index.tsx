import { AppLayout } from "../../layout"
import { VirtualizedExample, LoadList } from "../../components"
import Axios from "axios"
import { I18nPage, useTranslation, includeDefaultNamespaces } from "../../i18n"



const VideoHome:I18nPage<{data:any}>=({data,})=>{
    const {t}=useTranslation()
    return (
        <AppLayout showSide={true}>
            <LoadList t={t} list={data}></LoadList>
        </AppLayout>
    )

}




VideoHome.getInitialProps= async ()=>{
      return  {
        namespacesRequired:includeDefaultNamespaces(['video'])
      }
  }

  export async function getServerSideProps(context) {

    const res=await Axios.get('https://randomuser.me/api/?results=50&inc=name,gender,email,nat&noinfo')
    
    return {
      props: {
          data:res.data.results
      }, // will be passed to the page component as props
    }
  }
export default VideoHome