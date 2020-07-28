import axios from 'axios'
import { Video, Pagination } from '../model'
const baseurl= `http://localhost:3009/courses`
export const getVideoList=async(id:string,pagination:Partial<Pagination<Video>>)=>{
    
    return await axios.get(`${baseurl}/fetch_all/${id}`,{
        params:{pagination}
    })
}

export const getOneVideo=async(id:string)=>{
    return await axios.get(`${baseurl}/fetch_one/${id}`)
}

export const updateVideo=async(id:string,dto:Partial<Video>)=>{
    return await axios.put(`${baseurl}`,{course:dto})
}

export const createOneVideo=async(dto:Partial<Video>)=>{
    return await axios.post(baseurl,{course:dto})
} 

export const removeOneVideo=async (id:string)=>{
    return await axios.delete(`${baseurl}/${id}`)
}

export const getAllQuestionListByOnePublisher=async(id:string)=>{

    return await axios.post(`${baseurl}/all_question/${id}`)
}


export const getTypedQuestionListByOne=async (id:string,answered:string)=>{
    return await axios.get(`${baseurl}/fetch_by_type/${id}/${answered}`,)
}