import { Wrapper, Flexbox } from "../../style"
import React from "react"
import { HeaderBread } from "../../components/global"
import { Button } from "antd"
import { VideoTable } from "../../components/VideoHandle/videoList"
import { useHistory } from "react-router"


export const VideoListPage:React.FC=()=>{
    const router=useHistory()
    return <Wrapper>
        <HeaderBread/>
        <Flexbox direction="column" just="flex-start" align="space-between">
            <Button onClick={()=>router.push('/workshop/publishVideo')} type="primary">Add Video</Button>
            <VideoTable/>
        </Flexbox>
    </Wrapper>
}