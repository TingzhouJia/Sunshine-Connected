import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AppThunk } from '.';
import { getVideoList, getOneVideo, updateVideo, createOneVideo, removeOneVideo } from '../repository/videoRepo';


interface VideoState {
    curVideo:Partial<Video>|undefined,
    videoList:Partial<Video>[]|any[],
    loading:boolean

}


const initialState:VideoState={
    curVideo:undefined,
    videoList:[],
    loading:false
}
const startLoad=(state:VideoState,)=>{
    state.loading=true;

}

const getVideoListSuccess=(state:VideoState,{payload}:PayloadAction<Partial<Video>[]>)=>{
    state.videoList=payload
    state.loading=false
}

const getVideoSuccess=(state:VideoState,{payload}:PayloadAction<Partial<Video>>)=>{
    state.curVideo=payload
    state.loading=false
}

const removeSuccess=(state:VideoState,{payload}:PayloadAction<string>)=>{
    state.videoList=state.videoList.filter(item=>item._id!==payload)
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
        updateVideoSuccess:getVideoSuccess,
       
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
    const res=await getVideoList(uid,pagination)
    dispatch(fetchVideoListSuccess(res.data))
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
