import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { fetchAnswerListByUID, fetchDraftListByUID, removeAnswerById } from "../repository";

interface AnswerState{
    draftList:Partial<Answer>[]|[],
    answerList:Partial<Answer>[],
    loading:boolean
    selectedAnswer:Partial<Answer>|undefined
}


const initialState:AnswerState={
    draftList:[],
    answerList:[],
    loading:false,
    selectedAnswer:undefined
}

function saveQuestion(state:AnswerState,{payload}:PayloadAction<Partial<Answer>>){
        state.draftList=[...state.draftList,payload]
        state.loading=false
}


function Start(state:AnswerState){
    state.loading=true
}
function SetSelectedAnswer(state:AnswerState,{payload}:PayloadAction<Partial<Answer>>){
    state.selectedAnswer=payload
}

function finishQuestion(state:AnswerState,{payload}:PayloadAction<Partial<Answer>>){
    state.loading=false;
    state.answerList=[...state.answerList,payload]
}
function deleteAnswerSuccess(state:AnswerState,{payload}:PayloadAction<string>){
    state.answerList=state.answerList.filter(item=>item._id===payload)
    state.loading=false
}
function deleteDraftSuccess(state:AnswerState,{payload}:PayloadAction<string>){
    state.draftList=state.draftList.filter(item=>item._id===payload)
    state.loading=false
}

const AnswerSlice=createSlice({
    name:"answer",
    initialState,
    reducers:{
        fetchAnswerListStart:Start,
        fetchDraftStart:Start,
        saveDraftSuccess:saveQuestion,
        answerQuestionSuccess:finishQuestion,
        fetchDraftSuccess:saveQuestion,
        fetchAnswerListSuccess:finishQuestion,
        deleteAnswerStart:Start,
        fetchAnswer:SetSelectedAnswer,
        deleteAnswerFinish:deleteAnswerSuccess,
        deleteDraftFinish:deleteDraftSuccess
    }
})

export const {
    fetchAnswerListStart,
    fetchAnswerListSuccess,
    saveDraftSuccess,
    answerQuestionSuccess,
    fetchAnswer,
    deleteAnswerFinish,
    deleteAnswerStart,
    deleteDraftFinish,
    fetchDraftStart,
    fetchDraftSuccess
}=AnswerSlice.actions


export const fetchAnswerList=(id:string,pagination:Partial<Pagination<Answer>>):AppThunk=>async (dispatch)=>{
    dispatch(fetchAnswerListStart)
    const res=await fetchAnswerListByUID(id,pagination)
    dispatch(fetchAnswerListSuccess(res.data))
}


export const fetchOneAnswer=(body:Partial<Answer>)=> (dispatch:any)=>{

    dispatch(fetchAnswer(body))
}

export  const fetchDraftList=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(fetchDraftStart)
    const res=await fetchDraftListByUID(id)
    dispatch(fetchDraftSuccess(res.data))
}

export const deleteDraft=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(deleteAnswerStart)
    await removeAnswerById(id)
    dispatch(deleteDraftFinish(id))
}


export const deleteAnswer=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(deleteAnswerStart)
    await removeAnswerById(id)
    dispatch(deleteAnswerFinish(id))
}

export default AnswerSlice.reducer


