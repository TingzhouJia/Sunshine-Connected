import { Wrapper, Flexbox } from "../../style"
import React, { useEffect } from "react"
import { HeaderBread } from "../../components/global"
import { AuditTable } from "../../components/Audit"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux"
import { Skeleton } from "antd"
import { fetchAuditList } from "../../redux/auditSlice"


export const AuditPage:React.FC=()=>{
    const {loading,auditList,pagination}=useSelector((state:RootState)=>state.audit)
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(fetchAuditList('',pagination))
       
    }, [dispatch])
    return <Wrapper>
        <HeaderBread/>
        <Flexbox direction="column" just="center" align="center" h="85vh" w="100%">
        
            {
                auditList? <AuditTable load={loading} source={auditList} paginations={pagination}/>:<></>
            }
          
        </Flexbox>
    </Wrapper>
}