import { Wrapper, Flexbox } from "../../style"
import React from "react"
import { HeaderBread } from "../../components/global"
import { Button, Space } from "antd"
import { VideoTable } from "../../components/VideoHandle/videoList"
import { useHistory } from "react-router"


export const VideoListPage:React.FC=()=>{
    const router=useHistory()
    return <Wrapper>
        <HeaderBread/>
        <Flexbox direction="column" just="flex-start" align="space-between" w="87vw" h="85vh">
           <Space direction="vertical" size="large">
           <Button style={{ width:"30%"}} onClick={()=>router.push('/workshop/publishVideo')} type="primary">Add Video</Button>
            <VideoTable/>
           </Space>
        </Flexbox>
    </Wrapper>
}