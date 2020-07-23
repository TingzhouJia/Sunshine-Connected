import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { getAllQuestionListByOnePublisher } from "../repository";
import { deleteQuestionById } from "../repository/questionRepo";


interface QuestionState{
    questionList:Partial<Question>[]|undefined,
    loading:boolean,
    selectQuestion:Partial<Question>|undefined
}
const initialState:QuestionState={
    questionList:undefined,
    loading:false,
    selectQuestion:undefined
}


function Start(state:QuestionState){
    state.loading=true
}

function getQuestionList(state:QuestionState,{payload}:PayloadAction<Partial<Question>[]>){
    state.loading=false
    state.questionList=payload
}

function getQuestion(state:QuestionState,{payload}:PayloadAction<Partial<Question>>){
    state.selectQuestion=payload
    state.loading=false
}

const QuestionSlice=createSlice({
    name:'question',
    initialState,
    reducers:{
        fetchQuestionListStart:Start,
        fetchQuestionStart:Start,
        fetchQuestionListSuccess:getQuestionList,
        fetchQuestionSuccess:getQuestion,
        removeQuestionStart:Start,
        removeQuestionSuccess:getQuestion
    }
})

export const {
    fetchQuestionListStart,
    fetchQuestionListSuccess,
    fetchQuestionStart,
    fetchQuestionSuccess,
    removeQuestionStart,
    removeQuestionSuccess

}=QuestionSlice.actions

export const fetchQuestionList=(id:string,pagination:Pagination<Video>):AppThunk=>async (dispatch)=>{
    dispatch(fetchQuestionListStart)
    const res=await getAllQuestionListByOnePublisher(id,pagination)
    dispatch(fetchQuestionListSuccess(res.data))
}

export const fetchQuestion=(body:Partial<Question>)=>(dispatch:any)=>{
    dispatch(fetchQuestionSuccess(body))
}

export const removeQuestion=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(removeQuestionStart)
    const res=await deleteQuestionById(id)
    dispatch(removeQuestionSuccess(res.data))
}



export default QuestionSlice.reducer

