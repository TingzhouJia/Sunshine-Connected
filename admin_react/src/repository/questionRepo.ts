import axios from 'axios'

const baseurl=`http://localhost:3009/questions`





export const deleteQuestionById=async (id:string)=>{
    return await axios.delete(`${baseurl}/${id}`)
}


export const fetchOneQuestion=async (id:string)=>{
    return await axios.get(`${baseurl}/byOne/${id}`)
}

