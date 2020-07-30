import { Pagination, Audit } from "../model"
import Axios from "axios"


const baseurl=process.env.REACT_APP_TEST_URL


export const GetAuditList=async(id:string,pagination:Partial<Pagination<Audit>>)=>{
    return await Axios.get(`${baseurl}/courses/need_audit`,{
        params:pagination
    })
}

export const CreateAudit=async (doc:Partial<Audit>)=>{
    return await Axios.post(`${baseurl}/audit/create`,{audit:doc})
}

export const deleteAudit=async(id:string)=>{
    return await Axios.delete(`${baseurl}/audit/${id}`)
}

export const updateAudit=async(id:string,audit:Partial<Audit>)=>{
    return await Axios.put(`$${baseurl}/audit/${id}`,{audit})
}