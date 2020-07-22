import axios from 'axios'


export const fetchAnswerListByUID=async (id:string,pagination:Partial<Pagination<Answer>>)=>{
    return await axios.get(`${process.env.REACT_TEST_URL}/answers/pagination/${id}`,{params:{pagination}})
}

export const fetchDraftListByUID=async (id:string)=>{
    return await axios.get(`${process.env.REACT_TEST_URL}/answers/draft/${id}`)
}

export const removeAnswerById=async (id:string)=>{
    return await axios.delete(`${process.env.REACT_TEST_URL}/answers/:id`)
}


