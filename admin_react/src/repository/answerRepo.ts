import axios from 'axios'
import { Pagination, Answer } from '../model'

const baseurl=process.env.REACT_APP_TEST_URL

export const fetchAnswerListByUID=async (id:string,pagination:Partial<Pagination<Answer>>)=>{
    return await axios.get(`${baseurl}/answers/pagination/${id}`,{params:{pagination}})
}

export const fetchDraftListByUID=async (id:string)=>{
    return await axios.get(`${baseurl}/answers/draft/${id}`)
}

export const removeAnswerById=async (id:string)=>{
    return await axios.delete(`${baseurl}/answers/:id`)
}

export const updateOneAnswer=async(id:string,doc:Partial<Answer>)=>{
    return await axios.put(`${baseurl}/answers/:id`,{answers:doc})
}

export const createAnswers=async(dto:Partial<Answer>)=>{
    return await axios.post(`${baseurl}/answers`,{answers:{...dto,author_id:"5f04f91ae7ffdbbd6bb87e34"}})
}




