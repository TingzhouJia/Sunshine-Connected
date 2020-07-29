import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { fetchAnswerListByUID, fetchDraftListByUID, removeAnswerById, createAnswers, updateOneAnswer } from "../repository";
import { Answer, Pagination } from "../model";

interface AnswerState {
    draftList: Partial<Answer>[] | undefined,
    answerList: Partial<Answer>[] | undefined,
    loading: boolean,
    pagination:Partial<Pagination<Answer>>
    selectedAnswer: Partial<Answer> | undefined
}


const initialState: AnswerState = {
    draftList: [],
    answerList: [],
    loading: false,
    selectedAnswer: undefined,
    pagination:{limit:10}
}

function saveQuestion(state: AnswerState, { payload }: PayloadAction<Partial<Answer>>) {
    state.draftList = state.draftList ? [...state.draftList, payload] : [payload]
    state.loading = false
}

function updateAnswerSuccess(state: AnswerState, { payload }: PayloadAction<Partial<Answer>>) {
    state.draftList = state.draftList ? state.draftList.map(item => (item._id !== payload._id ? item : payload)) : undefined

    state.loading = false
}
function turnDraftToAnswerSuccess(state:AnswerState,{payload}:PayloadAction<Partial<Answer>>){
    state.draftList = state.draftList ? state.draftList.filter(item => item._id !== payload._id ) : undefined
    state.answerList=state.answerList?[...state.answerList,payload]:[payload]
    state.loading=false
}

function Start(state: AnswerState) {
    state.loading = true
}
function SetSelectedAnswer(state: AnswerState, { payload }: PayloadAction<Partial<Answer>>) {
    state.selectedAnswer = payload
}

function finishQuestion(state: AnswerState, { payload }: PayloadAction<Partial<Answer>>) {
    state.loading = false;
    state.answerList = state.answerList ? [...state.answerList, payload] : [payload]
}
function FetchListSuccess(state:AnswerState,{payload}:PayloadAction<{list:Partial<Answer>[],pagi:Partial<Pagination<Answer>>}>){
    state.answerList=payload.list
    state.pagination=payload.pagi
    state.loading=false
}
function deleteAnswerSuccess(state: AnswerState, { payload }: PayloadAction<string>) {
    state.answerList = state.answerList ? state.answerList.filter(item => item._id === payload) : undefined
    state.loading = false
}
function deleteDraftSuccess(state: AnswerState, { payload }: PayloadAction<string>) {
    state.draftList = state.draftList ? state.draftList.filter(item => item._id === payload) : undefined
    state.loading = false
}
function FetchDraftSuccess(state: AnswerState, { payload }: PayloadAction<Partial<Answer>[]>){
    state.draftList=payload
    state.loading=false
}

const AnswerSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {
        fetchAnswerListStart: Start,
        fetchDraftStart: Start,
        saveDraftSuccess: saveQuestion,
        answerQuestionSuccess: finishQuestion,
        fetchDraftSuccess: SetSelectedAnswer,
        fetchAnswerListSuccess: FetchListSuccess,
        turnDraftToAnswerFinsih:turnDraftToAnswerSuccess,
        deleteAnswerStart: Start,
        saveAnswerStart: Start,
        updateAnswerFinish: updateAnswerSuccess,
        fetchAnswer: SetSelectedAnswer,
        fetchDraftListSuccess:FetchDraftSuccess,
        deleteAnswerFinish: deleteAnswerSuccess,
        deleteDraftFinish: deleteDraftSuccess
    }
})

export const {
    fetchAnswerListStart,
    fetchAnswerListSuccess,
    saveDraftSuccess,
    turnDraftToAnswerFinsih,
    answerQuestionSuccess,
    updateAnswerFinish,
    saveAnswerStart,
    fetchDraftListSuccess,
    fetchAnswer,
    deleteAnswerFinish,
    deleteAnswerStart,
    deleteDraftFinish,
    fetchDraftStart,
    fetchDraftSuccess
} = AnswerSlice.actions


export const fetchAnswerList = (id: string, pagination: Partial<Pagination<Answer>>): AppThunk => async (dispatch) => {
    dispatch(fetchAnswerListStart)
    const res = await fetchAnswerListByUID('5f04f91ae7ffdbbd6bb87e34', pagination)
    dispatch(fetchAnswerListSuccess(res.data.items))
}

export const updateAnswer = (id: string, doc: Partial<Answer>): AppThunk => async (dispatch) => {
    dispatch(fetchDraftStart)
    const res = await updateOneAnswer(id, doc)
    dispatch(updateAnswerFinish(res.data))
}
export const fetchOneAnswer = (body: Partial<Answer>)=> (dispatch: any) => {

    dispatch(fetchAnswer(body))
}

export const fetchDraftList = (id: string): AppThunk => async (dispatch) => {
    dispatch(fetchDraftStart)
    const res = await fetchDraftListByUID('5f04f91ae7ffdbbd6bb87e34')
    dispatch(fetchDraftListSuccess(res.data.items))
}

export const deleteDraft = (id: string): AppThunk => async (dispatch) => {
    dispatch(deleteAnswerStart)
    await removeAnswerById(id)
    dispatch(deleteDraftFinish(id))
}

export const createAnswer = (dto: Partial<Answer>): AppThunk => async (dispatch) => {
    dispatch(saveAnswerStart)
    const res = await createAnswers(dto)
    dispatch(answerQuestionSuccess(res.data))

}

export const createDraft = (dto: Partial<Answer>): AppThunk => async (dispatch) => {
    dispatch(saveAnswerStart)
    const res = await createAnswers(dto)
    console.log(res.data)
    dispatch(saveDraftSuccess(res.data))
}


export const deleteAnswer = (id: string): AppThunk => async (dispatch) => {
    dispatch(deleteAnswerStart)
    await removeAnswerById(id)
    dispatch(deleteAnswerFinish(id))
}

export const turnDtoA=(id:string,doc:Partial<Answer>): AppThunk => async (dispatch) =>{
    dispatch(fetchDraftStart)
    const res=await updateOneAnswer(id, doc)
    dispatch(turnDraftToAnswerFinsih(res.data))
}
export default AnswerSlice.reducer


