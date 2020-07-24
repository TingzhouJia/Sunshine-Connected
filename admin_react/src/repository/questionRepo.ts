import axios from 'axios'

const baseurl=`${process.env.REACT_TEAT_URL}/questions`





export const deleteQuestionById=async (id:string)=>{
    return await axios.delete(`${baseurl}/${id}`)
}


export const fetchOneQuestion=async (id:string)=>{
    return await axios.get(`${baseurl}/byOne/${id}`)
}

