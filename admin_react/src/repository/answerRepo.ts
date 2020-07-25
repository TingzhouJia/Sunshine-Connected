import axios from 'axios'
import { Pagination, Answer } from '../model'


export const fetchAnswerListByUID=async (id:string,pagination:Partial<Pagination<Answer>>)=>{
    return await axios.get(`${process.env.REACT_TEST_URL}/answers/pagination/${id}`,{params:{pagination}})
}

export const fetchDraftListByUID=async (id:string)=>{
    return await axios.get(`${process.env.REACT_TEST_URL}/answers/draft/${id}`)
}

export const removeAnswerById=async (id:string)=>{
    return await axios.delete(`${process.env.REACT_TEST_URL}/answers/:id`)
}

export const updateOneAnswer=async(id:string,doc:Partial<Answer>)=>{
    return await axios.put(`${process.env.REACT_TEST_URL}/answers/:id`,{answers:doc})
}

export const createAnswers=async(dto:Partial<Answer>)=>{
    return await axios.post(`${process.env.REACT_TEST_URL}/answers`,{answers:dto})
}




