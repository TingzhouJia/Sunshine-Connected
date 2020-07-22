import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AppThunk } from '.';


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




const VideoSlice=createSlice({
    name:"video",
    initialState,
    reducers:{
        fetchVideosStart:startLoad,
        fetchVideoStart:startLoad,
        updateVideoStart:startLoad,
        removeVideoStart:startLoad,
        fetchVideoSuccess:getVideoSuccess,
        fetchVideoListSuccess:getVideoListSuccess,
        removeVideoSuccess:getVideoListSuccess,
        updateVideoSuccess:getVideoSuccess,
       
    }
})

export const {
    fetchVideosStart,
    fetchVideoStart,
    updateVideoStart
}=VideoSlice.actions

export const fetchVideoList=(uid:string,pagination:Partial<Pagination<Video>>):AppThunk=>async (dispatch)=>{
    dispatch(fetchVideosStart)
    
}




export default VideoSlice.reducer
