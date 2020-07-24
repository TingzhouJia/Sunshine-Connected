import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from ".";
import { fetchAnswerListByUID, fetchDraftListByUID, removeAnswerById, createAnswers, updateOneAnswer } from "../repository";

interface AnswerState {
    draftList: Partial<Answer>[] | undefined,
    answerList: Partial<Answer>[] | undefined,
    loading: boolean
    selectedAnswer: Partial<Answer> | undefined
}


const initialState: AnswerState = {
    draftList: [],
    answerList: [],
    loading: false,
    selectedAnswer: undefined
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
function deleteAnswerSuccess(state: AnswerState, { payload }: PayloadAction<string>) {
    state.answerList = state.answerList ? state.answerList.filter(item => item._id === payload) : undefined
    state.loading = false
}
function deleteDraftSuccess(state: AnswerState, { payload }: PayloadAction<string>) {
    state.draftList = state.draftList ? state.draftList.filter(item => item._id === payload) : undefined
    state.loading = false
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
        fetchAnswerListSuccess: finishQuestion,
        turnDraftToAnswerFinsih:turnDraftToAnswerSuccess,
        deleteAnswerStart: Start,
        saveAnswerStart: Start,
        updateAnswerFinish: updateAnswerSuccess,
        fetchAnswer: SetSelectedAnswer,
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
    fetchAnswer,
    deleteAnswerFinish,
    deleteAnswerStart,
    deleteDraftFinish,
    fetchDraftStart,
    fetchDraftSuccess
} = AnswerSlice.actions


export const fetchAnswerList = (id: string, pagination: Partial<Pagination<Answer>>): AppThunk => async (dispatch) => {
    dispatch(fetchAnswerListStart)
    const res = await fetchAnswerListByUID(id, pagination)
    dispatch(fetchAnswerListSuccess(res.data))
}

export const updateAnswer = (id: string, doc: Partial<Answer>): AppThunk => async (dispatch) => {
    dispatch(fetchDraftStart)
    const res = await updateOneAnswer(id, doc)
    dispatch(updateAnswerFinish(res.data))
}
export const fetchOneAnswer = (body: Partial<Answer>) => (dispatch: any) => {

    dispatch(fetchAnswer(body))
}

export const fetchDraftList = (id: string): AppThunk => async (dispatch) => {
    dispatch(fetchDraftStart)
    const res = await fetchDraftListByUID(id)
    dispatch(fetchDraftSuccess(res.data))
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


