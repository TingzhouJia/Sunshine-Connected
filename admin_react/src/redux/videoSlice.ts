import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AppThunk } from '.';
import { getVideoList, getOneVideo, updateVideo, createOneVideo, removeOneVideo } from '../repository/videoRepo';
import { Video, Pagination } from '../model';


interface VideoState {
    curVideo:Partial<Video>|undefined,
    videoList:Partial<Video>[]|undefined,
    loading:boolean,
    pagination:Partial<Pagination<Video>>

}


const initialState:VideoState={
    curVideo:undefined,
    videoList:[],
    loading:false,
    pagination:{limit:10}
}
const startLoad=(state:VideoState,)=>{
    state.loading=true;

}

const getVideoListSuccess=(state:VideoState,{payload}:PayloadAction<{list:Partial<Video>[],pagi:Partial<Pagination<Video>>}>)=>{
    state.videoList=payload.list
    state.pagination=payload.pagi
    state.loading=false
}

const getVideoSuccess=(state:VideoState,{payload}:PayloadAction<Partial<Video>>)=>{
   
    state.curVideo=payload
    state.loading=false

}
const updateVideoFinish=(state:VideoState,{payload}:PayloadAction<Partial<Video>>)=>{
    state.curVideo=payload
    state.videoList=state.videoList?state.videoList.map(item=>(item.id===payload.id?payload:item)):undefined
    state.loading=false
}

const removeSuccess=(state:VideoState,{payload}:PayloadAction<string>)=>{
    state.videoList=state.videoList?state.videoList.filter(item=>item.id!==payload):undefined
    state.loading=false
}




const VideoSlice=createSlice({
    name:"video",
    initialState,
    reducers:{
        fetchVideosStart:startLoad,
        fetchVideoStart:startLoad,
        createVideoStart:startLoad,
        updateVideoStart:startLoad,
        removeVideoStart:startLoad,
        createVideoSuccess:getVideoSuccess,
        fetchVideoSuccess:getVideoSuccess,
        fetchVideoListSuccess:getVideoListSuccess,
        removeVideoSuccess:removeSuccess,
        updateVideoSuccess:updateVideoFinish,
       
    }
})

export const {
    fetchVideosStart,
    fetchVideoStart,
    createVideoStart,
    updateVideoStart,
    createVideoSuccess,
    removeVideoStart,
    removeVideoSuccess,
    fetchVideoListSuccess,
    fetchVideoSuccess,updateVideoSuccess
}=VideoSlice.actions

export const fetchVideoList=(uid:string,pagination:Partial<Pagination<Video>>):AppThunk=>async (dispatch)=>{
    dispatch(fetchVideosStart)
    const res=await getVideoList('5f04f91ae7ffdbbd6bb87e34',pagination)
    dispatch(fetchVideoListSuccess({list:res.data.items,pagi:{}}))
}

export const fetchVideo=(video_id:string):AppThunk=>async (dispatch)=>{

    dispatch(fetchVideoStart)
    const res=await getOneVideo(video_id)
    
    dispatch(fetchVideoSuccess(res.data))
}

export const reviseVideo=(video_id:string,body:Partial<Video>):AppThunk=>async (dispatch)=>{
        dispatch(updateVideoStart)
        const res=await updateVideo(video_id,body)
        dispatch(updateVideoSuccess(res.data))
}
export const createVideo=(body:Partial<Video>):AppThunk=>async (dispatch)=>{
    dispatch(createVideoStart)
    const res=await createOneVideo(body)
    dispatch(createVideoSuccess(res.data))
}
export const removeVideo=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(removeVideoStart)
    await removeOneVideo(id)
    dispatch(removeVideoSuccess(id))
}
export default VideoSlice.reducer
