import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { getAllQuestionListByOnePublisher, getTypedQuestionListByOne, deleteQuestionById, fetchOneQuestion  } from "../repository";
import { Question, Pagination, Video } from "../model";



interface QuestionState{
    questionList:Partial<Question>[]|undefined,
    loading:boolean,
    pagnination:Partial<Pagination<Question>>,
    selectQuestion:Partial<Question>|undefined
}
const initialState:QuestionState={
    questionList:undefined,
    loading:false,
    pagnination:{limit:10},
    selectQuestion:undefined
}


function Start(state:QuestionState){
    state.loading=true
}

function getQuestionList(state:QuestionState,{payload}:PayloadAction<{list:Partial<Question>[],pagination:Partial<Pagination<Question>>}>){
    state.loading=false
    state.questionList=payload.list
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

export const fetchQuestionList=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(fetchQuestionListStart)
    const res=await getAllQuestionListByOnePublisher('5f04f91ae7ffdbbd6bb87e34')
    let source:Partial<Question>[]=[]
    res.data.items.map((each:Partial<Video>)=>{
        if(each.question){
            source=[...source,...each.question]
        }
    })
    let pagi:Partial<Pagination<Video>>={
        total:source.length,
    }
    dispatch(fetchQuestionListSuccess({list:source,pagination:pagi}))
}

export const fetchQuestion=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(fetchQuestionStart)
    const res=await fetchOneQuestion(id)
    dispatch(fetchQuestionSuccess(res.data))
}
export const fetchTypedList=(id:string,answered:string):AppThunk=>async (dispatch)=>{
    dispatch(fetchQuestionListStart)
    const res=await getTypedQuestionListByOne('5f04f91ae7ffdbbd6bb87e34',answered)
    let source:Partial<Question>[]=[]
    res.data.items.map((each:Partial<Video>)=>{
        if(each.question){
            source=[...source,...each.question]
        }
    })
    let pagi:Partial<Pagination<Video>>={
        total:source.length,
    }
    dispatch(fetchQuestionListSuccess({list:source,pagination:pagi}))
}

export const removeQuestion=(id:string):AppThunk=>async (dispatch)=>{
    dispatch(removeQuestionStart)
    const res=await deleteQuestionById(id)
    dispatch(removeQuestionSuccess(res.data))
}



export default QuestionSlice.reducer

