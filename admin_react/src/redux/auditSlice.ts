import { Audit, Pagination, Video } from "../model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { GetAuditList, CreateAudit, deleteAudit, updateAudit, getMyAudit } from "../repository";

interface AuditState{
    auditList:Partial<Video|Audit>[]|undefined,
    loading:boolean,
    curaudit:Partial<Audit|Video>|undefined,
    pagination:Partial<Pagination<Video|Audit>>
}

const initialState:AuditState={
    auditList:undefined,
    loading:false,
    curaudit:undefined,
    pagination:{limit:10}
}

function saveList(state:AuditState,{payload}:PayloadAction<{list:Partial<Video|Audit>[],pagination:Partial<Pagination<Audit|Video>>}>){
    state.auditList=payload.list
    state.pagination=payload.pagination
    state.loading=false
}

function startLoading(state:AuditState){
    state.loading=true
}

function saveCur(state:AuditState,{payload}:PayloadAction<number>){
    state.loading=false
    state.curaudit=state.auditList?state.auditList[payload]:undefined
}

function updateCur(state:AuditState,{payload}:PayloadAction<Partial<Audit>>){
    state.loading=false
    state.curaudit=payload
}

const AuditSlice=createSlice({
    name:'audit',
    initialState,
    reducers:{
        fetchStart:startLoading,
        fetchListSuccess:saveList,
        fetchCur:saveCur,
        changeCur:updateCur,
        cleanCur:(state:AuditState)=>{
            state.loading=false
            state.curaudit=undefined
        }
    }
})
export const {
    fetchStart,
    fetchListSuccess,
    fetchCur,
    cleanCur,
    changeCur
}=AuditSlice.actions
export const fetchAuditList=(id:string,pagination:Partial<Pagination<Video|Audit>>):AppThunk=>async(dispatch)=>{
    dispatch(fetchStart)
    const res=await GetAuditList(id,pagination)
    const pagi={
        limit:10,
        total:res.data.total,
        page:res.data.page
    }
    dispatch(fetchListSuccess({list:res.data.items,pagination:pagi}))
}

export const createAudit=(doc:Partial<Audit>,id:number):AppThunk=>async (dispatch)=>{
    dispatch(fetchStart)
    await CreateAudit(doc)
    dispatch(fetchCur(id))
}

export const finishAuditSuccess=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(fetchStart)
    await deleteAudit(id)
    dispatch(cleanCur)
}

export const reviseAuditSuccess=(id:string,audit:Partial<Audit>):AppThunk=>async (dispatch)=>{
    dispatch(fetchStart)
    const res=await updateAudit(id,audit)
    dispatch(changeCur(res.data))
}

export const GetMyAuditList=(id:string,pagi:Partial<Pagination<Audit>>):AppThunk=>async (dispatch)=>{
    dispatch(fetchStart)
    const res=await getMyAudit(id,pagi)
    const pagination={
        limit:10,
        total:res.data.total,
        page:res.data.page
    }
    dispatch(fetchListSuccess({list:res.data.items,pagination}))

}


export default AuditSlice.reducer