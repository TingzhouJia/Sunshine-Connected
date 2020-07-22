import axios from 'axios'
const baseurl= `${process.env.REACT_TEST_URL}/courses`
export const getVideoList=async(id:string,pagination:Partial<Pagination<Video>>)=>{
    
    return await axios.get(`${baseurl}/fetch_all`,{
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

export const getAllQuestionListByOnePublisher=async(id:string,pagination:Pagination<Video>)=>{

    return await axios.post(`${baseurl}/all_question/${id}`,{
        params:{
            pagination
        },
    })
}