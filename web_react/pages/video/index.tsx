import { AppLayout } from "../../layout"
import { VirtualizedExample } from "../../components/video/visualList"
import Axios from "axios"
import { LoadList } from "../../components/video/loadList"


export const VideoHome=({data})=>{


    return (
        <AppLayout showSide={true}>
            <LoadList list={data}></LoadList>
        </AppLayout>
    )

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