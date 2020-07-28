import { Wrapper, Flexbox } from "../../style"
import React, { useEffect } from "react"
import { HeaderBread } from "../../components/global"
import { Button } from "antd"
import { VideoTable } from "../../components/VideoHandle"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { RootState, fetchVideoList } from "../../redux"


export const VideoListPage:React.FC=()=>{
    const router=useHistory()
    const {loading,videoList}=useSelector((state:RootState)=>state.video)
    const dispath=useDispatch()
    useEffect(() => {
        dispath(fetchVideoList('id',{limit:10}))
    }, [dispath])
    return <Wrapper>
        <HeaderBread/>
       {
           videoList? <Flexbox direction="column" just="space-between" align="flex-start" w="80vw" h="85vh">
         
       <Button style={{ width:"30%"}} onClick={()=>router.push('/workshop/publishVideo')} type="primary">Add Video</Button>
            <VideoTable loading={loading} source={videoList}/>
          
        </Flexbox>:<></>
       }
    </Wrapper>
}